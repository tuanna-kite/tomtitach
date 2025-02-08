'use client';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter } from 'iconsax-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const MobileFilterSidebar = ({ children }: PropsWithChildren) => {
  const queryParams = useSearchParams();
  const category = queryParams.get('category');
  const sheetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (sheetRef?.current) {
      sheetRef.current.click();
    }
  }, [category]);

  return (
    <div className='md:hidden flex'>
      <Sheet>
        <SheetTitle></SheetTitle>
        <SheetTrigger>
          <Filter className='text-slate-400' />
        </SheetTrigger>
        <SheetContent side='left' className='bg-white w-3/4 px-5'>
          <SheetClose ref={sheetRef} />
          <SheetDescription></SheetDescription>
          <SheetHeader className='mb-6'>
            <Image src='/logo.png' alt='Logo' width={132} height={56} />
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilterSidebar;
