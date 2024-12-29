"use client";
import { Combobox, ComboboxOption } from "@/app/_components/combox";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import {
  CheckIcon,
  PlusIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "../../helper/currency";
import TableDropdownMenu from "./upsert-table-dropdown-menu-sales";
import { createSale } from "../../_actions/_sales/create-sale";
import { toast } from "sonner";

const formSchema = z.object({
  productId: z.string(),
  quantity: z.coerce
    .number()
    .min(1, { message: "A quantidade deve ser maior que 0" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: Product[];
  productOptions: ComboboxOption[];
  onSubmitSuccess: () => void;
}

interface SelectedProducts {
  // VAI DA PAU TEM QUE SER NUMBER
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  products,
  productOptions,
  onSubmitSuccess,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(
    []
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id.toString() === data.productId
    );
    if (!selectedProduct) return;
    // const selectedID = selectedProduct.id.toString();
    setSelectedProducts((currentyProduct) => {
      const existingProduct = currentyProduct.find(
        (product) => product.id === selectedProduct.id
      );

      if (existingProduct) {
        // se a quantidade que estamos selecionando for maior que o estoque do produto, envia mensagem de erro ao user
        const productIsMoreThanStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsMoreThanStock) {
          form.setError("quantity", {
            message: `O estoque de ${selectedProduct.name} é insuficiente`,
          });
          return currentyProduct;
        }

        return currentyProduct.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      const productIsMoreThanStock = data.quantity > selectedProduct.stock;
      if (productIsMoreThanStock) {
        form.setError("quantity", {
          message: `O estoque de ${selectedProduct.name} é insuficiente`,
        });
        return currentyProduct;
      }
      form.reset();
      return [
        ...currentyProduct,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };
  // função de soma de valor total de produtos da venda
  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  /**
   * @params  productId: number
   * @description Remove um produto da lista de produtos da venda
   * @returns uma lista de produtos onde o produto selecionado não está na lista de produtos da venda
   */
  const removeProduct = (productId: number) => {
    setSelectedProducts((currentyProduct) => {
      return currentyProduct.filter((product) => product.id !== productId);
    });
  };

  // efetua a venda com os produtos selecionados
  const onSubmitSale = async () => {
    try {
      await createSale({
        product: selectedProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      });
      toast.success("Venda realizada com sucesso!");
      onSubmitSuccess();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao realizar venda!");
    }
  };

  return (
    <>
      <SheetContent className="!max-w-[50vw] !min-w-[600px]">
        <SheetHeader>
          <SheetTitle>Nova venda</SheetTitle>
          <SheetDescription>
            Insira as informações da venda abaixo
          </SheetDescription>
        </SheetHeader>
        {/* inicio formulário */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-6"
          >
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <FormControl>
                    <Combobox
                      placeholder="Selecione um produto"
                      options={productOptions}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira a quantidade do produto..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={"secondary"} type="submit" className="w-full">
              <PlusIcon size={20} /> Adicionar produto a venda
            </Button>
          </form>
        </Form>
        {/* fim do formulário */}
        {/* inicio da tabela */}
        <Table>
          <TableCaption>Lista de produtos selecionados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Preço Unitário</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(product.price * product.quantity)}
                </TableCell>
                <TableCell>
                  <TableDropdownMenu
                    product={product}
                    onDelete={removeProduct}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total da venda</TableCell>
              <TableCell className="text-left">
                {formatCurrency(productsTotal)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        {/* fim da tabela */}
        <SheetFooter>
          <Button onClick={onSubmitSale}
            className="w-full mt-10 gap-2"
            disabled={selectedProducts.length === 0}
          >
            <CheckIcon size={20} /> Finalizar Venda
          </Button>
        </SheetFooter>
      </SheetContent>
    </>
  );
};

export default UpsertSheetContent;
