import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full aspect-[16/8] bg-hero bg-cover bg-center flex items-center justify-center mt-[56px] md:mt-[88px] text-white md:px-12">
      <div className="max-w-5xl flex items-center">
        <div className="flex flex-col space-y-8 md:w-3/5 p-6 md:p-0 py-8">
          <h2
            className="text-2xl md:text-4xl font-light text-center md:text-left"
            style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}
          >
            Chào mừng bạn đến với
          </h2>
          <h1
            className="text-4xl md:text-6xl font-semibold text-center md:text-left"
            style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.7" }}
          >
            Tôm Tí Tách
          </h1>

          <p
            className="font-light text-sm text-center md:text-left"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7" }}
          >
            Mang đến <strong>Muối Tôm Tây Ninh</strong> chuẩn vị, được sản xuất
            từ những nguyên liệu tinh túy nhất. Không chỉ là gia vị, mà còn là
            hương vị quê hương dành cho người Việt ở khắp nơi trên thế giới.
          </p>

          <div className="pt-5 flex justify-center md:justify-start">
            <a
              href="/stores"
              className="bg-primary text-white px-8 py-3 rounded-lg flex shadow-md shadow-black
              items-center space-x-2 font-inter"
            >
              <span>ĐẶT HÀNG NGAY!</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
