import { getModelById, getReviewsByModelId } from "@/lib/models";
import { isDatabaseAvailable } from "@/lib/db";
import {
  getModelByIdFromMock,
  getReviewsByModelIdFromMock,
  mockCarModels,
} from "@/lib/mock-data";
import { ModelDetailClient } from "@/components/model-detail";
import { ModelReviews } from "@/components/model-reviews";
import { notFound } from "next/navigation";
import type { CarModel } from "@/lib/data";
import type { Review } from "@/lib/models";

export function generateStaticParams() {
  return mockCarModels.map((model) => ({
    id: model.id,
  }));
}

async function getModel(id: string): Promise<CarModel | null> {
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return getModelByIdFromMock(id) ?? null;
  }

  const model = await getModelById(id);
  if (!model) {
    return getModelByIdFromMock(id) ?? null;
  }
  return model;
}

async function getReviews(id: string): Promise<Review[]> {
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return getReviewsByModelIdFromMock(id);
  }

  const reviews = await getReviewsByModelId(id);
  if (reviews.length === 0) {
    return getReviewsByModelIdFromMock(id);
  }
  return reviews;
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = await getModel(id);

  if (!model) {
    notFound();
  }

  const reviews = await getReviews(id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <ModelDetailClient model={model} />
      <div className="mt-10">
        <ModelReviews modelId={id} initialReviews={reviews} />
      </div>
    </div>
  );
}
