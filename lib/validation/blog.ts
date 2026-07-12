import { z } from "zod";

export const createBlogPostSchema = z.object({
  title: z.string().min(1, "Заголовок обязателен").max(300),
  type: z.enum(["note", "article"]),
  content: z.string().min(1, "Текст обязателен").max(50000),
  imageUrl: z.string().max(500000).optional(),
});

export const updateBlogPostSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  type: z.enum(["note", "article"]).optional(),
  content: z.string().min(1).max(50000).optional(),
  imageUrl: z.string().max(500000).optional(),
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
