import { cachedGetProducts } from "../_actions/_products/products";
import { ComboboxOption } from "@/app/_components/combox";
import CreateSaleSheet from "./_components/create-sale-sheet";
import { DataTable } from "@/app/_components/ui/data-table";
import { saleTableColumns } from "./_components/table-columns-sales";
import { getSales } from "../_actions/_sales/get-sales";
import Header, {
  HeaderLeft,
  HeaderTitle,
  HeaderSubTitle,
  HeaderRight,
} from "@/app/_components/header";
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
      <div className="w-full space-y-8 mx-4 mt-3 p-4 bg-white shadow-lg shadow-black/20 rounded-md overflow-auto">
        <Header>
          <HeaderLeft>
            <HeaderTitle>Vendas</HeaderTitle>
            <HeaderSubTitle>Gestão de vendas</HeaderSubTitle>
          </HeaderLeft>
          <HeaderRight>
            <CreateSaleSheet
              products={products}
              productOptions={productsOptions}
            />
          </HeaderRight>
        </Header>

        <DataTable columns={saleTableColumns} data={JSON.parse(JSON.stringify(tableData))} />
      </div>
    </>
  );
};

export default SalesPage;
