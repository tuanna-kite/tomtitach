import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    const exchangeRequest = await db.exchangeRequest.findUnique({
      where: {
        id: params.requestId,
      },
    });
    if (!exchangeRequest) {
      return new NextResponse('Not found', { status: 404 });
    }

    const prevStatus = exchangeRequest?.status;

    const data = await request.json();

    if (userId !== exchangeRequest.userId && !profile?.admin) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updated = await db.exchangeRequest.update({
      where: {
        id: params.requestId,
      },
      data,
    });

    if (prevStatus === 'pending' && data.status === 'completed') {
      await db.profile.update({
        where: {
          userId: exchangeRequest.userId,
        },
        data: {
          bcoin: {
            increment: exchangeRequest.bcoin || 0,
          },
        },
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.log('EXCHANGES:PUT', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
