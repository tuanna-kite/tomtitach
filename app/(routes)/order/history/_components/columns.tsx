'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Books, Categories, Orders } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type BooksWithCategory = Orders & { book: Books & { category: Categories } };

const statusMap = {
  pending: 'Chờ thanh toán',
  paid: 'Đã thanh toán',
  canceled: 'Đã hủy',
};

export const columns: ColumnDef<BooksWithCategory>[] = [
  {
    id: 'title',
    accessorKey: 'book.title',

    header: ({ column }) => {
      return (
        <div className='w-[300px] px-2'>
          <Button
            variant='link'
            className='p-0'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>SẢN PHẨM</span>
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <Link href={`/order/checkout/${row.original.id}`}>
        <div className='w-[300px] px-2 flex space-x-3'>
          <div>
            <Image
              alt='book cover'
              src={row.original.book.cover!}
              width={50}
              height={100}
            />
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold'>{row.original.book.title}</span>
            <span className='font-light text-xs text-gray-500'>
              {row.original.book.author}
            </span>
          </div>
        </div>
      </Link>
    ),
  },
  {
    header: 'DANH MỤC',
    id: 'category',
    cell: ({ row }) => <span>{row.original.book.category.name}</span>,
  },
  {
    header: ({ column }) => {
      return (
        <div className='w-[100px]'>
          <Button
            variant='link'
            className='p-0 w-full'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>BCOIN</span>
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='flex w-[100px] justify-center text-primary font-semibold'>
        <span>{row.original.book.price}</span>
      </div>
    ),
    id: 'price',
    accessorKey: 'book.price',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <div className='w-[150px] '>
          <Button
            variant='link'
            className='p-0 w-full'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>NGÀY THÊM</span>
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='w-[150px] flex flex-col items-center'>
        <span>{moment(row.original.createdAt).format('DD/MM/YYYY')}</span>
        <span>{moment(row.original.createdAt).format('hh:mm')}</span>
      </div>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className='w-[150px]'>
          <Button
            variant='link'
            className='p-0 w-full'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>TRẠNG THÁI</span>
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'w-[150px] text-xs text-center rounded-full px-2 py-1',
            row.original.status === 'pending' &&
              'bg-orange-100 text-orange-700',
            row.original.status === 'paid' && 'bg-green-100 text-green-700',
            row.original.status === 'canceled' && 'bg-red-100 text-red-700'
          )}
        >
          {statusMap[row.original.status as keyof typeof statusMap]}
        </div>
      );
    },
  },
];
