"use client";
import { ColumnDef } from "@tanstack/react-table";
import { GetSalesDTO } from "../../_actions/_sales/get-sales";
import { formatCurrency } from "../../helper/currency";
import InfoDropdownMenuSales from "./info-dropdown-menu-sales";

export const saleTableColumns: ColumnDef<GetSalesDTO>[] = [
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
      <InfoDropdownMenuSales sale={sale}/>
    ),
  },
];

const TableColumnsSales = () => {
  return <></>;
};

export default TableColumnsSales;
