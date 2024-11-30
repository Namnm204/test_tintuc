const StickyImages = () => {
  return (
    <>
      {/* Left Side Image */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50">
        <img
          src="../../../public/banner.jpg"
          alt="Left Banner"
          className="w-32 h-64 object-cover"
        />
      </div>

      {/* Right Side Image */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <img
          src="../../../public/banner.jpg"
          alt="Right Banner"
          className="w-32 h-64 object-cover"
        />
      </div>
    </>
  );
};

export default StickyImages;
