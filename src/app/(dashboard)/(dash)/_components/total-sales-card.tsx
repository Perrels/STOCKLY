import { CircleDollarSign } from "lucide-react";
import { getTotalSales } from "../../_actions/dashboard/get-total-sales";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";

const TotalSalesCard = () => {
    const totalSales = getTotalSales()
    return ( 
        <SummaryCard>
        <SummaryCardIcon>
          <CircleDollarSign />
        </SummaryCardIcon>
        <SummaryCardTitle>Vendas totais</SummaryCardTitle>
        <SummaryCardValue>{totalSales}</SummaryCardValue>
      </SummaryCard>
     );
}
 
export default TotalSalesCard;