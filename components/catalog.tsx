"use client";

import { useState } from "react";
import { HorizontalModelCard } from "@/components/horizontal-model-card";
import type { CarModel } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Truck, Shield, Car as CarIcon } from "lucide-react";

interface CatalogClientProps {
  models: CarModel[];
}

const mainTabs = [
  {
    id: "civil",
    label: "Гражданский транспорт",
    icon: Car,
  },
  {
    id: "military",
    label: "Военная техника",
    icon: Shield,
  },
] as const;

const civilSubTabs = [
  {
    id: "passenger",
    label: "Легковой",
    icon: CarIcon,
  },
  {
    id: "truck",
    label: "Грузовой",
    icon: Truck,
  },
] as const;

export function CatalogClient({ models }: CatalogClientProps) {
  const [mainTab, setMainTab] = useState("civil");
  const [subTab, setSubTab] = useState("passenger");

  const civilModels = models.filter((m) => m.category === "civil");
  const militaryModels = models.filter((m) => m.category === "military");

  const passengerModels = civilModels.filter(
    (m) => m.subcategory === "passenger"
  );
  const truckModels = civilModels.filter((m) => m.subcategory === "truck");

  function renderModelList(list: CarModel[]) {
    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-in fade-in duration-500">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <CarIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">
            Нет моделей в этой категории
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {list.map((model) => (
          <HorizontalModelCard key={model.id} model={model} />
        ))}
      </div>
    );
  }

  return (
    <Tabs value={mainTab} onValueChange={(v) => setMainTab(v)}>
      <TabsList className="mb-8">
        {mainTabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="civil" className="mt-0">
        <Tabs value={subTab} onValueChange={(v) => setSubTab(v)}>
          <TabsList className="mb-6">
            {civilSubTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="passenger" className="mt-0">
            {renderModelList(passengerModels)}
          </TabsContent>

          <TabsContent value="truck" className="mt-0">
            {renderModelList(truckModels)}
          </TabsContent>
        </Tabs>
      </TabsContent>

      <TabsContent value="military" className="mt-0">
        {renderModelList(militaryModels)}
      </TabsContent>
    </Tabs>
  );
}
