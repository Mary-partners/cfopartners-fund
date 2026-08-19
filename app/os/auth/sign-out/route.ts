import { NextResponse } from "next/server";
import { createClient } from "@/lib/os/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/os/login", request.url));
}
