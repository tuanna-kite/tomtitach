'use client';

import { Button } from '@/components/ui/button';
import { Books, Categories } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type BooksWithCategory = Books & { category: Categories };

export const columns: ColumnDef<BooksWithCategory>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <div className='w-[200px] px-2'>
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
      <div className='w-[200px] px-2 flex space-x-3'>
        <div>
          <Image
            alt='book cover'
            src={row.original.cover!}
            width={50}
            height={100}
          />
        </div>
        <div className='flex flex-col'>
          <span className='font-semibold'>{row.original.title}</span>
          <span className='font-light text-xs text-gray-500'>
            {row.original.author}
          </span>
        </div>
      </div>
    ),
  },
  {
    header: 'DANH MỤC',
    id: 'category',
    cell: ({ row }) => <span>{row.original.category.name}</span>,
  },
  {
    header: 'BCOIN',
    id: 'price',
    accessorKey: 'price',
  },
  {
    accessorKey: 'createdAt',
    header: 'NGÀY THÊM',
    cell: ({ row }) => (
      <span>{moment(row.original.createdAt).format('DD/MM/YYYY')}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='flex justify-end space-x-2 px-2'>
          <Link href={`/admin/products/${row.original.slug}`}>
            <Pencil size={16} className='text-primary' />
          </Link>
        </div>
      );
    },
  },
];
