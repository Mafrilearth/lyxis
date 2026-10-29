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

  // Protected candidate routes and admin routes (strictly prefixed by role)
  const isCandidateProtected = pathname === "/candidate" || pathname.startsWith("/candidate/");
  const isAdminProtected = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Gracefully rewrite or redirect legacy un-prefixed candidate routes to role-prefixed routes
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/dashboard/, "/candidate/dashboard");
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/exam/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/exam/, "/candidate/exam");
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/result/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/result/, "/candidate/result");
    return NextResponse.redirect(url);
  }

  // Fast-path cookie check: Look for Supabase auth tokens before initializing auth network calls
  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.includes("-auth-token") || c.name.startsWith("sb-"));

  // 1. If unauthenticated user tries to access protected candidate/admin routes, immediately redirect to /login
  if (!hasAuthCookie && (isCandidateProtected || isAdminProtected)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // 2. If unauthenticated user is on public routes (landing page, verify, sitemap, etc.) or auth pages, bypass Supabase call
  if (!hasAuthCookie) {
    return response;
  }

  // 3. Authenticated session validation & SSR cookie refresh
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

  // Redirect authenticated users away from login and register pages
  if (user && isAuthPage) {
    const next = request.nextUrl.searchParams.get("next") || "/candidate/dashboard";
    const url = request.nextUrl.clone();
    url.pathname = next.startsWith("/") ? next : `/${next}`;
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  return response;
}
