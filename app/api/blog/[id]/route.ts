import { NextRequest, NextResponse } from "next/server";
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/lib/models";
import { isDatabaseAvailable } from "@/lib/db";
import { getBlogPostByIdFromMock, mockBlogPosts } from "@/lib/mock-data";
import { updateBlogPostSchema } from "@/lib/validation/blog";

export const dynamic = "force-static";

export function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    id: post.id,
  }));
}

export async function GET(
  _request: NextRequest,
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
  _request: NextRequest,
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
