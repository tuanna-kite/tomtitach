'use client';
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import qs from 'querystring';
import Image from 'next/image';
import { Triangle } from 'react-loader-spinner';
import { createTopupOrder } from '@/app/(routes)/order/_action/order-action';

const amountOptions = [50000, 100000, 200000, 300000, 500000, 1000000];
const QR_LINK =
  'https://img.vietqr.io/image/vietinbank-100003535252-compact.jpg';

function makeid(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const TopupForm = ({
  userId,
  size = 'default',
}: {
  userId: string;
  size?: 'sm' | 'default';
}) => {
  const [amount, setAmount] = React.useState(amountOptions[1]);
  const [qrCode, setQRCode] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [orderCode, setOrderCode] = React.useState<string>(makeid(8));
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<boolean>(false);

  useEffect(() => {
    const onShowQRCode = () => {
      setLoading(true);
      const topupInfo = {
        amount,
        addInfo: `code ${orderCode} topup ${amount / 1000}`,
      };
      setQRCode(`${QR_LINK}?${qs.stringify(topupInfo)}`);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    onShowQRCode();
  }, [amount, userId, orderCode]);

  const onCreateTopupOrder = async () => {
    try {
      setLoading(true);
      const data = await createTopupOrder({
        userId,
        amount: amount / 1000,
        orderCode,
      });
      if (data.success) {
        setMessage(`Mã đơn của bạn là ${orderCode}, vui lòng chờ xác nhận!`);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
        setMessage('Đã có lỗi xảy ra, vui lòng thử lại sau');
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  const onSelectedAmount = (selectedAmount: number) => {
    if (!message && amount === selectedAmount) return;

    const newOrderCode = makeid(8);
    setOrderCode(newOrderCode);
    setAmount(selectedAmount);
    setError(false);
    setMessage(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn('w-full', size === 'sm' && 'text-sm py-1')}
          variant={size === 'sm' ? 'ghost' : 'default'}
        >
          Nạp Bcoin
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-white p-8'>
        <DialogHeader>
          <DialogTitle>Nạp Bcoin</DialogTitle>
          <DialogDescription>Tỷ lệ quy đổi: 1.0000đ = 1 Coin</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-3 gap-4 py-4'>
          {amountOptions.map((option) => (
            <Button
              key={option}
              onClick={() => onSelectedAmount(option)}
              className={cn(
                'bg-gray-100 text-black shadow-none hover:bg-primary/20 ',
                option === amount && 'bg-primary text-white'
              )}
            >
              {option.toLocaleString()}
            </Button>
          ))}
        </div>
        {qrCode && (
          <div>
            <Image
              src={qrCode}
              alt='qrCode'
              width={300}
              height={300}
              className={`mx-auto ${loading && 'hidden'}`}
            />
          </div>
        )}
        {loading && (
          <Triangle
            visible={true}
            height='80'
            width='80'
            color='#0056D2'
            ariaLabel='triangle-loading'
            wrapperStyle={{}}
            wrapperClass='mx-auto'
          />
        )}
        <DialogFooter>
          <Button
            type='button'
            onClick={onCreateTopupOrder}
            className={cn('w-full', (loading || message) && 'bg-gray-400')}
            disabled={loading || !!message}
          >
            Đã chuyển khoản
          </Button>
        </DialogFooter>
        {message && (
          <div
            className={`text-sm text-center font-semibold ${
              error ? 'text-red-600' : 'text-green-700'
            }`}
          >
            {message}
          </div>
        )}
        <div className='text-sm text-center text-gray-500 font-light'>
          Nếu chưa nhận được BCoin vui lòng liên hệ tới số Zalo:{' '}
          <span className='font-semibold'>0123456789</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopupForm;
