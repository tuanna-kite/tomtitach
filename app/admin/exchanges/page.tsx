'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DataTable } from './_components/data-table';
import { ExchangeRequest } from '@prisma/client';
import { columns } from './_components/columns';

const AdminExchangePage = () => {
  const [requests, setRequests] = useState<Array<ExchangeRequest>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/exchanges');
        console.log(data);

        setRequests(data);
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
      <h2 className='text-xl py-6 font-semibold'>Danh sách yêu cầu trao đổi</h2>
      <div className='shadow-sm'>
        <DataTable columns={columns} data={requests} />
      </div>
    </div>
  );
};

export default AdminExchangePage;
