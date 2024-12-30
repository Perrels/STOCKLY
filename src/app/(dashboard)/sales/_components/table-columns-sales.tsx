"use client";
import { ColumnDef } from "@tanstack/react-table";
import { GetSalesDTO } from "../../_actions/_sales/get-sales";
import { formatCurrency } from "../../helper/currency";
import InfoDropdownMenuSales from "./info-dropdown-menu-sales";
import { ProductDTO } from "../../_actions/_products/products";
import { ComboboxOption } from "@/app/_components/combox";

interface SaleTableColumProps extends GetSalesDTO {
  products: ProductDTO[],
  productsOptions: ComboboxOption[]
}

export const saleTableColumns: ColumnDef<SaleTableColumProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "productsNames",
    header: "Produtos",
  },
  {
    accessorKey: "totalProductsNumber",
    header: "Qtd produtos",
  },
  {
    accessorKey: "totalValue",
    header: "Valor total",
    cell: ({
      row: {
        original: { totalValue },
      },
    }) => formatCurrency(totalValue),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: ({row: {original: sale}}) => (
      <InfoDropdownMenuSales sale={sale} productOptions={sale.productsOptions} products={sale.products}/>
    ),
  },
];
