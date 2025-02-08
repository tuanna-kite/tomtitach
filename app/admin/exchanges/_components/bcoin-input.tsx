'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type BcoinInputProps = {
  currentBcoin?: number | null;
  requestId: string;
  disabled?: boolean;
};

const BcoinInput = ({
  currentBcoin = 0,
  requestId,
  disabled = false,
}: BcoinInputProps) => {
  const [bcoin, setBcoin] = useState(currentBcoin);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const handleSave = async () => {
    try {
      if (!bcoin || bcoin <= 0) {
        toast.error('Số bcoin phải lớn hơn 0');
        return;
      }
      await axios.put(`/api/exchanges/${requestId}`, {
        bcoin,
      });
      toast.success('Lưu thành công');
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Lưu thất bại');
    }
  };

  return isEditing ? (
    <div className='space-y-2'>
      <Input
        className='w-[90px]'
        autoFocus
        onChange={(e) => setBcoin(Number(e.target.value))}
        value={bcoin || 0}
        type='number'
        step={10}
      />
      <Button onClick={handleSave} className='w-[90px]'>
        Save
      </Button>
    </div>
  ) : (
    <Button
      className='w-[90px]'
      variant='outline'
      onClick={() => setIsEditing(true)}
      disabled={disabled}
    >
      {bcoin || 'Thiết lập'}
    </Button>
  );
};

export default BcoinInput;
