'use client';
import { Button } from '@/components/ui/button';
import { ExchangeRequest } from '@prisma/client';
import axios from 'axios';
import { UsdCoin } from 'iconsax-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

type ExchangeCardProps = {
  data: ExchangeRequest;
};

const ExchangeCard = ({ data }: ExchangeCardProps) => {
  const router = useRouter();
  const handleCancel = async () => {
    try {
      await axios.put(`/api/exchanges/${data.id}`, {
        status: 'canceled',
      });

      router.refresh();
      toast.success('Yêu cầu đã được hủy');
    } catch (error) {
      console.log('EXCHANGES:CANCEL', error);
      toast.error('An error occurred. Please try again.');
    }
  };
  const handleCompleted = async () => {
    try {
      await axios.put(`/api/exchanges/${data.id}`, {
        status: 'completed',
      });

      router.refresh();
      toast.success('Yêu cầu đã được hoàn thành');
    } catch (error) {
      console.log('EXCHANGES:CANCEL', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className='flex space-x-5 p-4 rounded-2xl bg-gray-100 h-[200px]'>
      <div>
        <Image
          src={data.image}
          alt='book'
          width={176}
          height={264}
          className='w-32'
        />
      </div>
      <div className='flex flex-col'>
        <div className='space-y-1'>
          <h3 className='font-semibold mb-4'>{data.bookTitle}</h3>
          <p className='font-light text-sm'>
            <span className='text-gray-500'>Số lượng:</span> 1
          </p>
          <p className='font-light text-sm text-primary'>
            <span className='text-gray-500'>Trạng thái:</span> Đang xử lý
          </p>
          {data.bcoin && (
            <p className='font-light text-sm flex items-center space-x-2'>
              <span className='text-gray-500'>Coin nhận:</span>{' '}
              <span className='flex items-center text-primary font-medium'>
                {data.bcoin}
                <UsdCoin variant='Bold' color='#FBBF24' size={18} />
              </span>
            </p>
          )}
        </div>
        <div className='space-x-3 flex-1 flex items-end'>
          <Button
            className='rounded-xl'
            variant='destructive_outline'
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button
            className='rounded-xl px-8'
            disabled={!data.bcoin}
            onClick={handleCompleted}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCard;
