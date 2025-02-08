'use client';

import React from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import qs from 'querystring';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const ProductSearch = ({ show = true }) => {
  const [search, setSearch] = React.useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = qs.parse(searchParams.toString());

  const onSearch = () => {
    router.push(`/stores?${qs.stringify({ ...currentSearch, search })}`);
  };

  return (
    <div
      className={cn(
        'flex items-center md:w-[70%] md:min-w-80 w-full mx-auto space-x-1 border border-gray-200 pr-3 rounded-lg transition',
        !show && 'hidden'
      )}
    >
      <Input
        className='flex-1 text-sm border-0 focus-visible:ring-0'
        type='text'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <button onClick={onSearch} disabled={search.length === 0}>
        <Search
          className={cn('text-gray-400', search.length > 0 && 'text-primary')}
        />
      </button>
    </div>
  );
};

export default ProductSearch;
