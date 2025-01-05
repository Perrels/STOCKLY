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

  // se tiver id então é um update
  const isUpdate = Boolean(data.id);

  await db.$transaction(async (trx) => {
    if (isUpdate) {
      // pega os produtos da venda existente antes de excluir
      const existingSale = await trx.sale.findUnique({
        where: { id: data.id },
        include: { products: true },
      });
      if (!existingSale) throw new Error("Sale not found");
      // exclui a venda 
      await trx.sale.delete({ where: { id: data.id } });
      // para cada produto da venda incrementamos novamente a quantidade no estoque
      for (const product of existingSale.products) {
        await trx.product.update({
          where: { id: product.productId },
          data: { stock: { increment: product.quantity } },
        });
      }
    }
    // recriamos a venda com valores atualizados
    const sale = await trx.sale.create({ data: { date: new Date() } });
    // para cada produto da venda, criamos um SaleProduct
    for (const product of data.product) {
      const productFromDB = await trx.product.findUnique({
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
  });

  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/sales");
  revalidatePath("/dashboard/dash");
  revalidatePath("/", "layout");
};
