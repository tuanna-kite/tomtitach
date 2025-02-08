'use client';
import React from 'react';
import { Triangle } from 'react-loader-spinner';

const LoadingScreen = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='flex item-center justify-center '>
        <Triangle
          visible={true}
          height='80'
          width='80'
          color='#0056D2'
          ariaLabel='triangle-loading'
          wrapperStyle={{}}
          wrapperClass=''
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
