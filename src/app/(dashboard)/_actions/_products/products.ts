import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import "server-only";


export const getProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany({});
  return products;
};

export const createProduct = async (product: Product): Promise<void> => {
  await db.product.create({ data: product });
}