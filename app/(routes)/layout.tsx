import Header from "@/components/header";
import MobileHeader from "@/components/mobile-header";
import Navbar from "@/components/navbar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";
import Footer2 from "@/components/footer2";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = auth();
  if (userId) {
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
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Header />
      <MobileHeader />
      <div className="w-full flex-1">{children}</div>
      <div className="py-16 bg-primary-dark">
        {/*<Footer />*/}
        <Footer2 />
      </div>
    </div>
  );
};

export default MainLayout;
