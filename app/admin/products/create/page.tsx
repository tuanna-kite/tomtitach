'use client';
import React, { useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import 'react-quill/dist/quill.snow.css';
import { Editor } from '@/components/editor';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { stringToSlug } from '@/lib/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CreateProductBreadcrumb from './_components/breadcrumb';
import { FileUpload } from '@/components/file-upload';
import Image from 'next/image';
import { Trash } from 'iconsax-react';
import { Categories } from '@prisma/client';
import { Combobox } from '@/components/ui/combobox';

const CreateProductSchema = z.object({
  title: z.string().trim().min(1, 'Tên sản phẩm không được để trống'),
  categoryId: z.string().trim().min(1, 'Danh mục không được để trống'),
  slug: z.string().trim().optional(),
  author: z.string().trim().min(1, 'Tác giả không được để trống'),
  description: z.string().trim().min(1, 'Mô tả không được để trống'),
  publisher: z.string().trim().min(1, 'Nhà xuất bản không được để trống'),
  price: z.coerce.number().min(1, 'Giá không được để trống'),
  cover: z.string().trim().optional(),
});

const CreateProductPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [uploadedCover, setUploadedCover] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState<Categories[]>([]);

  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      title: '',
      slug: '',
      author: '',
      description: '',
      publisher: '',
      cover: '',
      price: 0,
      categoryId: '',
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: z.infer<typeof CreateProductSchema>) => {
    try {
      if (data.slug === '') {
        data.slug = stringToSlug(data.title);
      }

      await axios.post('/api/products', data);
      router.refresh();
      router.push('/admin/products');
      toast.success('Product created successfully');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-full'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>Thêm Sản Phẩm</h2>
        <CreateProductBreadcrumb />
      </div>
      <div className='flex space-x-8'>
        <div className='bg-white rounded-xl shadow-sm flex-1'>
          <h3 className='text-xl font-semibold border-b p-6'>
            Thông tin sản phẩm
          </h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='p-6 space-y-4'
            >
              <div className='flex space-x-6 flex-col-reverse md:flex-row'>
                <div className='flex-1 min-w-80 space-y-4'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên sách</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='categoryId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Danh mục</FormLabel>
                        <FormControl>
                          {/* <Input {...field} /> */}
                          <Combobox
                            options={categories.map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='slug'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='author'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tác giả</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='publisher'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nhà xuất bản</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BCoin</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <div className='w-96 bg-white rounded-xl space-y-2'>
                    <div className='mt-8'>
                      {!uploadedCover && (
                        <FileUpload
                          endpoint='imageUploader'
                          onChange={(url) => {
                            if (!url) {
                              return toast.error('Upload failed');
                            }
                            form.reset({
                              ...form.getValues(),
                              cover: url,
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
                                cover: '',
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
                      name='cover'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder='Uploud cover'
                              disabled
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center gap-x-2'>
                <Button type='submit'>Save</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
