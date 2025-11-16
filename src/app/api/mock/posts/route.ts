import { NextResponse } from "next/server";

const REMOTE_POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = url.searchParams.get("_limit") ?? "10";
  const remoteResponse = await fetch(`${REMOTE_POSTS_URL}?_limit=${limit}`, {
    cache: "no-store"
  });
  const data = await remoteResponse.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const newPost = {
    ...payload,
    id: Math.floor(Math.random() * 10_000) + 1000
  };
  return NextResponse.json(newPost, { status: 201 });
}
