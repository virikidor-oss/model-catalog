"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, ArrowLeft, Newspaper } from "lucide-react";
import type { BlogPost } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blog");
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setPosts(data.posts);
    } catch {
      toast.error("Не удалось загрузить записи");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleDelete(id: string, title: string) {
    toast(`Удалить запись «${title}»?`, {
      action: {
        label: "Удалить",
        onClick: async () => {
          const loadingId = toast.loading("Удаление...");
          try {
            const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Ошибка удаления");
            setPosts((prev) => prev.filter((p) => p.id !== id));
            toast.success("Запись удалена", { id: loadingId });
          } catch {
            toast.error("Ошибка при удалении", { id: loadingId });
          }
        },
      },
      cancel: { label: "Отмена", onClick: () => {} },
    });
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <p className="text-muted-foreground">Загрузка записей...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Записи блога</h1>
            <p className="text-sm text-muted-foreground">
              {posts.length} {posts.length === 1 ? "запись" : "записей"}
            </p>
          </div>
        </div>
        <Link href="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Новая запись
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Newspaper className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">Записей пока нет</p>
          <Link href="/admin/blog/new">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Написать первую запись
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {[...posts]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 rounded-xl border p-4 card-hover"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
                  <Newspaper className="h-5 w-5 text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.createdAt)} ·{" "}
                    {post.type === "article" ? "Статья" : "Заметка"}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-destructive/10 hover:border-destructive/30 transition-colors text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
