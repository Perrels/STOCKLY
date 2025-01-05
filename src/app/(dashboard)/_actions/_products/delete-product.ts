"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (id: number) => {
  await db.product.delete({ where: { id: Number(id) } });
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/sales");
  revalidatePath("/dashboard/dash");
  revalidatePath("/", "layout");
};
