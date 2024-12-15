import { useState } from "react";
import { FaUserCircle, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="hidden md:flex flex-col md:flex-row items-center bg-white p-4 shadow-lg">
      <div className="w-full md:w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex justify-center items-center w-full md:w-[230px] border-r pr-4">
          <Link to={`/`}>
            <img
              src="../../../dist/assets/logo.png"
              className="w-[60%] md:w-[100%] mx-auto"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Ngày tháng */}
        <div className="hidden md:flex pb-2 md:items-center border-r pr-4">
          <div className="text-gray-600">
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Danh mục và tìm kiếm */}
        <div className="flex items-center justify-between w-full md:w-auto relative">
          <div className="hidden md:flex items-center border-r pr-4">
            <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
              Mới nhất
            </button>
            <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
              Liên hệ
            </button>
            <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
              Tin nổi bật
            </button>
            <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
              Thời sự
            </button>
            <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
              Thể thao
            </button>
            <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
              Giải trí
            </button>
            <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
              Kinh doanh
            </button>
            <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
              Công nghệ
            </button>

            <button
              onClick={toggleSearch}
              className="text-gray-600 cursor-pointer mx-2 pb-2"
            >
              <FaSearch />
            </button>
          </div>

          {/* Nút hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 cursor-pointer"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Input tìm kiếm kiểu popup */}
          {isSearchVisible && (
            <div className="absolute top-7 right-[7%] md:right-[5%] bg-gray-400 border border-gray-300 rounded shadow-lg p-4 z-10">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Tìm kiếm..."
                  className="border rounded p-1 w-64 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                />
                <button
                  type="submit"
                  className="ml-2 text-white bg-black pl-3 pr-3 pt-1 pb-1 rounded"
                >
                  Tìm
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Tài khoản người dùng */}
        <div className="hidden md:flex items-center mt-2 md:mt-0 md:ml-0">
          <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300 flex items-center">
            Đăng nhập
          </button>
          <FaUserCircle className="text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Menu điều hướng cho màn hình nhỏ */}
      {isMenuOpen && (
        <div className="flex flex-col w-full md:hidden mt-2 border-t border-gray-300">
          <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
            Mới nhất
          </button>
          <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
            Liên hệ
          </button>
          <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
            Tin nổi bật
          </button>
          <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
            Thời sự
          </button>
          <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
            Thể thao
          </button>
          <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
            Giải trí
          </button>
          <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
            Kinh doanh
          </button>
          <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300">
            Công nghệ
          </button>
          {/* Tài khoản người dùng */}
          <div className="flex items-center mt-2 md:mt-0 md:ml-0">
            <button className="mx-2 pb-2 text-gray-700 hover:text-blue-500 transition duration-300 flex items-center">
              Đăng nhập
            </button>
            <FaUserCircle className="text-gray-600 cursor-pointer" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
