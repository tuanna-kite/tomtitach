import React from "react";
import { BrandConfig } from "@/config/constants";

const ContactPage = () => {
  return (
    <div className="pt-[56px] md:pt-[88px] pb-10">
      <div className="max-w-4xl mx-auto space-y-8 mt-16 font-light px-8 lg:px-0">
        <h2 className="text-3xl font-semibold">Liên hệ</h2>
        <div>
          Cách nhanh nhất để liên hệ với chúng tôi là sử dụng thông tin liên hệ
          bên dưới.
        </div>
        <div className="space-y-2">
          <div>
            <span className="font-medium">Địa chỉ:</span> {BrandConfig.address}
          </div>
          <div>
            <span className="font-medium">Email:</span> {BrandConfig.email}
          </div>
          <div>
            <span className="font-medium">Số điện thoại:</span>{" "}
            {BrandConfig.phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
