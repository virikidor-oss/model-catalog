import type { CarModel } from "./data";

export interface ShowroomCategory {
  id: string;
  title: string;
  description: string;
  models: CarModel[];
}

const MODEL_CATEGORY: Record<string, string> = {
  "model-1": "легковые",
  "model-2": "классика",
  "model-3": "классика",
  "model-4": "классика",
  "model-5": "классика",
  "model-6": "легковые",
  "model-7": "грузовики",
  "model-8": "классика",
  "model-9": "спецтехника",
  "model-10": "легковые",
};

const CATEGORY_META: { id: string; title: string; description: string }[] = [
  {
    id: "легковые",
    title: "Легковые",
    description: "Современные легковые автомобили и спорткары",
  },
  {
    id: "грузовики",
    title: "Грузовики",
    description: "Грузовая техника и магистральные тягачи",
  },
  {
    id: "спецтехника",
    title: "Спецтехника",
    description: "Строительная и промышленная техника",
  },
  {
    id: "классика",
    title: "Классика",
    description: "Ретро-автомобили и классические модели",
  },
];

export function getModelsGroupedByCategory(
  models: CarModel[]
): ShowroomCategory[] {
  const grouped = CATEGORY_META.map((meta) => ({
    id: meta.id,
    title: meta.title,
    description: meta.description,
    models: [] as CarModel[],
  }));

  for (const model of models) {
    const categoryId = MODEL_CATEGORY[model.id];
    if (!categoryId) continue;
    const category = grouped.find((c) => c.id === categoryId);
    if (category) {
      category.models.push(model);
    }
  }

  return grouped.filter((c) => c.models.length > 0);
}
