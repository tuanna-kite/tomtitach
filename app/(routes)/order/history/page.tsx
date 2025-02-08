import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { UsdCoin } from 'iconsax-react';

const OrderHistoryPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const orders = await db.orders.findMany({
    where: {
      userId,
    },
    include: {
      book: {
        include: {
          category: true,
        },
      },
    },
  });

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return (
    <div className='pt-[56px] md:pt-[88px]'>
      <div className='w-full max-w-5xl mx-auto px-8 xl:px-0 space-y-6'>
        <div className='flex justify-between items-center mt-6'>
          <h2 className='text-2xl font-semibold'>Lịch sử giao dịch</h2>
          <div className='flex space-x-1'>
            <div className='font-semibold'>YOUR BCOIN:</div>
            <div className='flex space-x-1'>
              <span className='text-primary font-semibold'>
                {profile?.bcoin ?? 0}
              </span>
              <UsdCoin className='text-coin' variant='Bold' />
            </div>
          </div>
        </div>
        <div>
          <DataTable data={orders} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
