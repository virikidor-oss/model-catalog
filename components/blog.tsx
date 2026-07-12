"use client";

import { Newspaper, CalendarDays, ArrowUpRight, ImageIcon } from "lucide-react";
import NextImage from "next/image";
import type { BlogPost } from "@/lib/models";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatContent(content: string): string {
  return content.replace(/\\n/g, "\n");
}

export function BlogFeed({ posts }: { posts: BlogPost[] }) {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Newspaper className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">Записей пока нет</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sorted.map((post) => (
        <article
          key={post.id}
          className="rounded-xl border bg-card overflow-hidden card-hover"
        >
          {post.imageUrl && (
            <div className="relative aspect-[2/1] sm:aspect-[3/1] bg-muted">
              <NextImage
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    post.type === "article"
                      ? "bg-primary/10 text-primary"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {post.type === "article" ? (
                    <Newspaper className="h-3 w-3" />
                  ) : (
                    <ImageIcon className="h-3 w-3" />
                  )}
                  {post.type === "article" ? "Статья" : "Заметка"}
                </span>
              </div>
            </div>
          )}

          <div className="p-5 sm:p-6 space-y-3">
            {!post.imageUrl && (
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    post.type === "article"
                      ? "bg-primary/10 text-primary"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {post.type === "article" ? (
                    <Newspaper className="h-3 w-3" />
                  ) : (
                    <ImageIcon className="h-3 w-3" />
                  )}
                  {post.type === "article" ? "Статья" : "Заметка"}
                </span>
              </div>
            )}

            <h2 className="text-xl font-semibold tracking-tight">
              {post.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(post.createdAt)}
              </span>
            </div>

            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.type === "note"
                ? formatContent(post.content)
                : formatContent(post.content).slice(0, 300) +
                  (formatContent(post.content).length > 300 ? "..." : "")}
            </div>

            {post.type === "article" &&
              formatContent(post.content).length > 300 && (
                <button
                  onClick={() => {
                    const el = document.getElementById(
                      `blog-content-${post.id}`
                    );
                    if (el) {
                      el.classList.toggle("line-clamp-3");
                      const btn = el.nextElementSibling as HTMLElement | null;
                      if (btn) {
                        btn.textContent = el.classList.contains("line-clamp-3")
                          ? "Читать далее"
                          : "Свернуть";
                      }
                    }
                  }}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Читать далее
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              )}
          </div>
        </article>
      ))}
    </div>
  );
}
