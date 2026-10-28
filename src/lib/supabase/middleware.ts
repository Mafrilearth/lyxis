import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL || "",
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({
            request,
          });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // Mandatory Supabase auth check for SSR cookie refresh and route isolation
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protected candidate routes and admin routes
  const isCandidateProtected = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAdminProtected = pathname === "/admin" || pathname.startsWith("/admin/");

  if (!user && (isCandidateProtected || isAdminProtected)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login and register pages
  if (user && (pathname === "/login" || pathname === "/register")) {
    const next = request.nextUrl.searchParams.get("next") || "/dashboard";
    const url = request.nextUrl.clone();
    url.pathname = next.startsWith("/") ? next : `/${next}`;
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  return response;
}
