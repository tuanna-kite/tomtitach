import React from "react";
import { ShieldTick } from "iconsax-react";

const ProcedureItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className=" flex flex-col items-center space-y-3 bg-primary-dark px-6 py-8 text-white rounded-2xl">
      <div>
        <ShieldTick size={32} color="white" />
      </div>
      <h3 className="text-lg font-semibold pt-4 text-center text-primary inter">
        {title}
      </h3>
      <p className="text-center text-sm inter font-light">{content}</p>
    </div>
  );
};

const Procedure = () => {
  return (
    <div className="space-y-10 py-16 px-4">
      <h2 className="text-3xl font-semibold text-center">
        Vì sao bạn nên chọn chúng tôi?
      </h2>
      <div className="grid grid-cols-1 md:gap-y-0 md:grid-cols-4 gap-6">
        <ProcedureItem
          title="NGUYÊN LIỆU SẠCH SẼ, CHUẨN CHỈ"
          content="Chọn lọc từ muối biển, tôm khô, ớt, tỏi tươi – đảm bảo an toàn, chất lượng."
        />
        <ProcedureItem
          title="HƯƠNG VỊ ĐẶC BIỆT - ĐA DẠNG CÁCH DÙNG"
          content="Chấm trái cây, bánh tráng, ướp thịt nướng – đậm đà, kích thích vị giác."
        />
        <ProcedureItem
          title="QUY TRÌNH SẢN XUẤT HIỆN ĐẠI"
          content="Sản xuất khép kín, giữ trọn hương vị tự nhiên, đảm bảo vệ sinh an toàn thực phẩm."
        />
        <ProcedureItem
          title="HƯƠNG VỊ ĐẶC BIỆT - ĐA DẠNG CÁCH DÙNG"
          content="Rang tay tỉ mỉ, giữ nguyên tinh hoa muối tôm chuẩn vị Tây Ninh."
        />
      </div>
    </div>
  );
};

export default Procedure;
