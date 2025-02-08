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
    // TODO: Get Books
    const books = await db.books.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.log('CATEGORIES:POST', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}

// ============================== POST ==============================

type CreateBookRequest = {
  title: string;
  slug: string;
  author: string;
  description: string;
  publisher: string;
  cover: string;
  price: number;
  categoryId: string;
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body: CreateBookRequest = await req.json();
    const existedSlug = await db.books.findUnique({
      where: {
        slug: body.slug,
      },
    });

    if (existedSlug) {
      body.slug = `${body.slug}-${Date.now()}`;
    }

    const createdBook = await db.books.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(createdBook);
  } catch (error) {
    console.log('PRODUCTS:POST', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
