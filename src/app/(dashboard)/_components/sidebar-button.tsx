"use client";
import { LayoutGrid, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarButtons = () => {
  // utilizando pathname para fazer que os botões sejam mostrados ao estarem ativos na página deles
  const pathname = usePathname();
  return (
    <>
      <div className="w-64 bg-white p-">
        {/* imagem */}
        <div className="px-8 py-6">
          <h1 className="font-bold text-2xl text-center">STOCKLY</h1>
        </div>
        {/* menu */}
        <div className="flex flex-col gap-2 p-2">
          <Button
            className="justify-start"
            variant={pathname === "/" ? "secondary" : "ghost"}
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <LayoutGrid size={20} /> Dashboard
            </Link>
          </Button>
          <Button
            className="justify-start"
            variant={pathname === "/products" ? "secondary" : "ghost"}
            asChild
          >
            <Link href="/products" className="flex items-center gap-2">
              <PackageIcon size={20} /> Products
            </Link>
          </Button>
          <Button
            className="justify-start"
            variant={pathname === "/sales" ? "secondary" : "ghost"}
            asChild
          >
            <Link href="/sales" className="flex items-center gap-2">
              <ShoppingBasketIcon size={20} /> Sales
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SidebarButtons;
