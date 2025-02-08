'use client';
import Link from 'next/link';
import React from 'react';

const ErrorBoundary = () => {
  return (
    <div className='pt-[56px] md:pt-[88px]'>
      <div className='text-3xl text-center pt-16'>
        Đã có lỗi xảy ra. Vui lòng thử lại
      </div>
      <Link className='block mx-auto mt-8 text-center text-primary' href='/'>
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default ErrorBoundary;
