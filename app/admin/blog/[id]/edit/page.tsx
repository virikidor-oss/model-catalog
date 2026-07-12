import { EditBlogPostClient } from "@/components/edit-blog-post-client";
import { mockBlogPosts } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    id: post.id,
  }));
}

type EditBlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  const { id } = await params;

  return <EditBlogPostClient id={id} />;
}
