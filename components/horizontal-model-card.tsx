import Link from "next/link";
import Image from "next/image";
import type { CarModel } from "@/lib/data";
import { Ruler, Factory, Car } from "lucide-react";

function getCoverImage(model: CarModel): string | undefined {
  if (model.images && model.images.length > 0) {
    const idx = model.coverIndex ?? 0;
    return model.images[idx] || model.images[0];
  }
  return model.imageUrl;
}

export function HorizontalModelCard({ model }: { model: CarModel }) {
  const coverSrc = getCoverImage(model);

  return (
    <Link
      href={`/models/${model.id}`}
      className="group flex flex-col sm:flex-row overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative w-full sm:w-28 h-24 sm:h-auto shrink-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={`${model.brand} ${model.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 112px"
            unoptimized
          />
        ) : (
          <Car className="h-8 w-8 text-blue-300/70" />
        )}
      </div>
      <div className="flex flex-col justify-center p-3 gap-1 flex-1 min-w-0">
        <div>
          <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
            {model.brand} {model.name}
          </h3>
          <p className="text-xs text-muted-foreground">{model.type}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Ruler className="h-3 w-3" />
            {model.scale}
          </span>
          <span className="flex items-center gap-1">
            <Factory className="h-3 w-3" />
            {model.manufacturer}
          </span>
          <span className="text-xs text-muted-foreground">{model.year}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
          {model.description}
        </p>
      </div>
    </Link>
  );
}
