"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostFilterStore } from "../stores/post-filter-store";

export function PostsPanel() {
  const query = usePostFilterStore((state) => state.query);
  const setQuery = usePostFilterStore((state) => state.setQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>All state is local via Zustand, ready for feature-specific slices.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="search">Search by title</Label>
          <Input
            id="search"
            placeholder="Type to filter..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
