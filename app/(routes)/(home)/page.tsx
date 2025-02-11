import BookCard from "@/components/book-card";
import Hero from "./_components/hero";
import Benefit from "./_components/benefit";
import Procedure from "./_components/procedure";
import { fetchHomeData } from "@/actions/home-actions";
import Categories from "./_components/categories";
import Image from "next/image";

const fbLinks: string[] = ["/f4.jpeg", "/f2.jpeg", "/f6.jpeg", "/f5.jpeg"];

export default async function Home() {
  const {
    muoiTom = [],
    muoiSot = [],
    combo = [],
    categories,
  } = await fetchHomeData();
  return (
    <div>
      <Hero />
      <Categories data={categories} />
      <section className="py-10 px-8 xl:px-0">
        <div className="w-full space-y-4 max-w-5xl mx-auto">
          <h2 className="text-3xl">Các loại muối tôm</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {muoiTom.slice(0, 4).map((book) => (
              <BookCard key={book.id} data={book} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 px-8 xl:px-0">
        <div className="w-full space-y-4 max-w-5xl mx-auto">
          <h2 className="text-3xl">Các Loại Muối Sốt</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {muoiSot.map((book) => (
              <BookCard key={book.id} data={book} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 px-8 xl:px-0">
        <div className="w-full space-y-4 max-w-5xl mx-auto">
          <h2 className="text-3xl">Combo Bánh Tráng Mix Muối Tôm</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {combo.map((book) => (
              <BookCard key={book.id} data={book} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 px-8 xl:px-0 bg-primary-light">
        <div className="w-full max-w-5xl mx-auto">
          <Benefit />
        </div>
      </section>
      <section>
        <div className="w-full px-8 xl:px-0 max-w-5xl mx-auto">
          <Procedure />
        </div>
      </section>
      <section
        className="py-16 px-8 xl:px-0"
        style={{ backgroundImage: `url(/banner-feedback.jpeg)` }}
      >
        <h2 className="text-3xl text-primary-dark text-center font-semibold mb-10">
          Ý Kiến Từ Khách Hàng
        </h2>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {fbLinks.map((link) => (
            <div
              key={link}
              className="rounded-2xl overflow-hidden shadow-md shadow-[rgba(0,0,0,0.3)]"
            >
              <Image
                src={link}
                alt="f1"
                width={1120}
                height={2048}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
