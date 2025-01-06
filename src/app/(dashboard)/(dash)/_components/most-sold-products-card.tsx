import { StarIcon } from "lucide-react";
import MostSoldProdutcsItem from "./most-sold-produtcs-item";
import { getMostSoldProducts } from "../../_actions/dashboard/get-most-sold-products";

const MostSoldProductsCard = async () => {
  const mostSoldProducts = await getMostSoldProducts();
  return (
    <>
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
        <div className="h-9 w-9 flex items-center justify-center rounded-md text-emerald-500 bg-emerald-500 bg-opacity-10 mb-2 p-2">
          <StarIcon />
        </div>
        <p className="text-sm font-medium text-slate-500">
          Produtos mais vendidos
        </p>
        <div className="overflow-y-auto space-y-5">
          {mostSoldProducts.map((product) => (
            <MostSoldProdutcsItem key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MostSoldProductsCard;
