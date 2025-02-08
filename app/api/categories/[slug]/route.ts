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

    const category = await db.categories.findUnique({
      where: {
        slug: params.slug,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('CATEGORY:GET', error);
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
    const category = await db.categories.findUnique({
      where: {
        slug,
      },
    });
    if (!category) {
      return new NextResponse('Category not found', { status: 404 });
    }

    const body = await req.json();
    const updatedCategory = await db.categories.update({
      where: {
        slug,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log('CATEGORY:PUT', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
