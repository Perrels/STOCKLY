"use server";
import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

/**
 *
 * @param data CreateSaleSchema
 * @description Cria uma venda, mas para cada venda adicionamos também na tabela de união SaleProducts
 * essa tabela é a reponsavel para mostrar todos os itens contidos nessa venda, então ao criar uma venda
 * criamos também os itens contidos na venda
 */
export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  

  await db.$transaction(async (trx) => {
    const sale = await db.sale.create({ data: { date: new Date() } });
  // para cada produto da venda, criamos um SaleProduct
  for (const product of data.product) {
    const productFromDB = await db.product.findUnique({
      where: { id: product.id },
    });
    // se produto não existir retorna um erro
    if (!productFromDB) throw new Error("Product not found");
    // verifica se tem estoque no produto para conseguir fazer a criação do dado no banco
    const productIsOutOfStock = product.quantity > productFromDB.stock;
    // se está com menor numero do estoque, retorna um erro
    if (productIsOutOfStock) throw new Error("Product out of stock");
    // senão, cria o SaleProduct
    await trx.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        unitPrice: productFromDB.price,
        quantity: product.quantity,
      },
    });
    // diminui o estoque do produto
    await trx.product.update({
      where: { id: product.id },
      data: { stock: { decrement: product.quantity } },
    });
  }
  })
  
  revalidatePath("/dashboard/products");
};
