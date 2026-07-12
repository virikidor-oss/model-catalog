import { NextRequest, NextResponse } from "next/server";
import { getReviewsByModelId, getAllReviews, createReview } from "@/lib/models";
import { isDatabaseAvailable } from "@/lib/db";
import {
  getReviewsByModelIdFromMock,
  getAllReviewsFromMock,
} from "@/lib/mock-data";
import { z } from "zod";



const createReviewSchema = z.object({
  modelId: z.string().min(1, "ID модели обязателен"),
  rating: z
    .number()
    .int()
    .min(1, "Минимальная оценка — 1")
    .max(5, "Максимальная оценка — 5"),
  author: z.string().min(1, "Имя обязательно").max(100),
  comment: z.string().min(1, "Комментарий не может быть пустым").max(2000),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const modelId = searchParams.get("modelId");
  const all = searchParams.get("all");

  const dbAvailable = await isDatabaseAvailable();

  if (all === "true") {
    if (!dbAvailable) {
      const reviews = getAllReviewsFromMock();
      return NextResponse.json({ reviews });
    }
    const reviewsFromDb = await getAllReviews();
    if (reviewsFromDb.length === 0) {
      const reviews = getAllReviewsFromMock();
      return NextResponse.json({ reviews });
    }
    return NextResponse.json({ reviews: reviewsFromDb });
  }

  if (!modelId) {
    return NextResponse.json(
      { error: "Параметр modelId или all=true обязателен" },
      { status: 400 }
    );
  }

  if (!dbAvailable) {
    const reviews = getReviewsByModelIdFromMock(modelId);
    return NextResponse.json({ reviews });
  }

  const reviewsFromDb = await getReviewsByModelId(modelId);
  if (reviewsFromDb.length === 0) {
    const reviews = getReviewsByModelIdFromMock(modelId);
    return NextResponse.json({ reviews });
  }
  return NextResponse.json({ reviews: reviewsFromDb });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = createReviewSchema.safeParse(body);

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

  const review = await createReview(parsed.data);
  return NextResponse.json({ review }, { status: 201 });
}
