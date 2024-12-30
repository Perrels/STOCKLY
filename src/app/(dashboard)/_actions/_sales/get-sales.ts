"use server";
import { db } from "@/app/_lib/prisma";
import { SaleProduct } from "@prisma/client";

interface SaleProductDTO {
  product_id: number;
  quantity: number;
  unitPrice: number;
  productName: string;
}

// Criando uma interface para devolver os valores que desejamos no final da chamada
// Que facilita muito na hora de devolver dados de campos dinamicos
export interface GetSalesDTO {
  id: number;
  productsNames: string;
  totalProductsNumber: number;
  totalValue: number;
  date: Date;
  saleProducts: SaleProductDTO[];
}

/**
 * @description Pega todas as vendas do banco de dados trata os dados necessários
 * como total de produtos e valor total e devolve os valores dinamicos na resposta
 */
export const getSales = async (): Promise<GetSalesDTO[]> => {
  const sales = await db.sale.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return sales.map((sale) => ({
    id: sale.id,
    productsNames: sale.products
      .map((saleProduct) => saleProduct.product.name)
      .join(", "),
    totalProductsNumber: sale.products.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0
    ),
    totalValue: sale.products.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0
    ),
    date: sale.date,
    saleProducts: sale.products.map((saleProduct): SaleProductDTO => ({
      product_id: saleProduct.productId,
      quantity: saleProduct.quantity,
      unitPrice: Number(saleProduct.unitPrice),
      productName: saleProduct.product.name
    }))
  }));
};
