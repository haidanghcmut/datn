import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaGithubSquare,
  FaDribbbleSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-[1240px] mx-auto pt-96 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
      <div>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">OCR Hub</h1>
        <p className="py-4">
          Khám phá sức mạnh của công nghệ OCR. Dễ dàng trích xuất văn bản từ
          hình ảnh và tài liệu để nâng cao quy trình làm việc của bạn.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-medium text-gray-400">Dịch vụ</h6>
          <ul>
            <li className="py-2 text-sm">Nhận diện hình ảnh</li>
            <li className="py-2 text-sm">Phân tích tài liệu</li>
            <li className="py-2 text-sm">Trích xuất dữ liệu</li>
            <li className="py-2 text-sm">Chuyển đổi ảnh</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Tài nguyên</h6>
          <ul>
            <li className="py-2 text-sm">Tài liệu</li>
            <li className="py-2 text-sm">Đơn giản</li>
            <li className="py-2 text-sm">Tham chiếu API</li>
            <li className="py-2 text-sm">Phù hợp để học tập</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Công ty</h6>
          <ul>
            <li className="py-2 text-sm">Về chúng tôi</li>
            <li className="py-2 text-sm">Diễn đàn</li>
            <li className="py-2 text-sm">Công việc</li>
            <li className="py-2 text-sm">Liên hệ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
