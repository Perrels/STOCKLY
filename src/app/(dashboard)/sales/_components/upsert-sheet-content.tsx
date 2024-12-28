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
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { MoreHorizontalIcon, MoreVerticalIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "../../helper/currency";
import TableDropdownMenu from "./table-dropdown-menu";

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
      return [
        ...currentyProduct,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
    form.reset();
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
                <TableCell><TableDropdownMenu product={product} onDelete={removeProduct} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total da venda</TableCell>
              <TableCell className="text-left">{formatCurrency(productsTotal)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        {/* fim da tabela */}
      </SheetContent>
    </>
  );
};

export default UpsertSheetContent;
