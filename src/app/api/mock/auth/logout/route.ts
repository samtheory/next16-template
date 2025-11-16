import { NextResponse } from "next/server";
import { env } from "@/config/env";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(env.authCookieName, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0
  });
  response.cookies.set(`${env.authCookieName}-email`, "", {
    httpOnly: false,
    path: "/",
    maxAge: 0
  });
  return response;
}
