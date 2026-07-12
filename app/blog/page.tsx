import { getAllBlogPosts } from "@/lib/models";
import { mockBlogPosts } from "@/lib/mock-data";
import { isDatabaseAvailable } from "@/lib/db";
import { BlogFeed } from "@/components/blog";
import { Newspaper } from "lucide-react";
import type { BlogPost } from "@/lib/models";

async function getInitialData(): Promise<{ posts: BlogPost[] }> {
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return { posts: mockBlogPosts };
  }

  const posts = await getAllBlogPosts();
  if (posts.length === 0) {
    return { posts: mockBlogPosts };
  }
  return { posts };
}

export default async function BlogPage() {
  const { posts } = await getInitialData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-10 space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Newspaper className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Мой блог</h1>
        </div>
        <p className="text-muted-foreground pl-[3.25rem]">
          Заметки и статьи про модели
        </p>
      </div>

      <BlogFeed posts={posts} />
    </div>
  );
}
