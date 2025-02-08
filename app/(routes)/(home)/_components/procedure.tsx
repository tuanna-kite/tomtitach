import React from "react";

const ProcedureItem = ({
  numb,
  title,
  content,
}: {
  numb: number;
  title: string;
  content: string;
}) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex justify-center items-center w-8 h-8 bg-black text-white rounded-full">
        {numb}
      </div>
      <h3 className="text-lg font-semibold pt-4 text-center">{title}</h3>
      <p className="text-center text-sm">{content}</p>
    </div>
  );
};

const Procedure = () => {
  return (
    <div className="space-y-10 py-16 px-4">
      <h2 className="text-3xl font-semibold text-center">
        Vì sao bạn nên chọn chúng tôi?
      </h2>
      <div className="grid grid-cols-2 max-sm:gap-y-16 md:grid-cols-4 gap-6">
        <ProcedureItem
          numb={1}
          title="NGUYÊN LIỆU SẠCH SẼ, CHUẨN CHỈ"
          content="Chọn lọc từ muối biển, tôm khô, ớt, tỏi tươi – đảm bảo an toàn, chất lượng."
        />
        <ProcedureItem
          numb={2}
          title="HƯƠNG VỊ ĐẶC BIỆT - ĐA DẠNG CÁCH DÙNG"
          content="Chấm trái cây, bánh tráng, ướp thịt nướng – đậm đà, kích thích vị giác."
        />
        <ProcedureItem
          numb={3}
          title="QUY TRÌNH SẢN XUẤT HIỆN ĐẠI"
          content="Sản xuất khép kín, giữ trọn hương vị tự nhiên, đảm bảo vệ sinh an toàn thực phẩm."
        />
        <ProcedureItem
          numb={4}
          title="HƯƠNG VỊ ĐẶC BIỆT - ĐA DẠNG CÁCH DÙNG"
          content="Rang tay tỉ mỉ, giữ nguyên tinh hoa muối tôm chuẩn vị Tây Ninh."
        />
      </div>
    </div>
  );
};

export default Procedure;
