"use client";
import { Button } from "@/app/_components/ui/button";
import { Product, Sale } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import {
  MoreVerticalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
  Info,
} from "lucide-react";

import { useAction } from "next-safe-action/hooks";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";
import { toast } from "sonner";
import { deleteSale } from "../../_actions/_sales/delete-sale";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/app/_components/combox";
import { ProductDTO } from "../../_actions/_products/products";
import { GetSalesDTO } from "../../_actions/_sales/get-sales";

interface InfoDropdownMenuSalesProps {
  sale: Pick<GetSalesDTO, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductDTO[];
}
const InfoDropdownMenuSales = ({ sale, products, productOptions }: InfoDropdownMenuSalesProps) => {
  const [upsertSheetSaleIsOpen, setUpsertSheetSaleIsOpen] = useState(false);
  const { execute: executeDelete } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda excluida com sucesso");
    },
    onError: () => {
      toast.error("Erro ao excluir venda");
    },
  });

  const handleConfirmDelete = () => executeDelete({ id: sale.id });

  const handleCopyToClipboard = () => {
    const idToString = sale.id.toString();
    navigator.clipboard.writeText(idToString);
    toast.success("ID da venda copiado com sucesso!");
  };

  return (
    <>
      <Sheet
        open={upsertSheetSaleIsOpen}
        onOpenChange={setUpsertSheetSaleIsOpen}
      >
        <AlertDialog>
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
                  handleCopyToClipboard();
                }}
              >
                <ClipboardCopyIcon size={16} /> Copiar ID
              </DropdownMenuItem>

              <SheetTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <EditIcon size={16} /> Editar
                </DropdownMenuItem>
              </SheetTrigger>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <TrashIcon size={16} />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <DropdownMenuItem className="gap-1.5" disabled>
                <Info size={16} /> Detalhes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Alert Dialog Exclusion */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Você está prestes a excluir essa venda. Essa ação não pode ser
                desfeita!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleConfirmDelete()}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <UpsertSheetContent
          saleId={sale.id}
          productOptions={productOptions}
          products={products}
          onSubmitSuccess={setUpsertSheetSaleIsOpen}
          defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
            id: saleProduct.product_id,
            quantity: saleProduct.quantity,
            price: saleProduct.unitPrice,
            name: saleProduct.productName,
          }))} 
        />
      </Sheet>
    </>
  );
};

export default InfoDropdownMenuSales;
