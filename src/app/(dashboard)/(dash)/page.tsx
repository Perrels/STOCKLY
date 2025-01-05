import {
  BoxIcon,
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

export default async function Home() {
  const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts } =
    await getDashboard();
  return (
    <>
      <div className="w-full space-y-8 mx-4 mt-3 p-4 shadow-lg shadow-black/20 rounded-md">
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
      </div>
    </>
  );
}
