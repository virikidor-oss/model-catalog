"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const MAX_FILE_SIZE = 1024 * 1024;
const MAX_IMAGE_DIMENSION = 800;
const JPEG_QUALITY = 0.6;

export function PublicModelForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [scale, setScale] = useState("1:18");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

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

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Пожалуйста, выберите изображение");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Файл слишком большой. Максимальный размер — 1 МБ");
      return;
    }

    compressImage(file)
      .then((dataUrl) => {
        setPreview(dataUrl);
      })
      .catch(() => {
        toast.error("Не удалось обработать изображение");
      });
  }

  function removeImage() {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const yearNum = Number(year);
    if (!brand.trim()) {
      toast.error("Укажите марку");
      return;
    }
    if (!name.trim()) {
      toast.error("Укажите название модели");
      return;
    }
    if (!yearNum || yearNum < 1900 || yearNum > 2100) {
      toast.error("Укажите корректный год (1900–2100)");
      return;
    }
    if (!scale.trim()) {
      toast.error("Укажите масштаб");
      return;
    }
    if (!type.trim()) {
      toast.error("Укажите тип кузова");
      return;
    }
    if (!description.trim()) {
      toast.error("Напишите описание");
      return;
    }

    const body: Record<string, unknown> = {
      brand: brand.trim(),
      name: name.trim(),
      year: yearNum,
      scale: scale.trim(),
      type: type.trim(),
      description: description.trim(),
    };

    if (preview) {
      body.images = [preview];
      body.coverIndex = 0;
      body.imageUrl = preview;
    }

    const id = toast.loading("Добавляем модель...");

    try {
      const res = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Ошибка при сохранении модели");
      }

      toast.success("Модель успешно добавлена!", { id });
      router.push("/");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Ошибка при сохранении",
        { id }
      );
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
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Название модели *</label>
          <Input
            placeholder="Например: F40"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Год выпуска *</label>
          <Input
            type="number"
            min={1900}
            max={2100}
            placeholder="Например: 1987"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Масштаб *</label>
          <Input
            placeholder="Например: 1:18"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Тип кузова *</label>
          <Input
            placeholder="Например: Спорткар"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Фото модели</label>

        {preview ? (
          <div className="relative aspect-[4/3] max-w-sm rounded-xl overflow-hidden border bg-muted group">
            <Image
              src={preview}
              alt="Предпросмотр фото"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors shadow-sm"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex aspect-[4/3] max-w-sm cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 hover:bg-muted/50 transition-colors"
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Описание *</label>
        <Textarea
          placeholder="Расскажите об этой модели"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={saving} className="gap-2">
          <Send className="h-4 w-4" />
          {saving ? "Отправка..." : "Добавить модель"}
        </Button>
      </div>
    </form>
  );
}
