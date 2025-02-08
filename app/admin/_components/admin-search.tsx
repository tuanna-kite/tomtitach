import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

const AdminSearch = () => {
  return (
    <div className='flex items-center w-[400px] space-x-1 border border-black/15 pr-3 rounded-lg'>
      <Input
        className='flex-1 text-sm border-0 focus-visible:ring-0 font-light placeholder:font-light'
        type='text'
        placeholder='Search'
      />
      <Search className='text-slate-400' size={20} />
    </div>
  );
};

export default AdminSearch;
