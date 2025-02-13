import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import TopupForm from "./topup-form";
// import { Chart } from "iconsax-react";
// import TopupForm from "./topup-form";

const Header = async () => {
  const { userId } = auth();

  return (
    <div className="hidden md:block fixed inset-0 top-0 md:top-[32px] h-[56px] bg-white z-50 border-b border-b-black/10">
      <div className="flex items-center justify-between max-w-5xl px-8 xl:px-0 w-full mx-auto py-2 h-[56px]">
        <Link href="/">
          <div className="w-48 flex space-x-2 items-center">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <h1 className="text-2xl font-semibold italic">Tôm Tí Tách</h1>
          </div>
        </Link>
        <div className="flex-1">{/*<ProductSearch />*/}</div>
        {userId ? (
          <div className="flex items-center space-x-2">
            <TopupForm size="sm" userId={userId} />
            <UserButton />
          </div>
        ) : (
          <div className="w-48 flex justify-between">
            <Link href="/sign-in" className="mr-2">
              <Button variant="ghost" className="inter">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline" className="inter">
                Đăng ký
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
