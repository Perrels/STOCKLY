import { ChartBarIcon } from "lucide-react";
import { getLast14DaysRevenue } from "../../_actions/dashboard/get-last-14-days-revenue";
import RevenueChart from "./revenue-chart";

const Last14DaysRevenueCard = async () => {
  const last14DaysRevenue = await getLast14DaysRevenue();
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
      <div className="h-9 w-9 flex items-center justify-center rounded-md text-emerald-500 bg-emerald-500 bg-opacity-10 mb-2 p-2">
        <ChartBarIcon />
      </div>
      <p className="text-sm font-medium text-slate-500">
        Receita dos últimos 14 dias
      </p>
      <RevenueChart data={last14DaysRevenue} />
    </div>
  );
};

export default Last14DaysRevenueCard;
