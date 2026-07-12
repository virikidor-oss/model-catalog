import { NextRequest, NextResponse } from "next/server";
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/lib/models";
import { isDatabaseAvailable } from "@/lib/db";
import { getBlogPostByIdFromMock } from "@/lib/mock-data";
import { z } from "zod";

const updateBlogPostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).max(50000).optional(),
  type: z.enum(["note", "article"]).optional(),
    imageUrl: z.string().max(500000).optional(),

});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    const post = getBlogPostByIdFromMock(id);
    if (!post) {
      return NextResponse.json({ error: "Запись не найдена" }, { status: 404 });
    }
    return NextResponse.json({ post });
  }

  const post = await getBlogPostById(id);
  if (!post) {
    const mockPost = getBlogPostByIdFromMock(id);
    if (!mockPost) {
      return NextResponse.json({ error: "Запись не найдена" }, { status: 404 });
    }
    return NextResponse.json({ post: mockPost });
  }

  return NextResponse.json({ post });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const parsed = updateBlogPostSchema.safeParse(body);
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

  const post = await updateBlogPost(id, parsed.data);
  return NextResponse.json({ post });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  await deleteBlogPost(id);
  return NextResponse.json({ success: true });
}
