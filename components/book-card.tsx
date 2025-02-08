import { Books } from "@prisma/client";
import { UsdCoin } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toCurrency } from "@/lib/utils";

export interface BookCardProps {
  data: Books;
}

const BookCard = ({ data }: BookCardProps) => {
  return (
    <Link href={`/stores/${data.slug}`}>
      <div className="space-y-4">
        <div className="w-full border bg-white rounded-2xl">
          <Image
            src={data.cover!}
            width={256}
            height={348}
            alt={data.title}
            className="w-full aspect-square object-contain rounded-2xl"
          />
        </div>
        <div className="w-full flex flex-col items-center space-y-2">
          <h3 className="md:text-lg lg:text-lg text-center font-semibold whitespace-nowrap text-ellipsis overflow-hidden w-full">
            {data.title}
          </h3>
          {/*<p className="text-gray-500 text-sm">{data.author}</p>*/}
          <div className="flex items-center space-x-2">
            <UsdCoin className="text-coin" variant="Bold" />
            <span className="text-primary font-semibold">
              {toCurrency(data.price)}
            </span>
            <span className="text-gray-600 font-semibold text-sm line-through">
              {toCurrency(Math.fround(data.price * 1.5))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
