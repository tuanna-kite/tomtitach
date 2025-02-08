'use client';

import { cn } from '@/lib/utils';
import {
  BagHappy,
  Grid4,
  Icon,
  Layer,
  TableDocument,
  Convertshape,
} from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type AdminRoute = {
  label: string;
  route: string;
  icon: Icon;
};

const adminRoutes: AdminRoute[] = [
  {
    label: 'Bảng điều khiển',
    route: '/admin',
    icon: Grid4,
  },
  {
    label: 'Sản phẩm',
    route: '/admin/products',
    icon: BagHappy,
  },
  {
    label: 'Danh mục',
    route: '/admin/categories',
    icon: Layer,
  },
  {
    label: 'Đơn hàng',
    route: '/admin/orders',
    icon: TableDocument,
  },
  {
    label: 'Giao dịch',
    route: '/admin/exchanges',
    icon: Convertshape,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className='bg-white shadow-md h-screen w-[250px] fixed top-0 left-0 z-50'>
      <div className='px-4'>
        <Link href='/admin'>
          <div className='w-[204px] pr-12 h-[60px] flex items-center'>
            <Image src='/logo.png' alt='Logo' width={204} height={48} />
          </div>
        </Link>
        <div className='mt-6 space-y-6'>
          {adminRoutes.map((route) => {
            const { icon: Icon } = route;
            let isFocused = pathname.includes(route.route);
            if (pathname !== '/admin' && route.route === '/admin') {
              isFocused = false;
            }

            return (
              <div key={route.route}>
                <Link
                  href={route.route}
                  className={cn(
                    'flex space-x-2 p-3 rounded-xl text-gray-500 font-light',
                    isFocused && 'font-medium bg-primary-light text-primary'
                  )}
                >
                  <Icon variant={isFocused ? 'Bold' : 'Outline'} />
                  <span>{route.label}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
