"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, ArrowLeft, Car } from "lucide-react";
import type { CarModel } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminModelsPage() {
  const [models, setModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModels = useCallback(async () => {
    try {
      const res = await fetch("/api/models");
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setModels(data.models);
    } catch {
      toast.error("Не удалось загрузить модели");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  async function handleDelete(id: string, name: string) {
    toast(`Удалить модель «${name}»?`, {
      action: {
        label: "Удалить",
        onClick: async () => {
          const loadingId = toast.loading("Удаление...");
          try {
            const res = await fetch(`/api/models/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Ошибка удаления");
            setModels((prev) => prev.filter((m) => m.id !== id));
            toast.success("Модель удалена", { id: loadingId });
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
        <p className="text-muted-foreground">Загрузка моделей...</p>
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
            <h1 className="text-2xl font-bold tracking-tight">Модели</h1>
            <p className="text-sm text-muted-foreground">
              {models.length} {models.length === 1 ? "модель" : "моделей"}
            </p>
          </div>
        </div>
        <Link href="/admin/models/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Добавить модель
          </Button>
        </Link>
      </div>

      {models.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Car className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">Модели не найдены</p>
          <Link href="/admin/models/new">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Добавить первую модель
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {models.map((model) => (
            <div
              key={model.id}
              className="flex items-center gap-4 rounded-xl border p-4 card-hover"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
                <Car className="h-5 w-5 text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">
                  {model.brand} {model.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {model.year} · {model.type} · {model.scale}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/models/${model.id}/edit`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                </Link>
                <button
                  onClick={() =>
                    handleDelete(model.id, `${model.brand} ${model.name}`)
                  }
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
