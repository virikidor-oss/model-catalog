import { getModels } from "@/lib/models";
import { getModelsFromMock } from "@/lib/mock-data";
import { isDatabaseAvailable } from "@/lib/db";
import { getModelsGroupedByCategory } from "@/lib/showroom-data";
import { ShowroomClient } from "@/components/showroom";
import { GalleryVertical } from "lucide-react";
import type { CarModel } from "@/lib/data";

async function getInitialData(): Promise<{
  categories: {
    id: string;
    title: string;
    description: string;
    models: CarModel[];
  }[];
}> {
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return { categories: getModelsGroupedByCategory(getModelsFromMock()) };
  }

  const models = await getModels();
  if (models.length === 0) {
    return { categories: getModelsGroupedByCategory(getModelsFromMock()) };
  }
  return { categories: getModelsGroupedByCategory(models) };
}

export default async function ShowroomPage() {
  const { categories } = await getInitialData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10 space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <GalleryVertical className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Выставочный зал</h1>
        </div>
        <p className="text-muted-foreground pl-[3.25rem]">
          Модели, разбитые по категориям
        </p>
      </div>

      <ShowroomClient categories={categories} />
    </div>
  );
}
