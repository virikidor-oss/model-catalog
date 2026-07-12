import { NextRequest, NextResponse } from "next/server";
import { getAllBlogPosts, createBlogPost } from "@/lib/models";
import { isDatabaseAvailable } from "@/lib/db";
import { mockBlogPosts } from "@/lib/mock-data";
import { createBlogPostSchema } from "@/lib/validation/blog";



export async function GET() {
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json({ posts: mockBlogPosts });
  }

  try {
    const posts = await getAllBlogPosts();
    if (posts.length === 0) {
      return NextResponse.json({ posts: mockBlogPosts });
    }
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return NextResponse.json(
      { error: "Не удалось загрузить записи" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ошибка обработки запроса" },
      { status: 400 }
    );
  }

  const parsed = createBlogPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  const post = await createBlogPost(parsed.data);
  return NextResponse.json({ post }, { status: 201 });
}
