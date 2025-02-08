'use client';
import { navbarRoutes } from '@/config/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

const MobileSidebar = () => {
  const pathname = usePathname();

  return (
    <div className='h-full w-full space-y-10 '>
      <ul className='flex flex-col space-y-3 w-full mt-8'>
        {navbarRoutes.map((route) => {
          const isActive =
            (pathname === '/' && route.route === '/') ||
            (route.route !== '/' && pathname.includes(route.route));
          return (
            <li
              key={route.route}
              className={cn(
                'border-b-2 border-transparent py-1 font-light',
                isActive && 'text-primary font-normal'
              )}
            >
              <Link href={route.route}>{route.label}</Link>
            </li>
          );
        })}
      </ul>
      <div className='flex flex-col space-y-4'>
        <Link href='/sign-up'>
          <Button className='w-full'>Đăng ký</Button>
        </Link>
        <Link href='/sign-up'>
          <Button variant='outline' className='w-full'>
            Đăng nhập
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileSidebar;
