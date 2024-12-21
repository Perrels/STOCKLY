import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { PlusIcon } from "lucide-react";
import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "@/app/_components/ui/data-table";

const ProductsPage = async () => {
  // chamando o banco de dados
  const products = await db.product.findMany({});
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
      <DataTable columns={productTableColumns} data={products} />
      </div>
    </>
  );
};

export default ProductsPage;
