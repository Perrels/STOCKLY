import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  MoreVerticalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
  Info,
} from "lucide-react";
import { useState } from "react";
import AddEditProductDialogContentForm from "./add-edit-product-dialog-form";
import DeleteDialogContent from "./delete-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";

interface ProductDropdownActionProps {
  row: Product;
}
const ProductDropdownAction = ({ row }: ProductDropdownActionProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const idToString = row.id.toString();
  return (
    <>
      <AlertDialog>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
              <DialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <EditIcon size={16} /> Editar
                </DropdownMenuItem>
              </DialogTrigger>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <TrashIcon size={16} />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <DropdownMenuItem className="gap-1.5">
                <Info size={16} /> Detalhes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AddEditProductDialogContentForm
            onSuccess={() => setEditDialogOpen(false)}
            defaultValues={{
              id: row.id,
              name: row.name,
              price: Number(row.price),
              stock: row.stock,
            }}
          />
          <DeleteDialogContent productId={row.id} />
        </Dialog>
      </AlertDialog>
    </>
  );
};

export default ProductDropdownAction;
