'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Books, Orders } from '@prisma/client';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState<Array<Orders & { book: Books }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/orders');
        setOrders(data);
      } catch (error) {
        console.log('ORDERS:GET', error);
        toast.error('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className='text-xl py-6 font-semibold'>Danh sách đơn hàng</h2>
      <div className='shadow-sm'>
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default AdminOrderPage;
