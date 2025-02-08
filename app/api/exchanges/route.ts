import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { ExchangeRequest } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const body: ExchangeRequest = await request.json();
    const exchangeRequest = await db.exchangeRequest.create({
      data: {
        ...body,
        userId,
      },
    });
    return NextResponse.json(exchangeRequest);
  } catch (error) {
    console.log('EXCHANGES:POST', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const exchangeRequests = await db.exchangeRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(exchangeRequests);
  } catch (error) {
    console.log('EXCHANGES:GET', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
