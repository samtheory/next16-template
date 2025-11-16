import { NextResponse } from "next/server";
import { sleep } from "@/lib/utils";

export async function POST(request: Request) {
  const payload = await request.json();
  await sleep(400);
  return NextResponse.json(
    {
      success: true,
      received: payload,
      message: "Form data processed successfully."
    },
    { status: 200 }
  );
}
