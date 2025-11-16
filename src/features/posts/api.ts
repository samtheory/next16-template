import { apiClient } from "@/lib/api/client";
import { postSchema } from "./schemas";
import type { PostFormValues } from "./schemas";
import { z } from "zod";

const postsListSchema = z.array(postSchema);

export async function fetchPosts() {
  return apiClient({
    path: "/posts?_limit=10",
    schema: postsListSchema
  });
}

export async function createPost(values: PostFormValues) {
  return apiClient({
    path: "/posts",
    method: "POST",
    body: values,
    schema: postSchema
  });
}
