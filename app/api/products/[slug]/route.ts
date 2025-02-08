import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// ============================== GET ==============================
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const book = await db.books.findUnique({
      where: {
        slug: params.slug,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log('BOOK:GET', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}

// ============================== PUT ==============================
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { slug } = params;
    const book = await db.books.findUnique({
      where: {
        slug,
      },
    });
    if (!book) {
      return new NextResponse('Book not found', { status: 404 });
    }

    const body = await req.json();
    const updatedBook = await db.books.update({
      where: {
        slug,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.log('CATEGORY:PUT', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
