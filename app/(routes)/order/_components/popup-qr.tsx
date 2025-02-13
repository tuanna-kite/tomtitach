"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import qs from "querystring";
import Image from "next/image";
import { Triangle } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const QR_LINK = "https://img.vietqr.io/image/TCB-19036560147010-compact.jpg";

const PopupQR = ({
  amount,
  addInfo,
  size = "default",
}: {
  amount: number;
  addInfo: string;
  size?: "sm" | "default";
}) => {
  const topupInfo = {
    amount,
    addInfo,
  };
  const qrCode = `${QR_LINK}?${qs.stringify(topupInfo)}`;
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState(false);

  useEffect(() => {
    const onShowQRCode = () => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    onShowQRCode();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          {!message && (
            <Button
              className={cn("w-full", size === "sm" && "text-sm py-1")}
              variant={size === "sm" ? "ghost" : "default"}
              disabled={loading}
            >
              Chuyển khoản
            </Button>
          )}
          {message && (
            <Link
              href="/"
              className="block text-center border border-primary text-primary py-2 rounded-lg text-sm"
            >
              Trở về mua hàng
            </Link>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white p-8">
        <DialogHeader>
          <DialogTitle className="text-center">
            QR Code nhận thanh toán
          </DialogTitle>
          <DialogDescription>
            <div className="text-sm text-center text-gray-500 font-light">
              Sau khi thanh toán, vui lòng nhấn nút{" "}
              <span className="font-semibold text-blue-800 text-lg">
                Đã chuyển khoản
              </span>{" "}
              để chúng tôi có thể xác nhận và xử lý đơn hàng của bạn nhanh
              chóng. Xin cảm ơn!
            </div>
          </DialogDescription>
        </DialogHeader>
        <div>
          <Image
            src={qrCode}
            alt="qrCode"
            width={250}
            height={250}
            className={`mx-auto ${loading && "hidden"}`}
          />
        </div>
        {loading && (
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#0056D2"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass="mx-auto"
          />
        )}
        <DialogFooter>
          <Button
            type="button"
            onClick={() => setMessage(true)}
            className={cn("w-full", loading && "bg-gray-400")}
            disabled={loading || message}
          >
            Đã chuyển khoản
          </Button>
        </DialogFooter>
        {message && (
          <div className={`text-sm text-center font-semibold `}>
            Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của chúng tôi! Chúng tôi
            sẽ chủ động liên hệ với bạn trong vòng{" "}
            <span className="font-semibold text-blue-800 text-lg">2 giờ</span>{" "}
            sau khi thanh toán. Nếu quá thời gian trên mà chưa nhận được phản
            hồi, vui lòng liên hệ qua{" "}
            <span className="font-semibold text-blue-800 text-lg">
              Zalo 0123456789
            </span>{" "}
            để được hỗ trợ nhanh chóng. Xin cảm ơn!
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PopupQR;
