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
import EditCategoryBreadcrumb from './_components/breadcrumb';
import { Categories } from '@prisma/client';

const EditCategorySchema = z.object({
  name: z.string().trim().min(1, 'Tên danh mục không được để trống'),
  slug: z.string().trim().optional(),
  description: z.string().trim().min(1, 'Mô tả không được để trống'),
});

const EditCategoryPage = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof EditCategorySchema>>({
    resolver: zodResolver(EditCategorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  });

  useEffect(() => {
    async function fetchCategory() {
      try {
        setLoading(true);
        const { data } = await axios.get<Categories>(
          `/api/categories/${params.slug}`
        );

        form.reset({
          name: data.name,
          slug: data.slug,
          description: data.description,
        });
      } catch (error) {
        console.log('CATEGORIES:GET', error);
        toast.error('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchCategory();
  }, []);

  const onSubmit = async (data: z.infer<typeof EditCategorySchema>) => {
    try {
      if (data.slug === '') {
        data.slug = stringToSlug(data.name);
      }

      await axios.put(`/api/categories/${params.slug}`, data);
      router.refresh();
      router.push('/admin/categories');
      toast.success('Category updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>Sửa Danh Mục</h2>
        <EditCategoryBreadcrumb />
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 bg-white p-6 rounded-xl'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
  );
};

export default EditCategoryPage;
