'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, Search, X } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import MobileSidebar from './mobile-sidebar';
import ProductSearch from './product-search';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    <div className='md:hidden fixed inset-0 h-[56px] bg-white border-b border-b-black/10'>
      <div className='flex items-center justify-between container w-full mx-auto h-[56px] px-3'>
        {!onSearch && (
          <div className='flex space-x-3'>
            <Sheet>
              <SheetTitle></SheetTitle>
              <SheetTrigger >
                <Menu className='text-slate-400' />
              </SheetTrigger>
              <SheetContent side='left' className='bg-white w-3/4 px-5'>
                <SheetClose ref={sheetRef} />
                <SheetDescription></SheetDescription>
                <SheetHeader>
                  <Image src='/logo.png' alt='Logo' width={132} height={56} />
                </SheetHeader>
                <MobileSidebar />
              </SheetContent>
            </Sheet>
          </div>
        )}

        {!onSearch && (
          <Link href='/'>
            <Image src='/logo-wide.png' alt='Logo' width={112} height={56} />
          </Link>
        )}

        <ProductSearch show={onSearch} />

        <Button
          variant='link'
          onClick={() => setOnSearch(!onSearch)}
          className='p-0 pl-2'
        >
          {onSearch ? (
            <X className='text-slate-400' />
          ) : (
            <Search className='text-slate-400' />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;
