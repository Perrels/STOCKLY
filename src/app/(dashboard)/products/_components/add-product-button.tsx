"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import AddEditProductDialogContentForm from "./add-edit-product-dialog-form";
import { useState } from "react";

const AddProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PlusIcon size={20} /> Novo produto
          </Button>
        </DialogTrigger>
        <AddEditProductDialogContentForm onSuccess={() => setDialogIsOpen(false)}/>
      </Dialog>
    </>
  );
};

export default AddProductButton;
