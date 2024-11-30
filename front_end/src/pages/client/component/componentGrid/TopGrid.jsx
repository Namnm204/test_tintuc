const TopGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mr-4 relative">
      {/* Các ô trong hàng đầu tiên */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="w-full h-[180px]">
          <img
            src="../../../public/banner.jpg"
            alt=""
            className="w-full h-3/4 object-cover"
          />
          <p className="text-center text-sm break-words p-2">aaaaaaaaa</p>
        </div>
        <div className="w-full h-[180px]">
          <img
            src="../../../public/banner.jpg"
            alt=""
            className="w-full h-3/4 object-cover"
          />
          <p className="text-center text-sm break-words p-2">aaaaaaaaa</p>
        </div>
        <div className="w-full h-[180px]">
          <img
            src="../../../public/banner.jpg"
            alt=""
            className="w-full h-3/4 object-cover"
          />
          <p className="text-center text-sm break-words p-2">
            aaaaaaaaaaaaaaaaaaaaaaaa
          </p>
        </div>
        <div className="w-full h-[180px]">
          <img
            src="../../../public/banner.jpg"
            alt=""
            className="w-full h-3/4 object-cover"
          />
          <p className="text-center text-sm break-words p-2">aaaaaaaaa</p>
        </div>
      </div>

      {/* Các ô trong hàng thứ hai */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="w-full h-[180px]">
          <img
            src="../../../public/banner.jpg"
            alt=""
            className="w-full h-3/4 object-cover"
          />
          <p className="text-center text-sm break-words p-2">aaaaaaaaa</p>
        </div>
        <div className="w-full h-[180px]">
          <img
            src="../../../public/banner.jpg"
            alt=""
            className="w-full h-3/4 object-cover"
          />
          <p className="text-center text-sm break-words p-2">aaaaaaaaa</p>
        </div>
        <div className="w-full h-[180px]">
          <img
            src="../../../public/banner.jpg"
            alt=""
            className="w-full h-3/4 object-cover"
          />
          <p className="text-center text-sm break-words p-2">aaaaaaaaa</p>
        </div>
        <div className="w-full h-[180px]">
          <img
            src="../../../public/banner.jpg"
            alt=""
            className="w-full h-3/4 object-cover"
          />
          <p className="text-center text-sm break-words p-2">aaaaaaaaa</p>
        </div>
      </div>
    </div>
  );
};

export default TopGrid;
