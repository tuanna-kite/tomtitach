"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, Search, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileSidebar from "./mobile-sidebar";
import ProductSearch from "./product-search";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileHeader = () => {
  const [onSearch, setOnSearch] = React.useState(false);
  const pathname = usePathname();
  const sheetRef = React.useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (sheetRef?.current) {
      sheetRef.current.click();
    }
  }, [pathname]);

  return (
    <div className="md:hidden fixed inset-0 h-[56px] bg-white border-b border-b-black/10">
      <div className="flex items-center justify-between container w-full mx-auto h-[56px] px-3">
        {!onSearch && (
          <div className="flex space-x-3">
            <Sheet>
              <SheetTitle></SheetTitle>
              <SheetTrigger>
                <Menu className="text-slate-400" />
              </SheetTrigger>
              <SheetContent side="left" className="bg-white w-3/4 px-5">
                <SheetClose ref={sheetRef} />
                <SheetDescription></SheetDescription>
                <SheetHeader>
                  <Link href="/">
                    <div className="w-48 flex space-x-2 items-center">
                      <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={36}
                        height={36}
                        className="rounded-lg"
                      />
                      <h1 className="text-2xl font-semibold italic">
                        Tôm Tí Tách
                      </h1>
                    </div>
                  </Link>
                </SheetHeader>
                <MobileSidebar />
              </SheetContent>
            </Sheet>
          </div>
        )}

        {!onSearch && (
          <Link href="/">
            <div className="w-48 flex space-x-2 items-center">
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-semibold italic">Tôm Tí Tách</h1>
            </div>
          </Link>
        )}

        <ProductSearch show={onSearch} />

        <Button
          variant="link"
          onClick={() => setOnSearch(!onSearch)}
          className="p-0 pl-2"
        >
          {onSearch ? (
            <X className="text-slate-400" />
          ) : (
            <Search className="text-slate-400" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;
