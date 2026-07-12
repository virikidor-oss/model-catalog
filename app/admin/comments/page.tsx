"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Star, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import type { Review } from "@/lib/models";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminCommentsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews?all=true");
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setReviews(data.reviews);
    } catch {
      toast.error("Не удалось загрузить комментарии");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  async function handleDelete(id: string) {
    toast("Удалить этот комментарий?", {
      action: {
        label: "Удалить",
        onClick: async () => {
          const loadingId = toast.loading("Удаление...");
          try {
            const res = await fetch(`/api/reviews/${id}`, {
              method: "DELETE",
            });
            if (!res.ok) throw new Error("Ошибка удаления");
            setReviews((prev) => prev.filter((r) => r.id !== id));
            toast.success("Комментарий удалён", { id: loadingId });
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
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <p className="text-muted-foreground">Загрузка комментариев...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Комментарии</h1>
          <p className="text-sm text-muted-foreground">
            {reviews.length}{" "}
            {reviews.length === 1
              ? "комментарий"
              : reviews.length >= 2 && reviews.length <= 4
                ? "комментария"
                : "комментариев"}
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">
            Комментариев пока нет
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex items-start gap-4 rounded-xl border p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{review.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Модель ID: {review.modelId}
                </p>
              </div>
              <button
                onClick={() => handleDelete(review.id)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border hover:bg-destructive/10 hover:border-destructive/30 transition-colors text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
