'use client';
import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import BookCard from '@/components/book-card';
import { useSearchParams } from 'next/navigation';
import { Books } from '@prisma/client';
import toast from 'react-hot-toast';
import { getProducts } from '../_actions/store-actions';
import { CirclesWithBar } from 'react-loader-spinner';

const ProductGrid = () => {
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page');
  const page = pageParams ? Number(pageParams) : 1;
  const searchBook = searchParams.get('search');

  const [nPages, setNPages] = useState(0);
  const [items, setItems] = useState<Books[]>([]);
  const category = searchParams.get('category');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data, error } = await getProducts({
          page: Number(page),
          category,
          searchBook,
        });
        if (error) {
          throw new Error(error);
        }
        setItems(data.items);
        setNPages(Math.ceil(data.total! / 9));
      } catch (error) {
        console.error(error);
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, category, searchBook]);

  if (loading) {
    return (
      <div className='h-full flex-1 flex item-center justify-center'>
        <CirclesWithBar
          height='100'
          width='100'
          color='#0056D2'
          outerCircleColor='#0056D2'
          innerCircleColor='#0056D2'
          barColor='#0056D2'
          ariaLabel='circles-with-bar-loading'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className='flex-1'>
      {items.length === 0 ? (
        <div className='w-full text-center text-gray-500 font-light text-sm'>
          Không có kết quả
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8'>
          {items.map((book) => (
            <BookCard key={book.id} data={book} />
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className='w-full mt-10'>
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href='#' />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={`/stores?page=${
                    page == 1 ? page : page === nPages ? page - 2 : page - 1
                  }`}
                  isActive={page === 1}
                >
                  {page == 1 ? page : page === nPages ? page - 2 : page - 1}
                </PaginationLink>
              </PaginationItem>
              {nPages >= 2 && (
                <PaginationItem>
                  <PaginationLink
                    href={`/stores?page=${
                      page === 1 ? page + 1 : page === nPages ? page - 1 : page
                    }`}
                    isActive={page != 1 && page != nPages}
                  >
                    {page === 1 ? page + 1 : page === nPages ? page - 1 : page}
                  </PaginationLink>
                </PaginationItem>
              )}
              {nPages >= 3 && (
                <PaginationItem>
                  <PaginationLink
                    href={`/stores?page=${
                      page === nPages ? page : page === 1 ? page + 2 : page + 1
                    }`}
                    isActive={page === nPages}
                  >
                    {page === nPages ? page : page === 1 ? page + 2 : page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {page < nPages && (
                <PaginationItem>
                  <PaginationNext href={`/stores?page=${page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
