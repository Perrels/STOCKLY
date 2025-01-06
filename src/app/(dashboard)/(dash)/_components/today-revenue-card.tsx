import { DollarSign } from "lucide-react";
import { formatCurrency } from "../../helper/currency";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { getTodayRevenue } from "../../_actions/dashboard/get-today-revenue";

const TodayRevenueCard = async () => {
  const todayRevenue = await getTodayRevenue();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSign />
      </SummaryCardIcon>
      <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TodayRevenueCard;
