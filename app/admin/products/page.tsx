'use client';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Books, Categories } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';

type BooksWithCategory = Books & { category: Categories };

const AdminProductPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [books, setBooks] = React.useState<BooksWithCategory[]>([]);

  React.useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setBooks(data);
      } catch (error) {
        console.error('PRODUCTS:GET', error);
        toast.error('Lỗi khi lấy dữ liệu');
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Quản lý Sản Phẩm</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/admin'>Bảng điều khiển</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Sản phẩm</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className='shadow-sm'>
          <DataTable columns={columns} data={books} />
        </div>
      </div>
    </div>
  );
};

export default AdminProductPage;
