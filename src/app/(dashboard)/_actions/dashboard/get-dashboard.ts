"use server";
import { db } from "@/app/_lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import dayjs from "dayjs";
import { ProductStatus } from "../_products/products";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

export interface MostSoldProducts {
  name: string;
  totalSold: number;
  status: ProductStatus;
  price: number;
  productId: number;
  stock: number;
}

interface DashBoardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
  mostSoldProducts: MostSoldProducts[];
}

export const getDashboard = async (): Promise<DashBoardDto> => {
  const today = dayjs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((day) =>
    dayjs(today).subtract(day, "day")
  );

  const totalLast14DaysRevenue: DayTotalRevenue[] = [];

  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: Decimal }[]
    >(
      `
      SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;
      `,
      day.startOf("day").toDate(),
      day.endOf("day").toDate()
    );
    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: Number(dayTotalRevenue[0].totalRevenue),
    });
  }

  const totalRevenueQuery = `SELECT SUM("unitPrice" * "quantity") as "totalRevenue" FROM "SaleProduct";`;

  const todayRevenueQuery = `SELECT SUM ("unitPrice" * "quantity") as "todayRevenue" FROM "SaleProduct" WHERE "createAt" >= $1 AND "createAt" <= $2;`;

  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

  //run the raw sql queries
  const totalRevenuePromise =
    db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery);

  const todayRevenuePromise = db.$queryRawUnsafe<{ todayRevenue: number }[]>(
    todayRevenueQuery,
    startOfDay,
    endOfDay
  );

  const totalSalesPromisse = db.sale.count();
  const totalStockPromisse = db.product.aggregate({
    _sum: { stock: true },
  });

  const totalProductsPromisse = db.product.count();

  // Query produtos mais vendidos
  const mostSoldProductsQuery = `
  SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."id" as "productId"
  FROM "SaleProduct"
  JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
  GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
  ORDER BY "totalSold" DESC
  LIMIT 5;
`;

  const mostSoldProductsPromise = db.$queryRawUnsafe<
    {
      name: string;
      totalSold: number;
      price: number;
      stock: number;
      productId: number;
    }[]
  >(mostSoldProductsQuery);

  //   cria uma lista que vai rodar todas as promisses ao mesmo tempo já que nenhuma depende da outra para funcionar

  const [
    totalRevenue,
    todayRevenue,
    totalSales,
    totalStock,
    totalProducts,
    mostSoldProducts,
  ] = await Promise.all([
    totalRevenuePromise,
    todayRevenuePromise,
    totalSalesPromisse,
    totalStockPromisse,
    totalProductsPromisse,
    mostSoldProductsPromise,
  ]);
  return {
    totalRevenue: totalRevenue[0].totalRevenue || 0,
    todayRevenue: todayRevenue[0].todayRevenue || 0,
    totalSales,
    totalStock: Number(totalStock._sum.stock || 0),
    totalProducts,
    totalLast14DaysRevenue,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  };
};
