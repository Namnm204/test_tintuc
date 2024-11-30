const ImageCardList = () => {
  return (
    <div className="space-y-4">
      {/* Large Image Card */}
      <div className="w-full rounded-lg mb-14">
        <img
          src="../../../public/banner.jpg"
          alt="Ẩm Thực"
          className="w-full h-full object-cover"
        />
        <p className="mt-2 text-center px-4 text-sm break-words">
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadwdwaaaaaaaaaaaaaaaa
        </p>
      </div>

      {/* Small Image Cards */}
      <div>
        <div className=" grid grid-cols-2 rounded-lg">
          <img
            src="../../../public/banner.jpg"
            alt="Ẩm Thực"
            className="w-full h-full object-cover"
          />
          <p className="mt-2 text-left px-4 text-sm break-words">
            aaaaaaaaaaadwdwaaaaaaaaaaaaaaaa
          </p>
        </div>
        <div className="w-full h-[2px] bg-gray-300 my-6"></div>
        <div className=" grid grid-cols-2 rounded-lg">
          <img
            src="../../../public/banner.jpg"
            alt="Ẩm Thực"
            className="w-full h-full object-cover"
          />
          <p className="mt-2 text-left px-4 text-sm break-words">
            aaaaaaaaaaaaaaaaaaaaaadwdwaaaaaaaaaaaaaaaa
          </p>
        </div>
        <div className="w-full h-[2px] bg-gray-300 my-6"></div>
        <div className=" grid grid-cols-2 rounded-lg">
          <img
            src="../../../public/banner.jpg"
            alt="Ẩm Thực"
            className="w-full h-full object-cover"
          />
          <p className="mt-2 text-left px-4 text-sm break-words">
            aaaaaaaaaaaaaaaaaaaaaadwdwaaaaaaaaaaaaaaaa
          </p>
        </div>
      </div>
      <div>
        <img
          src="../../../public/banner.jpg"
          className="w-full h-[375px]"
          alt=""
        />
      </div>
    </div>
  );
};

export default ImageCardList;
