import {Books} from '@prisma/client';
import {UsdCoin} from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {toCurrency} from "@/lib/utils";

interface TrendingCardProps {
  data: Books;
}

const TrendingCard = ({data}: TrendingCardProps) => {
  return (
    <Link href={`/stores/${data.slug}`} className='block'>
      <div className='bg-gray-100 p-4 flex space-x-8 md:space-x-4 rounded-2xl'>
        <div className='flex-1 aspect-square bg-white flex justify-center items-center lg:h-36 md:h-30'>
          <Image
            src={data.cover!}
            alt={data.title}
            width={248}
            height={248}
            className='w-full h-full object-contain'
          />
        </div>
        <div className='flex-1 flex flex-col justify-end space-y-2 overflow-hidden'>
          <h3 className='md:text-base lg:text-lg font-semibold w-full whitespace-nowrap text-ellipsis overflow-hidden'>
            {data.title}
          </h3>
          {/*<p className='text-gray-500 text-sm'>{data.author}</p>*/}
          <div className='flex space-x-1'>
            <span className='text-primary font-semibold'>{toCurrency(data.price)}</span>
            <UsdCoin className='text-coin' variant='Bold'/>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingCard;
