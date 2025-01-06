import { DollarSign } from "lucide-react";
import { getTotalRevenue } from "../../_actions/dashboard/get-total-revenue";
import { formatCurrency } from "../../helper/currency";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";

const TotalRevenueCard = async () => {
  const totalRevenue = await getTotalRevenue();
  return (
    <>
      {/* card receita total */}
      <SummaryCard>
        <SummaryCardIcon>
          <DollarSign />
        </SummaryCardIcon>
        <SummaryCardTitle>Receita Total</SummaryCardTitle>
        <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
      </SummaryCard>
    </>
  );
};

export default TotalRevenueCard;
