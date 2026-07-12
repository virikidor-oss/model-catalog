import { docClient } from "./db";
import {
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
  type ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { TableName, IndexName } from "./schema";
import type { CarModel } from "./data";

export interface Service {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive" | "deploying";
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  modelId: string;
  rating: number;
  author: string;
  comment: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  type: "note" | "article";
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getServiceById(id: string): Promise<Service | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.SERVICES,
      Key: { id },
    })
  );
  return (result.Item as Service) ?? null;
}

export async function getServicesByStatus(status: string): Promise<Service[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.SERVICES,
      IndexName: IndexName.SERVICES_STATUS,
      KeyConditionExpression: "#status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": status,
      },
    })
  );
  return (result.Items as Service[]) ?? [];
}

export async function getAllServices(): Promise<Service[]> {
  const result = await docClient.send(
    new ScanCommand({
      TableName: TableName.SERVICES,
    })
  );
  return (result.Items as Service[]) ?? [];
}

export async function createService(
  data: Omit<Service, "createdAt" | "updatedAt">
): Promise<Service> {
  const now = new Date().toISOString();
  const service: Service = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.SERVICES,
      Item: service,
    })
  );

  return service;
}

export async function updateService(
  id: string,
  data: Partial<Pick<Service, "name" | "description" | "status" | "url">>
): Promise<Service> {
  const updateExpr = [];
  const exprValues: Record<string, unknown> = {};
  const exprNames: Record<string, string> = {};

  if (data.name !== undefined) {
    updateExpr.push("#name = :name");
    exprValues[":name"] = data.name;
    exprNames["#name"] = "name";
  }

  if (data.description !== undefined) {
    updateExpr.push("#description = :description");
    exprValues[":description"] = data.description;
    exprNames["#description"] = "description";
  }

  if (data.status !== undefined) {
    updateExpr.push("#status = :status");
    exprValues[":status"] = data.status;
    exprNames["#status"] = "status";
  }

  if (data.url !== undefined) {
    updateExpr.push("#url = :url");
    exprValues[":url"] = data.url;
    exprNames["#url"] = "url";
  }

  updateExpr.push("updatedAt = :updatedAt");
  exprValues[":updatedAt"] = new Date().toISOString();

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TableName.SERVICES,
      Key: { id },
      UpdateExpression: `set ${updateExpr.join(", ")}`,
      ExpressionAttributeValues: exprValues,
      ExpressionAttributeNames:
        Object.keys(exprNames).length > 0 ? exprNames : undefined,
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes as Service;
}

export async function deleteService(id: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.SERVICES,
      Key: { id },
    })
  );
}

export interface CarModelFilters {
  brand?: string;
  type?: string;
  year?: number;
}

export async function getModels(
  filters?: CarModelFilters
): Promise<CarModel[]> {
  const filterExpr: string[] = [];
  const exprValues: Record<string, unknown> = {};
  const exprNames: Record<string, string> = {};

  if (filters?.brand) {
    filterExpr.push("#brand = :brand");
    exprValues[":brand"] = filters.brand;
    exprNames["#brand"] = "brand";
  }

  if (filters?.type) {
    filterExpr.push("#type = :type");
    exprValues[":type"] = filters.type;
    exprNames["#type"] = "type";
  }

  if (filters?.year) {
    filterExpr.push("#year = :year");
    exprValues[":year"] = filters.year;
    exprNames["#year"] = "year";
  }

  const params: ScanCommandInput = {
    TableName: TableName.MODELS,
  };

  if (filterExpr.length > 0) {
    params.FilterExpression = filterExpr.join(" AND ");
    params.ExpressionAttributeValues = exprValues;
    if (Object.keys(exprNames).length > 0) {
      params.ExpressionAttributeNames = exprNames;
    }
  }

  const result = await docClient.send(new ScanCommand(params));
  return (result.Items as CarModel[]) ?? [];
}

export async function getModelById(id: string): Promise<CarModel | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.MODELS,
      Key: { id },
    })
  );
  return (result.Item as CarModel) ?? null;
}

export async function createModel(
  data: Omit<CarModel, "id">
): Promise<CarModel> {
  const id = `model-${Date.now()}`;
  const model: CarModel = { id, ...data };

  await docClient.send(
    new PutCommand({
      TableName: TableName.MODELS,
      Item: model,
    })
  );

  return model;
}

export async function deleteModel(id: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.MODELS,
      Key: { id },
    })
  );
}

export async function updateModel(
  id: string,
  data: Partial<Omit<CarModel, "id">>
): Promise<CarModel> {
  const updateExpr: string[] = [];
  const exprValues: Record<string, unknown> = {};
  const exprNames: Record<string, string> = {};

  const fields: (keyof Omit<CarModel, "id">)[] = [
    "brand",
    "name",
    "year",
    "scale",
    "type",
    "manufacturer",
    "description",
    "history",
    "imageUrl",
    "images",
    "coverIndex",
    "category",
    "subcategory",
  ];

  for (const field of fields) {
    if (data[field] !== undefined) {
      updateExpr.push(`#${field} = :${field}`);
      exprValues[`:${field}`] = data[field];
      exprNames[`#${field}`] = field;
    }
  }

  if (updateExpr.length === 0) {
    const existing = await getModelById(id);
    if (!existing) throw new Error("Модель не найдена");
    return existing;
  }

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TableName.MODELS,
      Key: { id },
      UpdateExpression: `set ${updateExpr.join(", ")}`,
      ExpressionAttributeValues: exprValues,
      ExpressionAttributeNames: exprNames,
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes as CarModel;
}

export async function deleteReview(id: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.REVIEWS,
      Key: { id },
    })
  );
}

export async function getAllReviews(): Promise<Review[]> {
  const result = await docClient.send(
    new ScanCommand({
      TableName: TableName.REVIEWS,
    })
  );
  return (result.Items as Review[]) ?? [];
}

export async function getReviewsByModelId(modelId: string): Promise<Review[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.REVIEWS,
      IndexName: IndexName.REVIEWS_MODEL_ID,
      KeyConditionExpression: "modelId = :modelId",
      ExpressionAttributeValues: {
        ":modelId": modelId,
      },
    })
  );
  return (result.Items as Review[]) ?? [];
}

export async function createReview(
  data: Omit<Review, "id" | "createdAt">
): Promise<Review> {
  const review: Review = {
    id: `review-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.REVIEWS,
      Item: review,
    })
  );

  return review;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const result = await docClient.send(
    new ScanCommand({
      TableName: TableName.BLOG_POSTS,
    })
  );
  return (result.Items as BlogPost[]) ?? [];
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.BLOG_POSTS,
      Key: { id },
    })
  );
  return (result.Item as BlogPost) ?? null;
}

export async function createBlogPost(
  data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
): Promise<BlogPost> {
  const now = new Date().toISOString();
  const post: BlogPost = {
    id: `blog-${Date.now()}`,
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.BLOG_POSTS,
      Item: post,
    })
  );

  return post;
}

export async function updateBlogPost(
  id: string,
  data: Partial<Omit<BlogPost, "id" | "createdAt" | "updatedAt">>
): Promise<BlogPost> {
  const updateExpr: string[] = [];
  const exprValues: Record<string, unknown> = {};
  const exprNames: Record<string, string> = {};

  const fields: (keyof Omit<BlogPost, "id" | "createdAt" | "updatedAt">)[] = [
    "title",
    "type",
    "content",
    "imageUrl",
  ];

  for (const field of fields) {
    if (data[field] !== undefined) {
      updateExpr.push(`#${field} = :${field}`);
      exprValues[`:${field}`] = data[field];
      exprNames[`#${field}`] = field;
    }
  }

  updateExpr.push("updatedAt = :updatedAt");
  exprValues[":updatedAt"] = new Date().toISOString();

  if (updateExpr.length === 1) {
    const existing = await getBlogPostById(id);
    if (!existing) throw new Error("Запись не найдена");
    return existing;
  }

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TableName.BLOG_POSTS,
      Key: { id },
      UpdateExpression: `set ${updateExpr.join(", ")}`,
      ExpressionAttributeValues: exprValues,
      ExpressionAttributeNames: exprNames,
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes as BlogPost;
}

export async function deleteBlogPost(id: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.BLOG_POSTS,
      Key: { id },
    })
  );
}
