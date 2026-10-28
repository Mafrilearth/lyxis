import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.warn("Signout session cleared:", error);
  }
  return NextResponse.redirect(new URL("/login", request.url));
}
