import { AppShell } from "@/components/layout/app-shell";
import { PostForm, PostList, PostsPanel } from "@/features/posts";

export default function Home() {
  return (
    <AppShell description="Opinionated Next.js 16 starter with a feature-first structure, ready for client data fetching and local slices.">
      <div className="space-y-6">
        <PostList />
      </div>
      <div className="space-y-6">
        <PostsPanel />
        <PostForm />
      </div>
    </AppShell>
  );
}
