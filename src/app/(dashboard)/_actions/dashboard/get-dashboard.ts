"use server";
import { db } from "@/app/_lib/prisma";

interface DashBoardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
}

export const getDashboard = async (): Promise<DashBoardDto> => {
  const totalRevenuePromisse = db.saleProduct.aggregate({
    _sum: { unitPrice: true },
  });

  const todayRevenuePromisse = db.saleProduct.aggregate({
    _sum: { unitPrice: true },
    where: {
      createAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });

  const totalSalesPromisse = db.sale.count();
  const totalStockPromisse = db.product.aggregate({
    _sum: { stock: true },
  });

  const totalProductsPromisse = db.product.count();

  //   cria uma lista que vai rodar todas as promisses ao mesmo tempo já que nenhuma depende da outra para funcionar

  const [totalRevenue, todayRevenue, totalSales, totalStock, totalProducts] = await Promise.all([
    totalRevenuePromisse,
    todayRevenuePromisse,
    totalSalesPromisse,
    totalStockPromisse,
    totalProductsPromisse,
  ]);

  return {
    totalRevenue: Number(totalRevenue._sum.unitPrice || 0),
    todayRevenue: Number(todayRevenue._sum.unitPrice || 0),
    totalSales,
    totalStock: Number(totalStock._sum.stock || 0),
    totalProducts,
  };
};
