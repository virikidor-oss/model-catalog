"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Save,
  Upload,
  X,
  Image as ImageIcon,
  Newspaper,
  StickyNote,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface AdminBlogFormProps {
  post?: {
    id: string;
    title: string;
    type: "note" | "article";
    content: string;
    imageUrl?: string;
  };
  onSave: (data: Record<string, unknown>) => Promise<void>;
}

const defaultData = {
  title: "",
  type: "note" as const,
  content: "",
};

export function AdminBlogForm({ post, onSave }: AdminBlogFormProps) {
  const [data, setData] = useState<Record<string, unknown>>(
    post ? { ...post } : { ...defaultData }
  );
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(post?.imageUrl ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(field: string, value: unknown) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Пожалуйста, выберите изображение");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("Файл слишком большой (максимум 1 МБ)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== "" && value !== undefined) {
        cleaned[key] = value;
      }
    }

    if (preview) {
      cleaned.imageUrl = preview;
    } else {
      delete cleaned.imageUrl;
    }

    setSaving(true);
    try {
      await onSave(cleaned);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Заголовок *</label>
        <Input
          placeholder="Введите заголовок записи"
          value={(data.title as string) || ""}
          onChange={(e) => update("title", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Тип записи *</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => update("type", "note")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              data.type === "note"
                ? "border-primary bg-primary/10 text-primary"
                : "hover:bg-muted"
            }`}
          >
            <StickyNote className="h-4 w-4" />
            Заметка
          </button>
          <button
            type="button"
            onClick={() => update("type", "article")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              data.type === "article"
                ? "border-primary bg-primary/10 text-primary"
                : "hover:bg-muted"
            }`}
          >
            <Newspaper className="h-4 w-4" />
            Статья
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Текст *</label>
        <Textarea
          placeholder={
            data.type === "note"
              ? "Короткая заметка про модель..."
              : "Полноценная статья с историей, процессом сборки..."
          }
          value={(data.content as string) || ""}
          onChange={(e) => update("content", e.target.value)}
          rows={data.type === "article" ? 12 : 4}
          required
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Фото (необязательно)</label>

        {preview && (
          <div className="relative aspect-[2/1] max-w-lg rounded-xl overflow-hidden border bg-muted group">
            <Image
              src={preview}
              alt="Превью"
              fill
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors shadow-sm opacity-0 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {!preview && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex aspect-[2/1] max-w-lg cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <ImageIcon className="h-10 w-10 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              Нажмите, чтобы выбрать фото
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              PNG, JPG до 1 МБ
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        {!preview && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Выбрать файл
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving
            ? "Сохранение..."
            : post
              ? "Сохранить изменения"
              : "Опубликовать"}
        </Button>
      </div>
    </form>
  );
}
