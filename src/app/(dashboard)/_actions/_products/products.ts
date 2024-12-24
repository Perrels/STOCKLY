import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { cache } from "react";
import "server-only";


export const getProducts = async (): Promise<Product[]> => {
  console.log("Feching products...");
  const products = await db.product.findMany({});
  return products;
};

// criando função para memoizing 
/**
 * ALERTA, SO FUNCIONA COM FUNÇÃO QUE NÃO RECEBE PARAMETROS
 * @title Essa função pega todos os produtos do banco de dados
 * @description Cria uma função que utiliza o método cache do next para fazer o memoizin
 * que é basicamente não duplicar a chamada das funcoes, ao chama-las em 2 compoenntes diferentes
 */

export const cachedGetProducts = cache(getProducts);

export const createProduct = async (product: Product): Promise<void> => {
  await db.product.create({ data: product });
}