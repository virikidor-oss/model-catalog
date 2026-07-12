"use client";

import { useState } from "react";
import { Star, MessageSquare, Send, User } from "lucide-react";
import type { Review } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

function StarRating({
  value,
  onChange,
  interactive = false,
  size = "sm",
}: {
  value: number;
  onChange?: (v: number) => void;
  interactive?: boolean;
  size?: "sm" | "lg";
}) {
  const [hovered, setHovered] = useState(0);
  const starSize = size === "lg" ? "h-6 w-6" : "h-4 w-4";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (interactive && hovered ? hovered : value);
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-all`}
            onClick={() => interactive && onChange?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            aria-label={`${star} звезд`}
          >
            <Star
              className={`${starSize} ${
                filled
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ModelReviews({
  modelId,
  initialReviews,
}: {
  modelId: string;
  initialReviews: Review[];
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Пожалуйста, поставьте оценку");
      return;
    }

    if (!comment.trim()) {
      toast.error("Пожалуйста, напишите комментарий");
      return;
    }

    const authorName = author.trim() || "Аноним";

    setSubmitting(true);
    const id = toast.loading("Отправка...");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId,
          rating,
          author: authorName,
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка при отправке");
      }

      const data = await res.json();
      setReviews((prev) => [data.review, ...prev]);
      setAuthor("");
      setRating(0);
      setComment("");
      toast.success("Отзыв отправлен!", { id });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка при отправке", {
        id,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Separator />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold tracking-tight">
            Отзывы и оценки
          </h2>
        </div>

        {reviews.length > 0 && (
          <div className="flex items-center gap-3 py-2">
            <span className="text-3xl font-bold tracking-tight">
              {averageRating.toFixed(1)}
            </span>
            <div className="space-y-0.5">
              <StarRating value={Math.round(averageRating)} size="sm" />
              <p className="text-xs text-muted-foreground">
                {reviews.length} {reviews.length === 1 ? "оценка" : "оценок"}
              </p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold">Оставить отзыв</h3>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Ваше имя</label>
          <Input
            placeholder="Аноним"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Оценка</label>
          <StarRating
            value={rating}
            onChange={setRating}
            interactive
            size="lg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Комментарий</label>
          <Textarea
            placeholder="Поделитесь впечатлениями о модели..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={2000}
            rows={4}
          />
        </div>

        <Button type="submit" disabled={submitting} className="gap-2">
          <Send className="h-4 w-4" />
          {submitting ? "Отправка..." : "Отправить отзыв"}
        </Button>
      </form>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <MessageSquare className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="text-sm text-muted-foreground">
            Пока нет отзывов. Будьте первым!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">{review.author}</span>
                </div>
                <StarRating value={review.rating} size="sm" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
              <p className="text-xs text-muted-foreground/60">
                {formatDate(review.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
