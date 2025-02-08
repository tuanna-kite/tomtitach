import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Benefit = () => {
  return (
    <div className="flex items-center space-x-0 flex-col-reverse md:flex-row md:space-x-16 py-20 lg:space-x-40">
      <div className="space-y-6 flex-1 max-sm:px-4">
        <h2 className="text-3xl font-semibold">Sứ mệnh</h2>
        <div className="space-y-4">
          <p>
            Từ những ruộng muối và vườn ớt Tây Ninh, <b>Tôm Tí Tách</b> ra đời
            với sứ mệnh mang đặc sản quê hương đến gần hơn với người Việt xa xứ.
            Chúng tôi tự hào khi từng hũ muối tôm không chỉ là một gia vị, mà
            còn là cầu nối đưa hương vị truyền thống đến với mỗi gia đình.
          </p>
          <p>
            Hơn thế nữa, chúng tôi mong muốn qua sản phẩm của mình, có thể gắn
            kết cộng đồng người Việt xa quê, để dù ở bất kỳ nơi đâu, bạn vẫn có
            thể cảm nhận được hơi thở của quê hương qua từng món ăn.{" "}
            <b>Tôm Tí Tách</b>
            không chỉ bán muối tôm, mà còn mang đến một phần ký ức, một phần
            tình yêu dành cho đất mẹ.
          </p>
        </div>
        <Button size="lg">
          <Link href="/about">Về chúng tôi</Link>
          <ArrowRight size={20} className="ml-3" />
        </Button>
      </div>
      <div className="flex-1 max-sm:mb-8 max-sm:px-4">
        <Image
          src="/about-us.jpg"
          width={544}
          height={362}
          alt="Book Benefit"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Benefit;
