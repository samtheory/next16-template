"use client";

import { useMemo } from "react";
import { usePosts } from "../hooks/use-posts";
import { usePostFilterStore } from "../stores/post-filter-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PostList() {
  const { data, isPending, isError, error, refetch } = usePosts();
  const query = usePostFilterStore((state) => state.query);

  const filteredPosts = useMemo(() => {
    if (!data) return [];
    if (!query) return data;
    return data.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));
  }, [data, query]);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Latest posts</CardTitle>
          <CardDescription>Data resolved with TanStack Query running on the client.</CardDescription>
        </div>
        <Badge>{filteredPosts.length} visible</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPending ? (
          <p className="text-sm text-muted-foreground">Loading posts…</p>
        ) : null}
        {isError ? (
          <div className="space-y-2 text-sm text-red-600">
            <p>{error instanceof Error ? error.message : "Unable to load posts."}</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : null}
        {!isPending && !isError && filteredPosts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing to show yet. Tweak the filters or create your first post.
          </p>
        ) : null}
        <ul className="space-y-3">
          {filteredPosts.map((post) => (
            <li key={post.id} className="rounded-md border border-border p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">#{post.id}</p>
              <p className="mt-2 text-lg font-semibold leading-tight">{post.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{post.body}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => refetch()}>
            Refetch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
