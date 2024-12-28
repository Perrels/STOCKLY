import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSheetContent from "./upsert-sheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/combox";

interface CreateSaleSheetProps {
  products: Product[];
  productOptions: ComboboxOption[];
}
const CreateSaleSheet = (props: CreateSaleSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} /> Nova venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent {...props} />
    </Sheet>
  );
};

export default CreateSaleSheet;
