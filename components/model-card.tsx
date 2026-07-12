import Link from "next/link";
import Image from "next/image";
import type { CarModel } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Calendar, Ruler } from "lucide-react";

function getCoverImage(model: CarModel): string | undefined {
  if (model.images && model.images.length > 0) {
    const idx = model.coverIndex ?? 0;
    return model.images[idx] || model.images[0];
  }
  return model.imageUrl;
}

export function ModelCard({ model }: { model: CarModel }) {
  const coverSrc = getCoverImage(model);

  return (
    <Link href={`/models/${model.id}`}>
      <Card className="card-hover overflow-hidden cursor-pointer transition-colors hover:border-primary/50">
        <div className="aspect-[4/3] relative bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center">
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={`${model.brand} ${model.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized
            />
          ) : (
            <Car className="h-16 w-16 text-blue-300/70" />
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{model.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{model.brand}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {model.year}
            </span>
            <span className="flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5" />
              {model.scale}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
