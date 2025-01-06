import { PackageIcon } from "lucide-react";
import { getTotalInStock } from "../../_actions/dashboard/get-total-in-stock";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";

const TotalInStockCard = async () => {
    const totalInStock = await getTotalInStock();
    return ( 
        <SummaryCard>
        <SummaryCardIcon>
          <PackageIcon />
        </SummaryCardIcon>
        <SummaryCardTitle>Total em estoque</SummaryCardTitle>
        <SummaryCardValue>{totalInStock}</SummaryCardValue>
      </SummaryCard>
     );
}
 
export default TotalInStockCard;