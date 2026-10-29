import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  let next = requestUrl.searchParams.get("next");

  if (code) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.exchangeCodeForSession(code);
      if (!next && data?.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.user.id)
          .single();

        next =
          profile?.role === "ADMIN" || data.user.email === "admin@lyxis.mafrilearth.com"
            ? "/admin"
            : "/candidate/dashboard";
      }
    } catch (error) {
      console.warn("Auth exchange code error:", error);
    }
  }

  return NextResponse.redirect(new URL(next ?? "/candidate/dashboard", request.url));
}
