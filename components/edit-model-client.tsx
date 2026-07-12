"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminModelForm } from "@/components/admin-model-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { CarModel } from "@/lib/data";

type EditModelClientProps = {
  id: string;
};

export function EditModelClient({ id }: EditModelClientProps) {
  const router = useRouter();
  const [model, setModel] = useState<CarModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/models/${id}`);
        if (!res.ok) throw new Error("Модель не найдена");
        const data = await res.json();
        setModel(data.model);
      } catch {
        toast.error("Не удалось загрузить модель");
        router.push("/admin/models");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  async function handleSave(data: Record<string, unknown>) {
    const toastId = toast.loading("Сохранение...");
    try {
      const res = await fetch(`/api/models/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка сохранения");
      }

      toast.success("Модель обновлена!", { id: toastId });
      router.push("/admin/models");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка сохранения", {
        id: toastId,
      });
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-muted-foreground">Загрузка модели...</p>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-muted-foreground">Модель не найдена</p>
      </div>
    );
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
          <h1 className="text-2xl font-bold tracking-tight">
            Редактировать: {model.brand} {model.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Измените поля и сохраните
          </p>
        </div>
      </div>

      <AdminModelForm model={model} onSave={handleSave} />
    </div>
  );
}
