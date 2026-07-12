"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminBlogForm } from "@/components/admin-blog-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type EditBlogPostClientProps = {
  id: string;
};

export function EditBlogPostClient({ id }: EditBlogPostClientProps) {
  const router = useRouter();
  const [post, setPost] = useState<{
    id: string;
    title: string;
    type: "note" | "article";
    content: string;
    imageUrl?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) throw new Error("Запись не найдена");
        const data = await res.json();
        setPost(data.post);
      } catch {
        toast.error("Не удалось загрузить запись");
        router.push("/admin/blog");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  async function handleSave(data: Record<string, unknown>) {
    const toastId = toast.loading("Сохранение...");
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка сохранения");
      }

      toast.success("Запись обновлена!", { id: toastId });
      router.push("/admin/blog");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка сохранения", {
        id: toastId,
      });
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-muted-foreground">Загрузка записи...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-muted-foreground">Запись не найдена</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/blog"
          className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Редактировать: {post.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Измените поля и сохраните
          </p>
        </div>
      </div>

      <AdminBlogForm post={post} onSave={handleSave} />
    </div>
  );
}
