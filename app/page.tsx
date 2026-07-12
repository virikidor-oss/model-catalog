import { getModels } from "@/lib/models";
import { getModelsFromMock } from "@/lib/mock-data";
import { isDatabaseAvailable } from "@/lib/db";
import { CatalogClient } from "@/components/catalog";
import { Library } from "lucide-react";
import type { CarModel } from "@/lib/data";

async function getInitialData(): Promise<{
  models: CarModel[];
}> {
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return { models: getModelsFromMock() };
  }

  const models = await getModels();
  if (models.length === 0) {
    return { models: getModelsFromMock() };
  }
  return { models };
}

export default async function HomePage() {
  const { models } = await getInitialData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Library className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Коллекция моделей
          </h1>
        </div>
        <p className="text-muted-foreground pl-[3.25rem]">
          {models.length} моделей в коллекции
        </p>
      </div>

      <CatalogClient models={models} />
    </div>
  );
}
