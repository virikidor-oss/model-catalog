"use client";

import { Car, Truck, HardHat, Clock } from "lucide-react";
import { ModelCard } from "@/components/model-card";
import type { CarModel } from "@/lib/data";

interface ShowroomCategory {
  id: string;
  title: string;
  description: string;
  models: CarModel[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  легковые: <Car className="h-6 w-6" />,
  грузовики: <Truck className="h-6 w-6" />,
  спецтехника: <HardHat className="h-6 w-6" />,
  классика: <Clock className="h-6 w-6" />,
};

export function ShowroomClient({
  categories,
}: {
  categories: ShowroomCategory[];
}) {
  return (
    <div className="space-y-16">
      {categories.map((category) => (
        <section
          key={category.id}
          className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {CATEGORY_ICONS[category.id] ?? <Car className="h-6 w-6" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {category.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {category.description} — {category.models.length}{" "}
                {category.models.length === 1 ? "модель" : "моделей"}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
