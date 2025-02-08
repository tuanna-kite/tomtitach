import React from 'react';
import { Notification } from 'iconsax-react';
import AdminSearch from './admin-search';
import { UserButton } from '@clerk/nextjs';

const AdminHeader = () => {
  return (
    <div className='fixed pl-[251px] w-full h-[60px] shadow-sm z-10 bg-white'>
      <div className='flex items-center h-full px-4'>
        <div className='flex-1'>
          <AdminSearch />
        </div>
        <div className='flex items-center space-x-3'>
          <div>
            <Notification size={24} className='text-gray-600' />
          </div>
          <div className='w-[1px] h-[20px] bg-gray-300' />
          <div className='flex space-x-2 items-center'>
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
