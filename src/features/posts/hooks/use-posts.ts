"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, fetchPosts } from "../api";
import { createQueryKeys } from "@/lib/api/query-keys";
import type { Post, PostFormValues } from "../schemas";

const postsKeys = createQueryKeys("posts");

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: postsKeys("list"),
    queryFn: fetchPosts
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: PostFormValues) => createPost(values),
    onSuccess: (post) => {
      queryClient.setQueryData<Post[]>(postsKeys("list"), (data = []) => [post, ...data]);
    }
  });
}
