// ảnh 2 bên
const StickyImages = () => {
  return (
    <>
      {/* Left Side Image */}
      <div className="fixed hidden lg:block left-0 top-1/2 transform -translate-y-1/2 z-50">
        <img
          src="../../../public/banner.jpg"
          alt="Left Banner"
          className="w-24 h-64 object-cover"
        />
      </div>

      {/* Right Side Image */}
      <div className="fixed right-0 lg:block hidden top-1/2 transform -translate-y-1/2 z-50">
        <img
          src="../../../public/banner.jpg"
          alt="Right Banner"
          className="w-24 h-64 object-cover"
        />
      </div>
    </>
  );
};

export default StickyImages;
