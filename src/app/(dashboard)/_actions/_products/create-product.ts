"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { FormSchemaProduct } from "../../products/_components/add-edit-product-dialog-form";

export const upsertProduct = async (data: FormSchemaProduct) => {
  await db.product.upsert({
    where: { id: data.id || 0 }, // Certifique-se de que `id` é uma string ou ajuste conforme necessário
    create: {
      name: data.name,
      price: data.price,
      stock: data.stock,
    },
    update: data,
  });
  revalidatePath("/dashboard/products");
  revalidatePath("/", "layout");
};
