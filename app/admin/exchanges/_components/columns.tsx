'use client';

import { cn } from '@/lib/utils';
import { ExchangeRequest } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import Image from 'next/image';
import BcoinInput from './bcoin-input';

const statusMap = {
  pending: 'Đang xử lý',
  completed: 'Hoàn thành',
  canceled: 'Đã hủy',
};

export const columns: ColumnDef<ExchangeRequest>[] = [
  {
    accessorKey: 'createdAt',
    header: () => {
      return (
        <div className='w-[100px] text-center'>
          <span>NGÀY TẠO</span>
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
            src={row.original.image}
            width={50}
            height={100}
          />
        </div>
        <div className='flex flex-col space-y-1'>
          <span className='font-semibold'>{row.original.bookTitle}</span>
          <span className='font-light text-xs text-gray-500'>
            Số lượng: {row.original.quantity}
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
          <span>NGƯỜI GỬI</span>
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
          {row.original.address}
        </span>
      </div>
    ),
  },
  {
    header: 'BCOIN',
    id: 'bcoin',
    cell: ({ row }) => {
      return (
        <BcoinInput
          requestId={row.original.id}
          currentBcoin={row.original.bcoin}
          disabled={row.original.status !== 'pending'}
        />
      );
    },
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
            row.original.status === 'pending' && 'text-orange-500',
            row.original.status === 'completed' && 'text-green-600',
            row.original.status === 'canceled' && 'text-red-500'
          )}
        >
          {statusMap[row.original.status as keyof typeof statusMap]}
        </div>
      );
    },
  },
];
