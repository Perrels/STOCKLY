import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/app/_components/ui/alert-dialog";
import {
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import { deleteProduct } from "../../_actions/_products/delete-product";
import { toast } from "sonner";

interface DeleteDialogContentProps {
  productId: number;
}

const DeleteDialogContent = ({ productId }: DeleteDialogContentProps) => {
  const handleDeleteItem = async () => {
    try {
      await deleteProduct(productId);
      toast.success("Produto excluido com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir produto!");
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir o produto. Essa ação não pode ser
          desfeita!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteItem}>Excluir</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteDialogContent;
