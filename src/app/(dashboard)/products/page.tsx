import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "@/app/_components/ui/data-table";
import { cachedGetProducts} from "../_actions/_products/products";
import { cookies, headers } from "next/headers";

// forçar que a pagina sempre seja renderizada de forma dinamica
export const dynamic = "force-dynamic";

const ProductsPage = async () => {
  // getting cookies
  const get_cookies = cookies();
  console.log(get_cookies);
  const get_headers = headers();
  console.log(get_headers);

  // chamando o banco de dados por um server componente
  // Vamos comentar esse abaixo pois vamos utilizar a outra forma que vai ser o fetch por HTTP
  const products = await cachedGetProducts();

  // Fazendo requisição por HTTP
  // const response = await fetch("http://localhost:3000/api/products");
  // const products = await response.json();
  return (
    <>
      <div className="w-full space-y-8 mx-4 mt-3 p-4 bg-white shadow-lg shadow-black/20 rounded-md">
        <div className="flex w-full items-center justify-between">
          {/* esquerda */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">
              Gestão de Produtos
            </span>
            <h2 className="text-xl font-semibold">Produtos</h2>
            {/* <p className="text-gray-500">Lista de produtos cadastrados</p> */}
          </div>
          {/* direita */}
          <Button className="gap-2">
            <PlusIcon size={20} /> Novo produto
          </Button>
        </div>
        {/* Passando dados como parametro para um client component */}
        <DataTable
          columns={productTableColumns}
          data={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </>
  );
};

export default ProductsPage;
