import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { cache } from "react";
import "server-only";

export type ProductStatus = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDTO extends Product {
  status: ProductStatus;
}

export const getProducts = async (): Promise<ProductDTO[]> => {
  const products = await db.product.findMany({orderBy: {name: "asc"}});
  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};

// criando função para memoizing 
/**
 * ALERTA, SO FUNCIONA COM FUNÇÃO QUE NÃO RECEBE PARAMETROS
 * @title Essa função pega todos os produtos do banco de dados
 * @description Cria uma função que utiliza o método cache do next para fazer o memoizin
 * que é basicamente não duplicar a chamada das funcoes, ao chama-las em 2 compoenntes diferentes
 */

export const cachedGetProducts = cache(getProducts);

// export const createProduct = async (product: Product): Promise<void> => {
//   await db.product.create({ data: product });
// }