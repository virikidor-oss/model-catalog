import { EditModelClient } from "@/components/edit-model-client";
import { mockCarModels } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockCarModels.map((model) => ({
    id: model.id,
  }));
}

type EditModelPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditModelPage({ params }: EditModelPageProps) {
  const { id } = await params;

  return <EditModelClient id={id} />;
}
