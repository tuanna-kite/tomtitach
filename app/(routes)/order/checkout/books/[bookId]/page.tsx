import React from 'react';
import StepsHeader from '../../../_components/steps-header';
import { auth } from '@clerk/nextjs/server';
import OrderForm from '../../../_components/order-form';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

const CheckoutByBookPage = async ({
  params,
}: {
  params: { bookId: string };
}) => {
  const { userId } = auth();

  // TODO: Bring to actions
  const book = await db.books.findUnique({
    where: {
      id: params.bookId,
    },
  });

  if (!book) return redirect('/404');

  return (
    <div className='pt-[56px] md:pt-[88px]'>
      <div className='flex flex-col space-y-8 p-8 w-full max-w-5xl xl:px-0 mx-auto'>
        <StepsHeader />
        <h2 className='text-3xl font-semibold'>Địa chỉ giao hàng</h2>
        <OrderForm book={book} userId={userId!} />
      </div>
    </div>
  );
};

export default CheckoutByBookPage;
