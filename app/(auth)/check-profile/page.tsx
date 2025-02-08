import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const CheckProfilePage = async () => {
  const { userId } = auth();
  const profile = await db.profile.findUnique({
    where: {
      userId: userId!,
    },
  });

  if (!profile) {
    await db.profile.create({
      data: {
        userId: userId!,
      },
    });
  }
  return redirect('/');
};

export default CheckProfilePage;
