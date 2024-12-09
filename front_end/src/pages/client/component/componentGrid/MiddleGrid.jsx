const MiddleGrid = ({ banners }) => {
  console.log(banners);

  // Chuyển đổi chuỗi JSON thành mảng, nếu có
  const imageEndpageArray = banners[0]
    ? JSON.parse(banners[0].imageEndpage)
    : [];

  // Kiểm tra và hiển thị ảnh nếu có đủ số lượng
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {/* Hàng đầu tiên */}
      <div className="h-[150px]">
        <img
          src={imageEndpageArray[0] || "/path/to/default/image1.jpg"}
          alt={`Banner ${banners[0]?.id}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative h-64">
        <img
          src={imageEndpageArray[1] || "/path/to/default/image2.jpg"}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[125px]">
        <img
          src={imageEndpageArray[2] || "/path/to/default/image3.jpg"}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hàng thứ hai */}
      <div className="h-[271px] md:mt-[-105px] mt-[75px]">
        <img
          src={imageEndpageArray[3] || "/path/to/default/image4.jpg"}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[166px] mt-[-70px] md:mt-0">
        <img
          src={imageEndpageArray[4] || "/path/to/default/image5.jpg"}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[296px] md:mt-[-130px] mt-0">
        <img
          src={imageEndpageArray[5] || "/path/to/default/image6.jpg"}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MiddleGrid;
