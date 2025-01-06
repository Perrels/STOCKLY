import { Badge } from "@/app/_components/ui/badge";
import { MostSoldProducts } from "../../_actions/dashboard/get-dashboard";
import { formatCurrency } from "../../helper/currency";
import { AlertCircle, CheckIcon, X } from "lucide-react";

interface MostSoldProdutcsItemProps {
  product: MostSoldProducts;
}

const MostSoldProdutcsItem = ({ product }: MostSoldProdutcsItemProps) => {
  return (
    <>
      <div className="flex items-center justify-between bg-secondary rounded-md p-4 mr-4 overflow-y-hidden">
        <div className="space-y-[6px]">
          
          <p className="font-semibold">{product.name}</p>

          <p className="text-slate-500 font-medium">
            {formatCurrency(Number(product.price))}
          </p>
        </div>
        <div className="justify-end flex flex-col text-end">
          <p className="font-semibold">{product.totalSold} vendido(s)</p>
          <Badge
            className="gap-1 flex justify-center text-center w-full text-[0.5rem]"
            variant={
              product.stock === 0
                ? "destructive"
                : product.stock <= 5
                  ? "alert"
                  : "default"
            }
          >
            {product.stock === 0 ? (
              <X size={16} />
            ) : product.stock <= 5 ? (
              <AlertCircle size={16} />
            ) : (
              <CheckIcon size={16} />
            )}
            {product.stock === 0
              ? ""
              : product.stock <= 5
                ? ""
                : ""}
          </Badge>
        </div>
      </div>
    </>
  );
};

export default MostSoldProdutcsItem;
