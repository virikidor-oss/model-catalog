import { PlusCircle } from "lucide-react";
import { PublicModelForm } from "@/components/public-model-form";

export default function AddModelPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <PlusCircle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Добавить модель</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Расскажите о модели из вашей коллекции
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <PublicModelForm />
      </div>
    </div>
  );
}
