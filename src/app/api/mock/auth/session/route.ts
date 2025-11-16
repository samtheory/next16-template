import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/config/env";

export async function GET(request: Request) {
  const authCookie = cookies().get(env.authCookieName)?.value;
  const email = cookies().get(`${env.authCookieName}-email`)?.value;
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null;

  const token = authCookie ?? bearerToken;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    token,
    user: {
      email: email ?? "demo@next16-template.app"
    }
  });
}
