import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// ============================== GET ==============================
export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const categories = await db.categories.findMany({
      include: {
        books: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log('CATEGORIES:POST', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}

// ============================== POST ==============================

type CreateCategoryRequest = {
  name: string;
  slug: string;
  description: string;
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body: CreateCategoryRequest = await req.json();
    const createdCategory = await db.categories.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(createdCategory);
  } catch (error) {
    console.log('CATEGORIES:POST', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
