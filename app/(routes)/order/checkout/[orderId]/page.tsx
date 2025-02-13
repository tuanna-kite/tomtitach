import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import StepsHeader from "../../_components/steps-header";
import { auth } from "@clerk/nextjs/server";
import TopupForm from "@/components/topup-form";
import PaymentButton from "../../_components/payment-button";
import { toCurrency } from "@/lib/utils";
import React from "react";
import PopupQr from "@/app/(routes)/order/_components/popup-qr";

// TODO: Create Popup have QR code for payment with button "I have paid". When user click on the button, update order status to 'paid' and redirect to order detail page
const PaymentPage = async ({ params }: { params: { orderId: string } }) => {
  const { userId } = auth();
  const profile = await db.profile.findUnique({
    where: {
      userId: userId!,
    },
  });

  const order = await db.orders.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      book: {
        select: {
          title: true,
          author: true,
          cover: true,
          price: true,
          id: true,
        },
      },
    },
  });

  if (!order) {
    return redirect("/404");
  }

  const topupInfo = {
    amount: order.total,
    addInfo: order.id,
  };

  return (
    <div className="pt-[56px] md:pt-[88px]">
      <div className="flex flex-col space-y-8 p-8 w-full max-w-5xl xl:px-0 mx-auto">
        <StepsHeader activeStep={1} />
        <h2 className="text-3xl font-semibold">Thanh toán</h2>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-8 lg:gap-x-12 gap-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-xl">Giao hàng đến</div>
              <Button
                variant="outline"
                className="h-6 text-xs border-gray-300 text-gray-500 font-normal"
              >
                Sửa
              </Button>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">{order.fullname}</div>
              <div className="font-light text-gray-500">
                {order.phone}
                {order.email?.length ? ` - ${order.email}` : ""}
              </div>
              <div className="font-light text-gray-500">{order.address}</div>
              <div className="font-light text-gray-500">
                {order.district}, {order.city}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-semibold text-xl">Sản phẩm</div>
            <div className="flex space-x-4 items-center">
              <div className="border aspect-square w-16">
                <Image
                  src={order.book.cover!}
                  alt="cover"
                  width={64}
                  height={64}
                />
              </div>
              <div className="space-y-1 flex-1">
                <div className="font-semibold">{order.book.title}</div>
              </div>
              <div className="flex space-x-1">
                <span className="text-primary font-semibold">
                  {toCurrency(order.book.price)}
                </span>
              </div>
            </div>
            <div className="h-0.5 bg-gray-100" />
            <div>
              <div className="flex justify-between">
                <div className="font-semibold">Tổng tiền</div>
                <div className="flex space-x-1">
                  <span className="text-primary font-semibold">
                    {toCurrency(order.book.price)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Points bạn có</div>
                <div className="flex space-x-1">
                  <span className="text-primary font-semibold">
                    {profile!.bcoin}
                  </span>
                </div>
              </div>
            </div>
            {order.status === "pending" &&
              profile!.bcoin >= order.book.price && (
                <PaymentButton orderId={order.id} />
              )}
            {order.status === "pending" &&
              profile!.bcoin < order.book.price && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="text-red-500 font-semibold text-right w-full">
                    Số dư Points không đủ
                  </div>
                  <TopupForm userId={userId!} />
                </div>
              )}
            {order.status === "paid" && (
              <div className="text-green-500 font-semibold text-center">
                Đã thanh toán
              </div>
            )}
            <div>
              <PopupQr {...topupInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
