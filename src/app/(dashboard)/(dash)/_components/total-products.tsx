import { ShoppingBasketIcon } from "lucide-react";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { getTotalProducts } from "../../_actions/dashboard/get-total-products";

const TotalProductsCard = async () => {
  const totalProducts = await getTotalProducts();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <ShoppingBasketIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Total Produtos</SummaryCardTitle>
      <SummaryCardValue>{totalProducts}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalProductsCard;
