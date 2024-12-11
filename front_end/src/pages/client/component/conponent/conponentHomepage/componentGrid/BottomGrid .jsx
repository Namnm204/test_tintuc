import React from "react";
import Endpage1 from "../componentTintuc/Endpage1";
import Endpage3 from "../componentTintuc/Endpage3";
import Fulltintuc from "../componentTintuc/Fulltintuc";

const BottomGrid = ({ tintucs, banners }) => {
  // Phân bổ tin tức
  const newsForEndpage3 = tintucs.slice(35, 45); // Lấy tất cả tin tức từ index 35 trở đi
  const newsForFulltintuc = tintucs.slice(45); // Phần còn lại

  return (
    <div className=" md:w-[1440px] grid grid-cols-2 md:grid-cols-3 gap-8">
      {/* Cột 1 */}
      <div className="col-span-2 mr-4">
        <Endpage1 tintucs={tintucs} />
        <div className="w-full h-[2px] bg-gray-300 mt-[60px] my-4"></div>
        <Fulltintuc tintucs={newsForFulltintuc} />
      </div>
      {/* Cột 2 */}
      <div className="md:col-span-1 w-full h-auto">
        <Endpage3 tintucs={newsForEndpage3} banners={banners} />
      </div>
    </div>
  );
};

export default BottomGrid;
