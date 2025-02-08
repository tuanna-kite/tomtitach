import { ExchangeRequest } from '@prisma/client';
import { UsdCoin } from 'iconsax-react';
import { Dot } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type HistoryCardProps = {
  data: ExchangeRequest;
};

const HistoryCard = ({ data }: HistoryCardProps) => {
  return (
    <div className='flex space-x-5 p-4 rounded-2xl bg-gray-100 min-h-[200px]'>
      <div>
        <Image
          src={data.image}
          alt='book'
          width={176}
          height={264}
          className='w-32'
        />
      </div>
      <div className='space-y-1 text-sm font-light'>
        <h3 className='font-semibold text-base mb-4'>{data.bookTitle}</h3>

        <p className=''>
          <span className='text-gray-500'>Số lượng:</span> {data.quantity}
        </p>
        <p
          className={`${
            data.status === 'completed' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          <span className='text-gray-500'>Trạng thái:</span>{' '}
          {data.status === 'completed' ? 'Đã trao đổi' : 'Đã hủy'}
        </p>
        {data.bcoin && (
          <p className=' flex items-center space-x-2'>
            <span className='text-gray-500'>Coin nhận:</span>{' '}
            <span className='flex items-center text-primary font-medium'>
              {data.bcoin} <UsdCoin variant='Bold' color='#FBBF24' size={18} />
            </span>
          </p>
        )}
        <div className='flex items-center pt-4'>
          <p>{data.fullname}</p>
          <Dot size={18} />
          <p className='text-gray-500'>{data.phone}</p>
        </div>
        <p className='text-gray-500'>{data.address}</p>
      </div>
    </div>
  );
};

export default HistoryCard;
