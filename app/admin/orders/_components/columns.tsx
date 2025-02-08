'use client';

import { cn } from '@/lib/utils';
import { Books, Orders } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import Image from 'next/image';

const statusMap = {
  pending: 'Chờ thanh toán',
  paid: 'Đã thanh toán',
  canceled: 'Đã hủy',
};

export const columns: ColumnDef<Orders & { book: Books }>[] = [
  {
    accessorKey: 'createdAt',
    header: () => {
      return (
        <div className='w-[100px] text-center'>
          <span>NGÀY ĐẶT</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='w-[100px] text-center'>
        {moment(row.original.createdAt).format('DD/MM/YYYY')}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => {
      return (
        <div className='w-[300px] px-2'>
          <span>SẢN PHẨM</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='w-[300px] px-2 flex space-x-2'>
        <div>
          <Image
            alt='book cover'
            src={row.original.book.cover!}
            width={50}
            height={100}
          />
        </div>
        <div className='flex flex-col space-y-1'>
          <span className='font-semibold'>{row.original.book.title}</span>
          <span className='font-light text-xs text-gray-500'>
            {row.original.book.author}
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'orderInfo',
    header: () => {
      return (
        <div className='w-[200px] px-2'>
          <span>KHÁCH HÀNG</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='w-[300px] px-2 flex space-y-1 flex-col'>
        <span className='font-semibold'>{row.original.fullname}</span>
        <span className='font-light text-xs text-gray-500'>
          {row.original.phone}
        </span>
        <span className='font-light text-xs text-gray-500'>
          {row.original.address}, {row.original.district}, {row.original.city}
        </span>
        <span className='font-light text-xs text-gray-500'></span>
      </div>
    ),
  },
  {
    header: 'BCOIN',
    id: 'bcoin',
    cell: ({ row }) => (
      <div className='w-[100px]'>{row.original.book.price}</div>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => {
      return (
        <div className='w-[150px]'>
          <span>TRẠNG THÁI</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'w-[150px] rounded-full py-1',
            row.original.status === 'pending' && 'text-orange-600',
            row.original.status === 'paid' && 'text-green-600',
            row.original.status === 'canceled' && 'text-red-600'
          )}
        >
          {statusMap[row.original.status as keyof typeof statusMap]}
        </div>
      );
    },
  },
];
