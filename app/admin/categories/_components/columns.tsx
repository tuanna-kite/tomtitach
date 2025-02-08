'use client';

import { Button } from '@/components/ui/button';
import { Categories } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Categories & { books: string[] }>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className='w-[300px] px-2'>
          <Button
            variant='link'
            className='p-0'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>DANH MỤC</span>
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <p className='w-[300px] px-2'>{row.original.name}</p>,
  },
  {
    header: 'SL',
    id: 'books',
    cell: ({ row }) => <span>{row.original.books.length}</span>,
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
        <div className='flex justify-end space-x-2'>
          <Link href={`/admin/categories/${row.original.slug}`}>
            <Pencil size={16} className='text-primary' />
          </Link>
        </div>
      );
    },
  },
];
