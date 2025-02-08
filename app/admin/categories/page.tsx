'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Categories } from '@prisma/client';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import toast from 'react-hot-toast';

type CategoriesWithBooks = Categories & { books: string[] };

// TODO: Add pagination
const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<CategoriesWithBooks[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.log('CATEGORIES:GET', error);
        toast.error('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Quản lý danh mục</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/admin'>Bảng điều khiển</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Danh mục</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='shadow-sm'>
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
