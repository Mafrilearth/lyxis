import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;

  const isCandidateProtected = pathname === "/candidate" || pathname.startsWith("/candidate/");
  const isAdminProtected = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  const legacyPrefixes = ["dashboard", "exam", "result"] as const;
  for (const prefix of legacyPrefixes) {
    if (pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(new RegExp(`^\\/${prefix}`), `/candidate/${prefix}`);
      return NextResponse.redirect(url);
    }
  }

  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.includes("-auth-token") || c.name.startsWith("sb-"));

  if (!hasAuthCookie && (isCandidateProtected || isAdminProtected)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (!hasAuthCookie) {
    return response;
  }

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && (isCandidateProtected || isAdminProtected)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const next = request.nextUrl.searchParams.get("next") || "/candidate/dashboard";
    const url = request.nextUrl.clone();
    url.pathname = next.startsWith("/") ? next : `/${next}`;
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  return response;
}
