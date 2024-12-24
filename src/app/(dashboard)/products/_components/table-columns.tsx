"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, CheckIcon } from "lucide-react";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return <Badge className="gap-1" variant={"success"}><CheckIcon size={16}/> Em estoque</Badge>;
  }
  return <Badge className="gap-1 items-center" variant={"destructive"}><AlertCircle size={16}/> Sem estoque</Badge>;
};

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
      const label = getStatusLabel(product.status);
      return label;
    },
  },
];
