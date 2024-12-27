"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  CheckIcon,
  ClipboardCopyIcon,
  EditIcon,
  Info,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Sem estoque";
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
      return (
        <Badge
          className="gap-1.5 w-32"
          variant={label === "Em estoque" ? "default" : "destructive"}
        >
          {label === "Em estoque" ? (
            <CheckIcon size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          {label}{" "}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      const idToString = product.id.toString();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreVerticalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => {
                navigator.clipboard.writeText(idToString);
              }}
            >
              <ClipboardCopyIcon size={16} /> Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-1.5"><EditIcon size={16}/> Editar</DropdownMenuItem>
            <DropdownMenuItem className="gap-1.5"><TrashIcon size={16}/>Excluir</DropdownMenuItem>
            <DropdownMenuItem className="gap-1.5"><Info size={16}/> Detalhes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
