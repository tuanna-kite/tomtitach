import React from 'react';
import ExchangeCard from './_components/exchange-card';
import HistoryCard from './_components/history-card';
import { auth } from '@clerk/nextjs/server';
import ExchangeForm from './_components/exchange-form';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const ExchangePage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/sign-in');
  }

  const exchangeRequests = await db.exchangeRequest.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const uncompletedRequests = exchangeRequests.filter(
    (request) => request.status !== 'completed' && request.status !== 'canceled'
  );

  const historyRequests = exchangeRequests.filter(
    (request) => request.status === 'completed' || request.status === 'canceled'
  );
  console.log(uncompletedRequests);

  return (
    <div className='pt-[56px] md:pt-[88px] w-full'>
      <div className='max-w-5xl mx-auto px-8 xl:px-0'>
        <h2 className='text-3xl font-semibold py-10'>Trao đổi</h2>
        {uncompletedRequests.length > 0 && (
          <div className='mb-20'>
            <h3 className='text-xl font-semibold mb-4'>Yêu cầu</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {uncompletedRequests.map((request) => (
                <ExchangeCard key={request.id} data={request} />
              ))}
            </div>
          </div>
        )}
        <ExchangeForm userId={userId!} />
        <div className='mt-20'>
          <h3 className='text-xl font-semibold mb-4'>Lịch sử</h3>
          {historyRequests.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {historyRequests.map((request) => (
                <HistoryCard key={request.id} data={request} />
              ))}
            </div>
          ) : (
            <div className='font-light text-gray-500'>
              Chưa có lịch sử trao đổi
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangePage;
