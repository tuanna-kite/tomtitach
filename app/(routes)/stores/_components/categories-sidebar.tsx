import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import qs from 'querystring';
import { X } from 'lucide-react';
import { Categories } from '@prisma/client';

type CategoriesSidebarProps = {
  searchParams: { category?: string };
  categories: Categories[];
};

const CategoriesSidebar = ({
  searchParams,
  categories,
}: CategoriesSidebarProps) => {
  const searchParamsWithoutCategory = { ...searchParams };
  delete searchParamsWithoutCategory.category;

  return (
    <div className='space-y-2'>
      <div className='flex items-center space-x-4'>
        <h3 className='text-lg font-semibold'>Danh mục</h3>
        {searchParams.category && (
          <div>
            <Link
              href={`/stores?${qs.stringify(searchParamsWithoutCategory)}`}
              className='text-xs px-2 py-1 rounded-full border border-gray-300 flex items-center space-x-1 text-gray-600'
            >
              <span>Clear</span>
              <X size={12} />
            </Link>
          </div>
        )}
      </div>
      <div className='space-y-2'>
        {categories.map((category) => (
          <div
            className={cn(
              'font-light hover:text-primary/90 transition',
              searchParams.category === category.slug &&
                'text-primary font-semibold'
            )}
            key={category.id}
          >
            <Link
              href={`/stores?${qs.stringify({
                ...searchParams,
                category: category.slug,
              })}`}
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSidebar;
