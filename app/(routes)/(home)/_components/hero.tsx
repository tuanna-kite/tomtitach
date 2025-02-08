import React from "react";

const Hero = () => {
  return (
    <div className="w-full aspect-[16/8] bg-hero bg-cover bg-center flex items-center justify-center mt-[88px] text-white md:px-12">
      <div className="max-w-5xl flex items-center">
        <div className="flex flex-col space-y-8 md:w-3/5 p-6 md:p-0 py-8">
          <h2 className="text-2xl md:text-4xl font-light">
            Chào mừng bạn đến với
          </h2>
          <h1 className="text-4xl md:text-6xl">Tôm Tí Tách</h1>

          <p className="font-light text-sm">
            Mang đến <strong>Muối Tôm Tây Ninh</strong> chuẩn vị, được sản xuất
            từ những nguyên liệu tinh túy nhất. Không chỉ là gia vị, mà còn là
            hương vị quê hương dành cho người Việt ở khắp nơi trên thế giới.
          </p>

          <div className="pt-5">
            <a
              href="/stores"
              className="bg-white px-8 py-4 text-black rounded-lg"
            >
              Order Now!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
