const MiddleGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {/* Hàng đầu tiên */}
      <div className=" h-[150px]">
        <img
          src="../../../public/banner.jpg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative h-64">
        <img
          src="../../../public/banner.jpg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" h-[125px]">
        <img
          src="../../../public/banner.jpg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hàng thứ hai */}
      <div className=" h-[271px] md:mt-[-105px] mt-[75px]">
        <img
          src="../../../public/banner.jpg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" h-[166px] mt-[-70px] md:mt-0">
        <img
          src="../../../public/banner.jpg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" h-[296px] md:mt-[-130px] mt-0">
        <img
          src="../../../public/banner.jpg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MiddleGrid;
