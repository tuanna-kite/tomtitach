import Image from 'next/image';
import React from 'react';

const AboutPage = () => {
  return (
    <div className='pt-[56px] md:pt-[88px] pb-10'>
      <div>
        <Image src='/about-bg.png' width={1440} height={500} alt='bg' />
      </div>
      <div className='max-w-4xl mx-auto space-y-8 mt-16 font-light px-8 lg:px-0'>
        <h2 className='text-3xl font-semibold'>Về chúng tôi</h2>
        <div>
          Xuất phát từ tình yêu sâu sắc dành cho tri thức và mong muốn lan tỏa
          văn hóa đọc đến cộng đồng, Dương Nhật Nam - nhà sáng lập BookVault đã
          tạo ra ứng dụng nhằm giúp kết nối những người yêu đọc sách, xây dựng
          một không gian nơi những cuốn sách cũ được “tái sinh” và truyền tay
          qua nhiều bạn đọc khác nhau, mỗi lần mang đến một góc nhìn và trải
          nghiệm mới. Với tinh thần tiên phong và khát khao chia sẻ, ứng dụng
          BookVault không chỉ để trao đổi sách, mà còn để kết nối con người và
          tri thức, tạo nên một cộng đồng gắn kết bởi niềm đam mê đọc sách.
        </div>
        <div className='space-y-2'>
          <p className='font-semibold text-lg'>Sứ mệnh</p>
          <p>
            Ứng dụng được tạo ra với sứ mệnh thúc đẩy thói quen đọc sách bền
            vững và xây dựng một cộng đồng đọc sách sôi động. Chúng tôi mong
            muốn khơi dậy niềm đam mê đọc trong từng cá nhân, giúp mọi người có
            cơ hội tiếp cận nguồn tri thức phong phú mà không bị ràng buộc bởi
            chi phí, đồng thời giảm thiểu lãng phí sách, bảo vệ môi trường.
          </p>
        </div>
        <div className='space-y-2'>
          <p className='font-semibold text-lg'>Tầm nhìn</p>
          <p>
            Chúng tôi hướng đến việc trở thành nền tảng trao đổi sách hàng đầu
            tại Việt Nam, một nơi mà mọi người có thể dễ dàng tìm thấy những
            cuốn sách yêu thích, chia sẻ những câu chuyện ý nghĩa và cùng nhau
            phát triển qua từng trang sách. Chúng tôi tin tưởng rằng mỗi cuốn
            sách có thể là cầu nối cho những mối quan hệ bền vững và là nền tảng
            cho một xã hội học tập suốt đời.
          </p>
        </div>
        <div className='space-y-2'>
          <p className='font-semibold text-lg'>Giá trị cốt lõi</p>
          <ol className='space-y-2'>
            <li>
              <b>1. Chia sẻ tri thức:</b> Mỗi cuốn sách được trao đổi là một lần
              chia sẻ kiến thức và cảm hứng cho người khác.
            </li>
            <li>
              <b>2. Bền vững:</b> Chúng tôi đề cao giá trị bền vững, tái sử dụng
              sách để giảm thiểu lãng phí tài nguyên.
            </li>
            <li>
              <b>3. Kết nối cộng đồng:</b> Chúng tôi không chỉ là một nền tảng
              trao đổi sách, mà còn là một nơi để những người yêu sách gặp gỡ,
              kết nối và xây dựng mối quan hệ dựa trên sự chia sẻ và thấu hiểu.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
