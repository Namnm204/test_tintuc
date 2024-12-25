const Footer = () => {
  return (
    <footer className="shadow border-t bg-white">
      <div className=" mx-auto flex flex-col lg:flex-row items-start p-6 md:p-10 gap-10">
        {/* Logo */}
        <div className="w-full lg:w-[15%] flex-shrink-0">
          <img
            src="/assets/logoweb-CVGW3161.png"
            alt="Logo"
            className="mx-auto lg:mx-0 md:w-full w-[50%]"
          />
        </div>

        {/* Nội dung chính */}
        <div className="w-full lg:flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-sm">
          {/* Về chúng tôi */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg mb-2">Về Chúng Tôi</h3>
            <p>
              <a href="/gioi-thieu" className="hover:text-gray-500">
                Giới thiệu
              </a>
            </p>
            <p>
              <a href="/tam-nhin" className="hover:text-gray-500">
                Tầm nhìn & Sứ mệnh
              </a>
            </p>
            <p>
              <a href="/bao-mat" className="hover:text-gray-500">
                Chính sách bảo mật
              </a>
            </p>
            <p>
              <a href="/dieu-khoan" className="hover:text-gray-500">
                Điều khoản sử dụng
              </a>
            </p>
            <p>
              <a href="/lien-he" className="hover:text-gray-500">
                Liên hệ
              </a>
            </p>
            <p>
              <a href="/tuyen-dung" className="hover:text-gray-500">
                Tuyển dụng
              </a>
            </p>
          </div>

          {/* Danh mục tin tức */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg mb-2">Danh Mục Tin Tức</h3>
            <p>
              <a href="/chinh-tri" className="hover:text-gray-500">
                Chính trị
              </a>
            </p>
            <p>
              <a href="/kinh-te" className="hover:text-gray-500">
                Kinh tế
              </a>
            </p>
            <p>
              <a href="/giao-duc" className="hover:text-gray-500">
                Giáo dục
              </a>
            </p>
            <p>
              <a href="/cong-nghe" className="hover:text-gray-500">
                Công nghệ
              </a>
            </p>
            <p>
              <a href="/giai-tri" className="hover:text-gray-500">
                Giải trí
              </a>
            </p>
            <p>
              <a href="/the-thao" className="hover:text-gray-500">
                Thể thao
              </a>
            </p>
          </div>

          {/* Kết nối với chúng tôi */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg mb-2">
              Kết Nối Với Chúng Tôi
            </h3>
            <p>
              <a href="https://facebook.com" className="hover:text-gray-500">
                Facebook
              </a>
            </p>
            <p>
              <a href="https://twitter.com" className="hover:text-gray-500">
                Twitter
              </a>
            </p>
            <p>
              <a href="https://youtube.com" className="hover:text-gray-500">
                YouTube
              </a>
            </p>
            <p>
              <a href="https://instagram.com" className="hover:text-gray-500">
                Instagram
              </a>
            </p>
            <p>
              <a href="https://zalo.me" className="hover:text-gray-500">
                Zalo
              </a>
            </p>
            <p>
              <a href="https://linkedin.com" className="hover:text-gray-500">
                LinkedIn
              </a>
            </p>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg mb-2">Hỗ Trợ Khách Hàng</h3>
            <p>
              <a href="/faq" className="hover:text-gray-500">
                Câu hỏi thường gặp
              </a>
            </p>
            <p>
              <a href="/huong-dan" className="hover:text-gray-500">
                Hướng dẫn sử dụng
              </a>
            </p>
            <p>
              <a href="/hoan-tien" className="hover:text-gray-500">
                Chính sách hoàn tiền
              </a>
            </p>
            <p>
              <a href="/quang-cao" className="hover:text-gray-500">
                Chính sách quảng cáo
              </a>
            </p>
            <p>
              <a href="/quy-dinh" className="hover:text-gray-500">
                Quy định đăng bài
              </a>
            </p>
            <p>
              <a href="/ban-quyen" className="hover:text-gray-500">
                Bản quyền & Trách nhiệm
              </a>
            </p>
          </div>

          {/* Thông tin liên hệ */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg mb-2">Thông Tin Liên Hệ</h3>
            <p>Công ty TNHH Tin Tức Việt</p>
            <p>Địa chỉ: Số 123, Đường ABC, Quận XYZ, TP. HCM</p>
            <p>Điện thoại: .......</p>
            <p>
              Email:{" "}
              <a
                href="mailto:namlaso001@gmail.com"
                className="hover:text-gray-500"
              >
                namlaso001@gmail.com
              </a>
            </p>
            <p>© 2024 Tin Tức Việt</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
