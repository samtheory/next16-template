import { NextResponse } from "next/server";
import { env } from "@/config/env";
import { sleep } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  await sleep(500);

  const response = NextResponse.json({
    token: env.mockAuthToken,
    user: { email }
  });

  response.cookies.set(env.authCookieName, env.mockAuthToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24
  });

  response.cookies.set(`${env.authCookieName}-email`, email, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24
  });

  return response;
}
