import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";
import {
  ClipboardCopyIcon,
  TrashIcon,
  Info,
  MoreHorizontalIcon,
} from "lucide-react";
import { Product } from "@prisma/client";

interface TableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: number) => void;
}

const TableDropdownMenu = ({ product, onDelete }: TableDropdownMenuProps) => {
  const idToString = product.id.toString();
  return (
    <>
      {/* <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-1.5 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(idToString);
            }}
          >
            <ClipboardCopyIcon size={16} /> Copiar ID
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-1.5 cursor-pointer" onClick={() => onDelete(product.id)}>
            <TrashIcon size={16} />
            Excluir
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-1.5 cursor-not-allowed">
            <Info size={16} /> Detalhes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TableDropdownMenu;
