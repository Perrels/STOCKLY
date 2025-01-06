"use server";
import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

interface DashBoardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
}

export const getDashboard = async (): Promise<DashBoardDto> => {
  const today = dayjs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((day) =>
    dayjs(today).subtract(day, "day")
  );

  const totalLast14DaysRevenue: DayTotalRevenue[] = [];

  for (const day of last14Days) {
    const totalRevenueQuery = await db.$queryRawUnsafe<
      { totalRevenue: number }[]
    >(
      `SELECT SUM ("unitPrice" * "quantity") as "totalRevenue" FROM "SaleProduct" WHERE "createAt" >= $1 AND "createAt" <= $2;`,
      day.startOf("day").toDate(),
      day.endOf("day").toDate()
    );

    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: totalRevenueQuery[0].totalRevenue,
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

  //   cria uma lista que vai rodar todas as promisses ao mesmo tempo já que nenhuma depende da outra para funcionar

  const [totalRevenue, todayRevenue, totalSales, totalStock, totalProducts] =
    await Promise.all([
      totalRevenuePromise,
      todayRevenuePromise,
      totalSalesPromisse,
      totalStockPromisse,
      totalProductsPromisse,
    ]);

  return {
    totalRevenue: totalRevenue[0].totalRevenue || 0,
    todayRevenue: todayRevenue[0].todayRevenue || 0,
    totalSales,
    totalStock: Number(totalStock._sum.stock || 0),
    totalProducts,
    totalLast14DaysRevenue,
  };
};
