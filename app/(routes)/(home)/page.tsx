import BookCard from "@/components/book-card";
import Hero from "./_components/hero";
import Benefit from "./_components/benefit";
import Procedure from "./_components/procedure";
import { fetchHomeData } from "@/actions/home-actions";

export default async function Home() {
  try {
    const { muoiTom = [], muoiSot = [], combo = [] } = await fetchHomeData();
    return (
      <div>
        <Hero />
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
      </div>
    );
  } catch (error) {
    return <div>{(error as { message: string }).message}</div>;
  }
}
