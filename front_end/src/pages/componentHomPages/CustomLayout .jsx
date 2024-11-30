const CustomLayout = () => {
  return (
    <div className="flex flex-col md:flex-row w-[75%] mx-auto">
      {/* Cột bên trái - Banner */}
      <div className="bg-red-500 w-full md:w-[25%] mr-0 md:mr-4 mb-4 md:mb-0">
        <img
          src="../../../public/banner.jpg"
          alt=""
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Cột bên phải - Nội dung */}
      <div className="w-full md:w-[75%]">
        {/* Dòng đầu tiên */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <img
              src="../../../public/banner.jpg"
              alt="Content 1"
              className="w-full h-[150px] object-cover"
            />
            <p className="text-center p-2">Nội dung 1</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="../../../public/banner.jpg"
              alt="Content 2"
              className="w-full h-[150px] object-cover"
            />
            <p className="text-center p-2">Nội dung 2</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="../../../public/banner.jpg"
              alt="Content 3"
              className="w-full h-[150px] object-cover"
            />
            <p className="text-center p-2">Nội dung 3</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="../../../public/banner.jpg"
              alt="Content 4"
              className="w-full h-[150px] object-cover"
            />
            <p className="text-center p-2">Nội dung 4</p>
          </div>
        </div>
        <div className="h-px bg-gray-300 my-4 mb-8" />
        {/* Dòng thứ hai */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          <div className="flex flex-col items-center">
            <img
              src="../../../public/banner.jpg"
              alt="Content 5"
              className="w-full h-[150px] object-cover"
            />
            <p className="text-center p-2">Nội dung 5</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="../../../public/banner.jpg"
              alt="Content 6"
              className="w-full h-[150px] object-cover"
            />
            <p className="text-center p-2">Nội dung 6</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="../../../public/banner.jpg"
              alt="Content 7"
              className="w-full h-[150px] object-cover"
            />
            <p className="text-center p-2">Nội dung 7</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="../../../public/banner.jpg"
              alt="Content 8"
              className="w-full h-[150px] object-cover"
            />
            <p className="text-center p-2">Nội dung 8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLayout;
