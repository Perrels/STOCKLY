import { cachedGetProducts } from "../_actions/_products/products";
import { ComboboxOption } from "@/app/_components/combox";
import CreateSaleSheet from "./_components/create-sale-sheet";
import { DataTable } from "@/app/_components/ui/data-table";
import { saleTableColumns } from "./_components/table-columns-sales";
import { getSales } from "../_actions/_sales/get-sales";
// forçar que a pagina sempre seja renderizada de forma dinamica
export const dynamic = "force-dynamic";

const SalesPage = async () => {
  const sales = await getSales();
  const products = await cachedGetProducts();
  const productsOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id.toString(),
  }));
  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productsOptions,
  }));
  return (
    <>
      <div className="w-full space-y-8 mx-4 mt-3 p-4 bg-white shadow-lg shadow-black/20 rounded-md">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">
              Gestão de Vendas
            </span>
            <h2 className="text-xl font-semibold">Vendas</h2>
          </div>
          <CreateSaleSheet products={products} productOptions={productsOptions} />
        </div>
        <DataTable columns={saleTableColumns} data={tableData} />
      </div>
    </>
  );
};

export default SalesPage;
