"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, CheckIcon, X } from "lucide-react";

import ProductDropdownAction from "./product-dropdown-action";

// const getStatusLabel = (status: string) => {
//   if (status === "IN_STOCK") {
//     return "Em estoque";
//   }
//   return "Sem estoque";
// };

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Código",
  },
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      // const label = getStatusLabel(product.status);
      const stockValue = product.stock;
      return (
        <Badge
          className="gap-1.5 w-32"
          variant={
            stockValue === 0
              ? "destructive"
              : stockValue <= 5
                ? "alert"
                : "default"
          }
        >
          {stockValue === 0 ? (
            <X size={16} />
          ) : stockValue <= 5 ? (
            <AlertCircle size={16} />
          ) : (
            <CheckIcon size={16} />
          )}
          {stockValue === 0
            ? "Sem estoque"
            : stockValue <= 5
              ? "Estoque baixo"
              : "Em estoque"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => <ProductDropdownAction row={row.row.original} />,
  },
];
