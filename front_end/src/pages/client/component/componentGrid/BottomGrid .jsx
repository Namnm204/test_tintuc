const BottomGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* Mục Âm Thực */}
      <div className="text-center">
        <span className="block mb-2 font-medium text-lg">Âm Thực</span>
        <div className="h-32">
          <img
            src="../../../public/banner.jpg"
            alt="Âm Thực"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* Mục Văn Hóa */}
      <div className="text-center">
        <span className="block mb-2 font-medium text-lg">Văn Hóa</span>
        <div className="h-32">
          <img
            src="../../../public/banner.jpg"
            alt="Văn Hóa"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* Mục Đời Sống */}
      <div className="text-center">
        <span className="block mb-2 font-medium text-lg">Đời Sống</span>
        <div className="h-32">
          <img
            src="../../../public/banner.jpg"
            alt="Đời Sống"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default BottomGrid;
