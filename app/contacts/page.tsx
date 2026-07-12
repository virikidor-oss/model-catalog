import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Clock, MessageSquareText } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@modelcars.ru",
    href: "mailto:info@modelcars.ru",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "г. Москва, ул. Коллекционная, д. 42",
  },
  {
    icon: Clock,
    label: "Часы работы",
    value: "Пн–Пт: 10:00–19:00, Сб–Вс: выходной",
  },
];

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <MessageSquareText className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Контакты</h1>
        </div>
        <p className="text-muted-foreground pl-[3.25rem]">
          Свяжитесь с нами — мы всегда рады помочь
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
