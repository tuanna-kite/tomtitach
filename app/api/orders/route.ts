import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const orders = await db.orders.findMany({
      include: {
        book: {
          select: {
            title: true,
            price: true,
            cover: true,
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log('ORDERS:GET', error);
    return new NextResponse('An error occurred. Please try again.', {
      status: 500,
    });
  }
}
