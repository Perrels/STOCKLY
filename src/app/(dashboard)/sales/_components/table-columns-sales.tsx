"use client";
import { Button } from "@/app/_components/ui/button";
import { Sale } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import { GetSalesDTO } from "../../_actions/_sales/get-sales";
import { formatCurrency } from "../../helper/currency";

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
    cell: () => (
      <Button variant={"ghost"}>
        <MoreHorizontalIcon size={16} />
      </Button>
    ),
  },
];

const TableColumnsSales = () => {
  return <></>;
};

export default TableColumnsSales;
