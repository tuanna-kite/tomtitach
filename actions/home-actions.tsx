'use server';

import {db} from '@/lib/db';

export async function fetchHomeData() {
  const muoiTom = await db.books.findMany({
    where: {
      categoryId: "34d0f8e5-d27c-4ea9-80dc-44d3f9dc74d9", // Muoi tom
    }
  });

  const muoiSot = await db.books.findMany({
    where: {
      categoryId: "7b12811a-0fce-4e50-a37b-65521ec8f27d"
    }
  });

  const combo = await db.books.findMany({
    where: {
      categoryId: "aa1d0d3a-e413-47f7-b7f0-50f482ddf3a8"
    }
  });

  return {muoiTom, muoiSot, combo};
}
