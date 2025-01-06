import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubTitle,
  HeaderTitle,
} from "../../_components/header";
import { Button } from "../../_components/ui/button";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import SkeletonCard from "./_components/skeleton-card";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalInStockCard from "./_components/total-in-stock-card";
import TotalProductsCard from "./_components/total-products";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-chart";
import MostSoldProductsCard from "./_components/most-sold-products-card";

export default async function Home() {
  return (
    <>
      <div className="w-full space-y-8 mx-4 mt-3 p-4 shadow-lg shadow-black/20 rounded-md flex flex-col">
        <Header>
          <HeaderLeft>
            <HeaderTitle>Dashboard</HeaderTitle>
            <HeaderSubTitle>Visão geral</HeaderSubTitle>
          </HeaderLeft>
          <HeaderRight>
            <Button>Novo</Button>
          </HeaderRight>
        </Header>
        {/* display cards with values and charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* card receita total */}
          <Suspense fallback={<SkeletonCard />}>
            <TotalRevenueCard />
          </Suspense>
          {/* card receita de hoje */}
          <Suspense fallback={<SkeletonCard />}>
            <TodayRevenueCard />
          </Suspense>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {/* card rVendas totais */}
          <Suspense fallback={<SkeletonCard />}>
            <TotalSalesCard />
          </Suspense>
          {/* card Total em estoque */}
          <Suspense fallback={<SkeletonCard />}>
            <TotalInStockCard />
          </Suspense>
          {/* card Total de produtos */}
          <Suspense fallback={<SkeletonCard />}>
            <TotalProductsCard />
          </Suspense>
        </div>
        <div className="grid grid-cols-[2fr,1fr] min-h-0 gap-6">
          {/* chart 14 dias */}
          <Suspense fallback={<SkeletonCard />}>
            <Last14DaysRevenueCard />
          </Suspense>
          <Suspense fallback={<SkeletonCard />}>
            <MostSoldProductsCard />
          </Suspense>
        </div>
      </div>
    </>
  );
}
