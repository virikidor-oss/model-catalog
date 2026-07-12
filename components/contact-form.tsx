"use client";

import { useState } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Пожалуйста, укажите имя");
      return;
    }

    if (!email.trim()) {
      toast.error("Пожалуйста, укажите email");
      return;
    }

    if (!message.trim()) {
      toast.error("Пожалуйста, напишите сообщение");
      return;
    }

    setSubmitting(true);
    const id = toast.loading("Отправка...");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка при отправке");
      }

      setName("");
      setEmail("");
      setMessage("");
      toast.success(
        "Сообщение отправлено! Мы свяжемся с вами в ближайшее время.",
        {
          id,
        }
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка при отправке", {
        id,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border p-6">
      <h3 className="text-lg font-semibold tracking-tight">Напишите нам</h3>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          <User className="h-3.5 w-3.5 inline mr-1.5" />
          Имя
        </label>
        <Input
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          <Mail className="h-3.5 w-3.5 inline mr-1.5" />
          Email
        </label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          <MessageSquare className="h-3.5 w-3.5 inline mr-1.5" />
          Сообщение
        </label>
        <Textarea
          placeholder="Напишите ваш вопрос или предложение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={5000}
          rows={5}
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="gap-2 w-full sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {submitting ? "Отправка..." : "Отправить сообщение"}
      </Button>
    </form>
  );
}
