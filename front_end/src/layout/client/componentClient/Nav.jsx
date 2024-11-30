import { useState } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa"; // Import icons

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="border-b md:p-4 p-7 relative">
      {/* Thanh điều hướng chính */}
      <div className="container  mx-auto justify-center flex items-center">
        {/* Logo / Trang chủ */}
        <a href="/" className="md:flex hidden items-center text-[25px] font-bold">
          <FaHome className="mr-4" />
        </a>

        {/* Nút mở menu trên thiết bị nhỏ */}
        <div className="md:hidden absolute right-3 top-4">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu trên desktop */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><a href="/thoi-su" className="hover:text-gray-700">Thời sự</a></li>
          <li><a href="/kinh-te" className="hover:text-gray-700">Kinh tế</a></li>
          <li><a href="/the-gioi" className="hover:text-gray-700">Thế giới</a></li>
          <li><a href="/doi-song" className="hover:text-gray-700">Đời sống</a></li>
          <li><a href="/suc-khoe" className="hover:text-gray-700">Sức khỏe</a></li>
          <li><a href="/giai-tri" className="hover:text-gray-700">Giải trí</a></li>
          <li><a href="/the-thao" className="hover:text-gray-700">Thể thao</a></li>
          <li><a href="/cong-nghe" className="hover:text-gray-700">Công nghệ</a></li>
          <li><a href="/phim-truyen" className="block hover:text-gray-700">Phim truyện</a></li>
        </ul>
      </div>

      {/* Menu trên thiết bị nhỏ */}
      {isOpen && (
        <ul className={`md:hidden mt-4 space-y-2 text-sm bg-white p-4 rounded-lg shadow-lg animate-slide-down`}>
        <li><a href="/thoi-su" className="block py-2 px-3 rounded hover:bg-rose-200 transition">Thời sự</a></li>
        <li><a href="/kinh-te" className="block py-2 px-3 rounded hover:bg-rose-200 transition">Kinh tế</a></li>
        <li><a href="/the-gioi" className="block py-2 px-3 rounded hover:bg-rose-200 transition">Thế giới</a></li>
        <li><a href="/doi-song" className="block py-2 px-3 rounded hover:bg-rose-200 transition">Đời sống</a></li>
        <li><a href="/suc-khoe" className="block py-2 px-3 rounded hover:bg-rose-200 transition">Sức khỏe</a></li>
        <li><a href="/giai-tri" className="block py-2 px-3 rounded hover:bg-rose-200 transition">Giải trí</a></li>
        <li><a href="/the-thao" className="block py-2 px-3 rounded hover:bg-rose-200 transition">Thể thao</a></li>
        <li><a href="/cong-nghe" className="block py-2 px-3 rounded hover:bg-rose-200 transition">Công nghệ</a></li>
        <li><a href="/phim-truyen" className="block py-2 px-3 rounded hover:bg-rose-200 transition">Phim truyện</a></li>
      </ul>
      
      )}
    </nav>
  );
};

export default Nav;
