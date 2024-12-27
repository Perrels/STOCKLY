"use client";

import { Button } from "@/app/_components/ui/button";
import { DialogHeader, DialogFooter } from "@/app/_components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/app/_components/ui/form";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { Loader2Icon } from "lucide-react";
import {useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "../../_actions/_products/create-product";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  onSuccess?: () => void;
}

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Campo obrigatório" }),
  price: z.number().min(0.01, { message: "Campo obrigatório" }),
  stock: z.coerce
    .number()
    .positive({ message: "O estoque tem que ser positivo" })
    .int()
    .min(0, { message: "Campo obrigatório" }),
});

export type FormSchemaProduct = z.infer<typeof formSchema>;

const AddEditProductDialogContentForm = ({ onSuccess }: Props) => {
  const form = useForm<FormSchemaProduct>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (data: FormSchemaProduct) => {
    // console.log("data onSubmit", data);
    try {
      await createProduct(data);
      //   setDialogIsOpen(false);
      onSuccess?.();
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar produto!");
    }
  };
  return (
    <>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Criar produto</DialogTitle>
              <DialogDescription>
                Insira as informações abaixo
              </DialogDescription>
            </DialogHeader>
            {/* fim do Header */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        allowNegative={false}
                        customInput={Input}
                        fixedDecimalScale
                        onValueChange={(value) =>
                          field.onChange(value.floatValue)
                        }
                        {...field}
                        onChange={() => {}}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
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
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="reset" variant={"secondary"}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="gap-1.5"
              >
                {form.formState.isSubmitting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};

export default AddEditProductDialogContentForm;
