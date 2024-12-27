"use server";
import { db } from "@/app/_lib/prisma";
import { FormSchemaProduct } from "../../products/_components/add-product-button";
import { revalidatePath } from "next/cache";

export const createProduct = async (product: FormSchemaProduct) => {
  await db.product.create({ data: product });
  revalidatePath("/dashboard/products");
};
