import {
  BoxIcon,
  ChartBarIcon,
  CircleDollarSign,
  DollarSign,
  PackageCheck,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubTitle,
  HeaderTitle,
} from "../../_components/header";
import { Button } from "../../_components/ui/button";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboard } from "../_actions/dashboard/get-dashboard";
import { formatCurrency } from "../helper/currency";
import RevenueChart from "./_components/revenue-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export default async function Home() {
  const {
    totalRevenue,
    todayRevenue,
    totalSales,
    totalStock,
    totalProducts,
    totalLast14DaysRevenue,
  } = await getDashboard();
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
          <SummaryCard>
            <SummaryCardIcon>
              <DollarSign />
            </SummaryCardIcon>
            <SummaryCardTitle>Receita Total</SummaryCardTitle>
            <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
          </SummaryCard>
          {/* card receita de hoje */}
          <SummaryCard>
            <SummaryCardIcon>
              <DollarSign />
            </SummaryCardIcon>
            <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
            <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
          </SummaryCard>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {/* card rVendas totais */}
          <SummaryCard>
            <SummaryCardIcon>
              <CircleDollarSign />
            </SummaryCardIcon>
            <SummaryCardTitle>Vendas totais</SummaryCardTitle>
            <SummaryCardValue>{totalSales}</SummaryCardValue>
          </SummaryCard>
          {/* card Total em estoque */}
          <SummaryCard>
            <SummaryCardIcon>
              <PackageIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Total em estoque</SummaryCardTitle>
            <SummaryCardValue>{totalStock}</SummaryCardValue>
          </SummaryCard>
          {/* card Total de produtos */}
          <SummaryCard>
            <SummaryCardIcon>
              <ShoppingBasketIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Total Produtos</SummaryCardTitle>
            <SummaryCardValue>{totalProducts}</SummaryCardValue>
          </SummaryCard>
        </div>
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <div className="h-9 w-9 flex items-center justify-center rounded-md text-emerald-500 bg-emerald-500 bg-opacity-10 mb-2">
            <ChartBarIcon />
          </div>
          <p className="text-sm font-medium text-slate-500">Receita dos últimos 14 dias</p>
          <RevenueChart data={totalLast14DaysRevenue} />
        </div>
      </div>
    </>
  );
}
