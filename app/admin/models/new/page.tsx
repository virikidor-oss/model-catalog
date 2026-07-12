"use client";

import { useRouter } from "next/navigation";
import { AdminModelForm } from "@/components/admin-model-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewModelPage() {
  const router = useRouter();

  async function handleSave(data: Record<string, unknown>) {
    const id = toast.loading("Сохранение...");
    try {
      const res = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка сохранения");
      }

      toast.success("Модель добавлена!", { id });
      router.push("/admin/models");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка сохранения", {
        id,
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/models"
          className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Новая модель</h1>
          <p className="text-sm text-muted-foreground">
            Заполните все поля для добавления модели
          </p>
        </div>
      </div>

      <AdminModelForm onSave={handleSave} />
    </div>
  );
}
