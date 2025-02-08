'use client';
import React, { useState } from 'react';
import { processOrderPayment } from '../_action/order-action';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const PaymentButton = ({ orderId }: { orderId: string }) => {
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    try {
      setLoading(true);
      await processOrderPayment(orderId);
    } catch (error) {
      console.log(error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Button className='w-full py-5' disabled>
        Đang xử lý...
      </Button>
    );
  }

  return (
    <Button className='w-full py-5' onClick={handlePayment}>
      Thanh toán
    </Button>
  );
};

export default PaymentButton;
