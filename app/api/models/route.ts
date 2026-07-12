import { NextRequest, NextResponse } from "next/server";
import { createModel, getModels } from "@/lib/models";
import { isDatabaseAvailable } from "@/lib/db";
import { getModelsFromMock } from "@/lib/mock-data";
import { z } from "zod";

export const dynamic = "force-static";

const modelsQuerySchema = z.object({
  brand: z.string().optional(),
  type: z.string().optional(),
  year: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
});

const createModelSchema = z.object({
  brand: z.string().min(1, "Марка обязательна").max(100),
  name: z.string().min(1, "Название обязательно").max(200),
  year: z.number().int().min(1900).max(2100),
  scale: z.string().min(1, "Масштаб обязателен").max(20),
  type: z.string().min(1, "Тип кузова обязателен").max(100),
  manufacturer: z.string().max(200).default(""),
  description: z.string().min(1, "Описание обязательно").max(5000),
  history: z.string().max(10000).default(""),
  imageUrl: z.string().max(500000).optional(),
  images: z.array(z.string().max(500000)).max(10).optional(),
  coverIndex: z.number().int().min(0).optional(),
  category: z.enum(["civil", "military"]).default("civil"),
  subcategory: z.enum(["passenger", "truck"]).default("passenger"),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const parsed = modelsQuerySchema.safeParse({
    brand: searchParams.get("brand") || undefined,
    type: searchParams.get("type") || undefined,
    year: searchParams.get("year") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные параметры", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const filters = parsed.data;
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    const models = getModelsFromMock(filters);
    return NextResponse.json({ models });
  }

  const models = await getModels(filters);
  if (models.length === 0) {
    const mockModels = getModelsFromMock(filters);
    return NextResponse.json({ models: mockModels });
  }
  return NextResponse.json({ models });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error:
          "Ошибка обработки запроса. Возможно, слишком большой размер данных (фото). Попробуйте добавить меньше фото или уменьшить их размер.",
      },
      { status: 400 }
    );
  }

  const parsed = createModelSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  const model = await createModel(parsed.data);
  return NextResponse.json({ model }, { status: 201 });
}
