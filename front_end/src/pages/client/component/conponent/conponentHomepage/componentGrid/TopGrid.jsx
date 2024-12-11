import { Link } from "react-router-dom";

const TopGrid = ({ tintucs }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:mr-4 relative">
      <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-8">
        {tintucs.slice(0, 4).map((tintuc, index) => (
          <div key={index} className="md:w-full w-[110%] h-[180px] ">
            <Link to={`/tintuc/${tintuc.id}`} className="w-full">
              <img
                src={tintuc.image || "../../../public/banner.jpg"}
                alt={tintuc.title || "Tin tức"}
                className="w-full h-3/4 object-cover"
              />
              <p className="whitespace-normal h-[55px]  md:h-[80px]  text-[16px] p-2 overflow-hidden text-ellipsis line-clamp-3">
                {tintuc.title || "Nội dung tin tức"}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 mt-8 md:grid-cols-4 gap-8 ">
        {tintucs.slice(4, 8).map((tintuc, index) => (
          <div key={index} className="md:w-full w-[110%] h-[180px] ">
            <Link to={`/tintuc/${tintuc.id}`} className="w-full">
              <img
                src={tintuc.image || "../../../public/banner.jpg"} // Thay bằng trường hình ảnh thực tế nếu có
                alt={tintuc.title || "Tin tức"}
                className="w-full h-3/4 object-cover"
              />
              <p className="whitespace-normal h-[55px] md:h-[80px] text-[16px] p-2 overflow-hidden text-ellipsis line-clamp-3">
                {tintuc.title || "Nội dung tin tức"}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopGrid;
