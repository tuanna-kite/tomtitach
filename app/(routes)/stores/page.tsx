import React from 'react';
import ProductGrid from './_components/product-grid';
import CategoriesSidebar from './_components/categories-sidebar';
import MobileFilterSidebar from './_components/mobile-filter-sidebar';
import { getCategories } from './_actions/store-actions';

const StorePage = async ({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) => {
  const { data: categories, error } = await getCategories();
  if (error) {
    return null;
  }
  return (
    <div className='pt-[56px] md:pt-[88px]'>
      <div className='w-full max-w-5xl mx-auto px-8 xl:px-0'>
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold text-3xl py-8 max-sm:text-2xl'>
            Cửa hàng
          </h2>
          <MobileFilterSidebar>
            <CategoriesSidebar
              categories={categories}
              searchParams={searchParams}
            />
          </MobileFilterSidebar>
        </div>
        <div className='flex space-x-0 md:space-x-12 lg:space-x-8'>
          <div className='hidden md:block w-1/4 space-y-4'>
            <CategoriesSidebar
              categories={categories}
              searchParams={searchParams}
            />
          </div>
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default StorePage;
