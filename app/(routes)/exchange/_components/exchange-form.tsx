'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send2, Trash } from 'iconsax-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FileUpload } from '@/components/file-upload';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateExchangeRequestSchema = z.object({
  fullname: z.string().min(1, 'Tên không được để trống'),
  phone: z.string().min(1, 'Số điện thoại không được để trống'),
  address: z.string().min(1, 'Địa chỉ gửi không được để trống'),
  bookTitle: z.string().min(1, 'Tên sách không được để trống'),
  quantity: z.coerce.number().min(1, 'Lớn hơn 0'),
  image: z.string().url(),
});

const ExchangeForm = ({ userId }: { userId: string }) => {
  const [uploadedCover, setUploadedCover] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateExchangeRequestSchema>>({
    resolver: zodResolver(CreateExchangeRequestSchema),
    defaultValues: {
      fullname: '',
      phone: '',
      address: '',
      bookTitle: '',
      image: '',
      quantity: 0,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof CreateExchangeRequestSchema>
  ) => {
    try {
      const { data: exchangeRequest } = await axios.post('/api/exchanges', {
        ...data,
        userId,
      });
      console.log(exchangeRequest);
      router.refresh();
      toast.success('Product created successfully');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>Tạo yêu cầu</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 space-y-4'>
          <div className='flex max-sm:flex-col-reverse md:space-x-6'>
            <div className='flex-1 space-y-4'>
              <div className='flex space-x-4'>
                <div className='flex-1 space-y-2'>
                  <FormField
                    control={form.control}
                    name='fullname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ tên</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Nhập tên người gửi' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex-1 space-y-2'>
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Nhập số điện thoại' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ gửi sách</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Nhập địa chỉ gửi' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex space-x-4'>
                <div className='space-y-2 flex-1'>
                  <FormField
                    control={form.control}
                    name='bookTitle'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên sách</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Nhập tên sách' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='space-y-2 w-32'>
                  <FormField
                    control={form.control}
                    name='quantity'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số lượng</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Nhập số lượng'
                            type='number'
                            step={1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type='submit'
                className='rounded-xl px-8 w-full font-normal'
                size='lg'
                disabled={loading}
              >
                {loading ? 'Đang gửi....' : 'Gửi yêu cầu'}
                {!loading && <Send2 size={18} className='ml-2' />}
              </Button>
            </div>

            <div className='md:flex-1 max-sm:mb-8 bg-gray-300 rounded-3xl h-[280px]'>
              <div className='w-full h-full bg-white rounded-xl space-y-2'>
                <div>
                  {!uploadedCover && (
                    <FileUpload
                      endpoint='imageUploader'
                      onChange={(url) => {
                        if (!url) {
                          return toast.error('Upload failed');
                        }
                        form.reset({
                          ...form.getValues(),
                          image: url,
                        });
                        setUploadedCover(url!);
                      }}
                    />
                  )}
                  {uploadedCover && (
                    <div className='w-full relative'>
                      <Button
                        variant='destructive'
                        className='absolute right-4 top-4 p-2'
                        onClick={() => {
                          form.reset({
                            ...form.getValues(),
                            image: '',
                          });
                          setUploadedCover(null);
                        }}
                      >
                        <Trash />
                      </Button>
                      <Image
                        src={uploadedCover}
                        alt='cover'
                        className='w-full'
                        width={200}
                        height={100}
                      />
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Uploud cover' disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExchangeForm;
