"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Car,
  MessageSquare,
  Newspaper,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    function check() {
      const match = document.cookie.match(
        new RegExp(`(?:^|;\\s*)admin_session=([^;]*)`)
      );
      const session = match ? match[1] : null;
      if (session !== "authenticated") {
        router.push("/admin/login");
        return;
      }
      setChecking(false);
    }
    check();
  }, [router]);

  async function handleLogout() {
    const id = toast.loading("Выход...");
    try {
      await fetch("/api/auth", { method: "DELETE" });
      document.cookie = "admin_session=; SameSite=Lax; Path=/; Max-Age=0";
      toast.success("Вы вышли", { id });
      router.push("/admin/login");
    } catch {
      toast.error("Ошибка при выходе", { id });
    }
  }

  if (checking) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <p className="text-muted-foreground text-center">
          Проверка авторизации...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Админка</h1>
          <p className="text-muted-foreground">Управление коллекцией моделей</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Выйти
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link href="/admin/models">
          <div className="rounded-xl border p-6 space-y-3 hover:border-primary/50 transition-colors card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Модели</h2>
              <p className="text-sm text-muted-foreground">
                Добавление, редактирование и удаление моделей
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <span>Управлять</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>

        <Link href="/admin/blog">
          <div className="rounded-xl border p-6 space-y-3 hover:border-primary/50 transition-colors card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Newspaper className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Блог</h2>
              <p className="text-sm text-muted-foreground">
                Управление записями блога
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <span>Управлять</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>

        <Link href="/admin/comments">
          <div className="rounded-xl border p-6 space-y-3 hover:border-primary/50 transition-colors card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Комментарии</h2>
              <p className="text-sm text-muted-foreground">
                Просмотр и удаление комментариев
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <span>Управлять</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
