import { NextRequest, NextResponse } from "next/server";
import { getModelById, updateModel, deleteModel } from "@/lib/models";
import { isDatabaseAvailable } from "@/lib/db";
import { getModelByIdFromMock, mockCarModels } from "@/lib/mock-data";
import { z } from "zod";


  return mockCarModels.map((model) => ({
    id: model.id,
  }));
}

const updateModelSchema = z.object({
  brand: z.string().min(1).max(100).optional(),
  name: z.string().min(1).max(200).optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  scale: z.string().min(1).max(20).optional(),
  type: z.string().min(1).max(100).optional(),
  manufacturer: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  history: z.string().min(1).max(10000).optional(),
  imageUrl: z.string().max(500000).optional(),
  images: z.array(z.string().max(500000)).max(10).optional(),
  coverIndex: z.number().int().min(0).optional(),
  category: z.enum(["civil", "military"]).optional(),
  subcategory: z.enum(["passenger", "truck"]).optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    const model = getModelByIdFromMock(id);
    if (!model) {
      return NextResponse.json({ error: "Модель не найдена" }, { status: 404 });
    }
    return NextResponse.json({ model });
  }

  const model = await getModelById(id);
  if (!model) {
    const mockModel = getModelByIdFromMock(id);
    if (!mockModel) {
      return NextResponse.json({ error: "Модель не найдена" }, { status: 404 });
    }
    return NextResponse.json({ model: mockModel });
  }

  return NextResponse.json({ model });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();
  const parsed = updateModelSchema.safeParse(body);

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

  const model = await updateModel(id, parsed.data);
  return NextResponse.json({ model });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  await deleteModel(id);
  return NextResponse.json({ success: true });
}
