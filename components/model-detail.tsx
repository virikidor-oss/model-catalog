"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CarModel } from "@/lib/data";
import {
  Car,
  Calendar,
  Ruler,
  Building2,
  Shapes,
  Info,
  History,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function getAllImages(model: CarModel): string[] {
  if (model.images && model.images.length > 0) {
    return model.images;
  }
  if (model.imageUrl) {
    return [model.imageUrl];
  }
  return [];
}

function SpecItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

export function ModelDetailClient({ model }: { model: CarModel }) {
  const images = getAllImages(model);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentSrc = images[selectedIndex];

  function prev() {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }

  function next() {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }

  return (
    <>
      <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к каталогу
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-3">
          <div className="aspect-[4/3] relative rounded-xl bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden group">
            {currentSrc ? (
              <>
                <Image
                  src={currentSrc}
                  alt={`${model.brand} ${model.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  unoptimized
                />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 hover:bg-background/90 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 hover:bg-background/90 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium">
                      {selectedIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <Car className="h-24 w-24 text-blue-300/70" />
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((src, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "relative h-16 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-colors",
                    selectedIndex === index
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground/30"
                  )}
                >
                  <Image
                    src={src}
                    alt={`${model.brand} ${model.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-1">
            <Badge variant="secondary" className="mb-2">
              {model.brand}
            </Badge>
            <h1 className="text-2xl font-bold tracking-tight">
              {model.brand} {model.name}
            </h1>
            <p className="text-muted-foreground text-sm">{model.type}</p>
          </div>

          <Separator />

          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Характеристики
            </h2>
            <div className="divide-y">
              <SpecItem
                icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
                label="Марка"
                value={model.brand}
              />
              <SpecItem
                icon={<Car className="h-4 w-4 text-muted-foreground" />}
                label="Модель"
                value={model.name}
              />
              <SpecItem
                icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                label="Год выпуска"
                value={String(model.year)}
              />
              <SpecItem
                icon={<Ruler className="h-4 w-4 text-muted-foreground" />}
                label="Масштаб"
                value={model.scale}
              />
              <SpecItem
                icon={<Shapes className="h-4 w-4 text-muted-foreground" />}
                label="Тип кузова"
                value={model.type}
              />
              <SpecItem
                icon={<Info className="h-4 w-4 text-muted-foreground" />}
                label="Производитель модели"
                value={model.manufacturer}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold tracking-tight">Описание</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {model.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold tracking-tight">История</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {model.history}
          </p>
        </div>
      </div>
    </>
  );
}
