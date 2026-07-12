"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload, X, Image as ImageIcon, Star } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import type { CarModel } from "@/lib/data";

const MAX_FILE_SIZE = 1024 * 1024;
const MAX_IMAGE_DIMENSION = 800;
const JPEG_QUALITY = 0.6;
const MAX_IMAGES = 10;

interface AdminModelFormProps {
  model?: CarModel;
  onSave: (data: Record<string, unknown>) => Promise<void>;
}

const defaultData = {
  brand: "",
  name: "",
  year: new Date().getFullYear(),
  scale: "1:18",
  type: "",
  manufacturer: "",
  description: "",
  history: "",
};

export function AdminModelForm({ model, onSave }: AdminModelFormProps) {
  const [data, setData] = useState<Record<string, unknown>>(
    model ? { ...model } : { ...defaultData }
  );
  const [saving, setSaving] = useState(false);
  const [previews, setPreviews] = useState<string[]>(
    model?.images ? [...model.images] : model?.imageUrl ? [model.imageUrl] : []
  );
  const [coverIndex, setCoverIndex] = useState<number>(
    model?.coverIndex ?? (previews.length > 0 ? 0 : -1)
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(field: string, value: unknown) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
          const ratio = Math.min(
            MAX_IMAGE_DIMENSION / width,
            MAX_IMAGE_DIMENSION / height
          );
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Не удалось создать canvas"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.onerror = () => reject(new Error("Не удалось загрузить изображение"));
      img.src = URL.createObjectURL(file);
    });
  }

  function handleFilesSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remaining = MAX_IMAGES - previews.length;
    if (remaining <= 0) {
      toast.error(`Максимум ${MAX_IMAGES} фото`);
      return;
    }

    const toProcess = files.slice(0, remaining);
    const validFiles = toProcess.filter(
      (f) => f.type.startsWith("image/") && f.size <= MAX_FILE_SIZE
    );

    if (validFiles.length === 0) return;

    let loaded = 0;
    for (const file of validFiles) {
      compressImage(file)
        .then((dataUrl) => {
          setPreviews((prev) => {
            const updated = [...prev, dataUrl];
            if (coverIndex === -1 && updated.length > 0) {
              setCoverIndex(0);
            }
            return updated;
          });
          loaded++;
          if (loaded === validFiles.length) {
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        })
        .catch(() => {
          toast.error(`Не удалось обработать изображение "${file.name}"`);
          loaded++;
          if (loaded === validFiles.length && fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        });
    }
  }

  function removeImage(index: number) {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    if (coverIndex === index) {
      setCoverIndex(updated.length > 0 ? 0 : -1);
    } else if (coverIndex > index) {
      setCoverIndex(coverIndex - 1);
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

    if (previews.length > 0) {
      cleaned.images = previews;
      cleaned.coverIndex = coverIndex >= 0 ? coverIndex : 0;
      cleaned.imageUrl = previews[coverIndex >= 0 ? coverIndex : 0];
    } else {
      delete cleaned.images;
      delete cleaned.coverIndex;
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
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Марка *</label>
          <Input
            placeholder="Например: Ferrari"
            value={(data.brand as string) || ""}
            onChange={(e) => update("brand", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Название модели *</label>
          <Input
            placeholder="Например: F40"
            value={(data.name as string) || ""}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Год выпуска *</label>
          <Input
            type="number"
            min={1900}
            max={2100}
            value={(data.year as number) || ""}
            onChange={(e) => update("year", Number(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Масштаб *</label>
          <Input
            placeholder="Например: 1:18"
            value={(data.scale as string) || ""}
            onChange={(e) => update("scale", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Тип кузова *</label>
          <Input
            placeholder="Например: Спорткар"
            value={(data.type as string) || ""}
            onChange={(e) => update("type", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Производитель модели *</label>
          <Input
            placeholder="Например: Bburago"
            value={(data.manufacturer as string) || ""}
            onChange={(e) => update("manufacturer", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">
          Фото модели ({previews.length}/{MAX_IMAGES})
        </label>

        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-muted group"
              >
                <Image
                  src={src}
                  alt={`Фото ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCoverIndex(index)}
                  className={`absolute bottom-1.5 left-1.5 flex h-6 items-center gap-1 rounded-full px-2 text-xs font-medium shadow-sm transition-colors ${
                    coverIndex === index
                      ? "bg-yellow-400 text-yellow-950"
                      : "bg-background/80 text-muted-foreground hover:bg-background opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <Star className="h-3 w-3 fill-current" />
                  {coverIndex === index ? "Обложка" : "Обложка?"}
                </button>
              </div>
            ))}
          </div>
        )}

        {previews.length < MAX_IMAGES && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex aspect-[4/3] max-w-sm cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <ImageIcon className="h-10 w-10 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              Нажмите, чтобы выбрать фото
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              PNG, JPG до 1 МБ, до {MAX_IMAGES} шт.
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesSelect}
          className="hidden"
        />
        {previews.length < MAX_IMAGES && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {previews.length > 0 ? "Добавить ещё фото" : "Выбрать файлы"}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Описание *</label>
        <Textarea
          placeholder="Краткое описание модели"
          value={(data.description as string) || ""}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">История *</label>
        <Textarea
          placeholder="Подробная история модели"
          value={(data.history as string) || ""}
          onChange={(e) => update("history", e.target.value)}
          rows={6}
          required
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving
            ? "Сохранение..."
            : model
              ? "Сохранить изменения"
              : "Добавить модель"}
        </Button>
      </div>
    </form>
  );
}
