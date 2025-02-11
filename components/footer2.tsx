import React from "react";
import { Call, Location, Sms } from "iconsax-react";
import FooterContactForm from "@/components/FooterContactForm";
import { BrandConfig } from "@/config/constants";

function Footer2() {
  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto text-white">
      {/* Contact */}
      <div className="md:flex-1 space-y-6 p-6">
        <p>#Tomtitach</p>

        <h1 className="text-primary text-4xl font-semibold">
          Đặt hàng ngay
          <br />
          tại đây!
        </h1>

        <p>Chốt đơn nhanh chóng, giao tận tay!</p>

        <ul className="space-y-2 pt-4">
          <li className="flex space-x-2 items-center">
            <Location variant="Bold" className="text-primary" size={18} />
            <span className="text-sm">{BrandConfig.address}</span>
          </li>
          <li className="flex space-x-2 items-center">
            <Call variant="Bold" className="text-primary" size={18} />
            <span className="text-sm">{BrandConfig.phone}</span>
          </li>
          <li className="flex space-x-2 items-center">
            <Sms variant="Bold" className="text-primary" size={18} />
            <span className="text-sm">{BrandConfig.email}</span>
          </li>
        </ul>
      </div>

      {/* Form */}
      <div className="md:flex-1">
        <FooterContactForm />
      </div>
    </div>
  );
}

export default Footer2;
