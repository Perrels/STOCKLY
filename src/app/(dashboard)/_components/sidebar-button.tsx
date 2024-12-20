"use client";
import { Button } from "../../_components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarButtonsProps {
  children: React.ReactNode;
  href: string;
}
const SidebarButtons = ({ href, children }: SidebarButtonsProps) => {
  // utilizando pathname para fazer que os botões sejam mostrados ao estarem ativos na página deles
  const pathname = usePathname();
  return (
    <>
      <Button
        className="justify-start"
        variant={pathname === `${href}` ? "secondary" : "ghost"}
        asChild
      >
        <Link href={href} className="flex items-center gap-2">
          {children}
        </Link>
      </Button>
    </>
  );
};

export default SidebarButtons;
