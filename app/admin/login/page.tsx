"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Введите пароль");
      return;
    }

    setLoading(true);
    const id = toast.loading("Вход...");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка входа");
      }

      toast.success("Добро пожаловать!", { id });
      document.cookie =
        "admin_session=authenticated; SameSite=Lax; Path=/; Max-Age=86400; Secure";
      setTimeout(() => {
        window.location.href = "/admin";
      }, 300);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка входа", { id });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-md">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <ShieldAlert className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Вход в админку</h1>
          <p className="text-sm text-muted-foreground">
            Введите пароль для доступа к управлению коллекцией
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Пароль</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full gap-2">
            <Lock className="h-4 w-4" />
            {loading ? "Вход..." : "Войти"}
          </Button>
        </form>
      </div>
    </div>
  );
}
