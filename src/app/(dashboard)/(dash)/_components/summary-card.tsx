import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-9 w-9 flex items-center justify-center rounded-md text-emerald-500 bg-emerald-500 bg-opacity-10 mb-2">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm font-medium text-slate-500">{children}</p>;
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
};

const SummaryCard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="bg-white rounded-xl p-6">{children}</div>
    </>
  );
};

export default SummaryCard;
