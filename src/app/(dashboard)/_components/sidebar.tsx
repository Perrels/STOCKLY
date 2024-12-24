import { LayoutGrid, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButtons from "./sidebar-button";

const SideBar = () => {
 
  return (
    <>
        <div className="w-1/6 bg-white shadow-lg shadow-black/20">
        {/* imagem */}
        <div className="px-8 py-6">
          <h1 className="font-bold text-2xl text-center">STOCKLY</h1>
        </div>
        {/* menu */}
        <div className="flex flex-col gap-2 p-2">
          <SidebarButtons href="/"><LayoutGrid size={20} /> Dashboard</SidebarButtons>
          <SidebarButtons href="/products"><PackageIcon size={20} /> Products</SidebarButtons>  
          <SidebarButtons href="/sales"><ShoppingBasketIcon size={20} /> Sales</SidebarButtons>
        </div>
      </div>
    </>
  );
};
export default SideBar;
