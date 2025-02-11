import React from "react";
import { Categories as CategoriesType } from "@prisma/client";
import Image from "next/image";

interface ICategoryItem {
  category: CategoriesType;
}

const itemIconsMap: { [key: string]: string } = {
  "34d0f8e5-d27c-4ea9-80dc-44d3f9dc74d9": "/muoi-tom-bg.png",
  "7b12811a-0fce-4e50-a37b-65521ec8f27d": "/muoi-sot-bg.png",
  "aa1d0d3a-e413-47f7-b7f0-50f482ddf3a8": "/combo-banh-trang-bg.png",
};

function CategoryItem({ category }: ICategoryItem) {
  return (
    <div className="flex-1">
      <a href={`/stores?category=${category.slug}`} className="block">
        <Image
          src={itemIconsMap[category.id]}
          alt={category.id}
          width={512}
          height={303}
        />
      </a>
    </div>
  );
}

function Categories({ data }: { data: CategoriesType[] }) {
  return (
    <div className="px-8 lg:px-0 mt-16 mb-8 max-w-5xl mx-auto">
      <h2 className="text-4xl italic font-light mb-8 text-center md:text-left">
        Hôm nay
        <br />
        bạn muốn <span className="text-primary-dark font-normal">Ăn gì?</span>
      </h2>
      <div
        className="flex flex-col md:flex-row space-x-0 md:space-x-8 max-w-5xl mx-auto
        items-center space-y-8 md:space-y-0"
      >
        {data.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
