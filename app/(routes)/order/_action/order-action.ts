'use server';

import { db } from '@/lib/db';
import { EOrderStatus } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ==================== Create Order ====================
export type CreateOrderPayload = {
  userId: string;
  bookId: string;
  fullname: string;
  address: string;
  phone: string;
  district: string;
  city: string;
  email?: string;
};

export async function createOrder(payload: CreateOrderPayload) {
  try {
    const book = await db.books.findUnique({
      where: {
        id: payload.bookId,
      },
    });
    if (!book) {
      return {
        success: false,
        data: null,
        error: 'Sách không tồn tại',
      };
    }

    const createdOrder = await db.orders.create({
      data: {
        userId: payload.userId,
        bookId: payload.bookId,
        fullname: payload.fullname,
        address: payload.address,
        phone: payload.phone,
        district: payload.district,
        city: payload.city,
        email: payload.email,
        total: book.price,
      },
    });

    return {
      data: createdOrder,
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      error: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
    };
  }
}

// ==================== Create Topup Order ====================
export async function createTopupOrder(payload: {
  userId: string;
  amount: number;
  orderCode: string;
}) {
  try {
    const createdOrder = await db.topup.create({
      data: {
        userId: payload.userId,
        amount: payload.amount,
        orderCode: payload.orderCode,
      },
    });

    return {
      data: createdOrder,
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      error: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
    };
  }
}

// ==================== Process Order Payment ====================
export async function processOrderPayment(orderId: string) {
  try {
    const order = await db.orders.findUnique({
      where: {
        id: orderId,
        status: EOrderStatus.PENDING,
      },
    });
    if (!order) {
      return {
        success: false,
        data: null,
        error: 'Đơn hàng không tồn tại',
      };
    }

    const user = await db.profile.findUnique({
      where: {
        userId: order.userId,
      },
    });
    if (!user) {
      return {
        success: false,
        data: null,
        error: 'Người dùng không tồn tại',
      };
    }

    if (user.bcoin < order.total) {
      return {
        success: false,
        data: null,
        error: 'Số dư không đủ',
      };
    }

    await db.orders.update({
      where: {
        id: orderId,
      },
      data: {
        status: EOrderStatus.PAID,
      },
    });

    await db.profile.update({
      where: {
        userId: order.userId,
      },
      data: {
        bcoin: {
          decrement: order.total,
        },
      },
    });

    revalidatePath(`/order/checkout/${orderId}`);
    redirect(`/order/checkout/${orderId}`);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      error: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
    };
  }
}
