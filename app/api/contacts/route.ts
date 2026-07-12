import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



const contactFormSchema = z.object({
  name: z.string().min(1, "Имя обязательно").max(100),
  email: z.string().email("Некорректный email").max(200),
  message: z.string().min(1, "Сообщение обязательно").max(5000),
});

export async function POST(request: NextRequest) {
  const parsed = contactFormSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
