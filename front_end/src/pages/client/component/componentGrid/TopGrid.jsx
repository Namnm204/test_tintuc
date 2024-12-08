import { Link } from "react-router-dom";

const TopGrid = ({ tintucs }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:mr-4 relative">
      <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-4">
        {tintucs.slice(0, 4).map((tintuc, index) => (
          <div key={index} className="md:w-full w-[110%] h-[180px] p-1">
            <Link to={`/tintuc/${tintuc.id}`} className="w-full">
              <img
                src={tintuc.image || "../../../public/banner.jpg"}
                alt={tintuc.title || "Tin tức"}
                className="w-full h-3/4 object-cover"
              />
              <p className="text-center text-sm break-words p-2">
                ID: {tintuc.id} <br />
                {tintuc.title || "Nội dung tin tức"}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tintucs.slice(4, 8).map((tintuc, index) => (
          <div key={index} className="w-full h-[180px]">
            <Link to={`/tintuc/${tintuc.id}`} className="w-full">
              <img
                src={tintuc.image || "../../../public/banner.jpg"} // Thay bằng trường hình ảnh thực tế nếu có
                alt={tintuc.title || "Tin tức"}
                className="w-full h-3/4 object-cover"
              />
              <p className="text-center text-sm break-words p-2">
                ID: {tintuc.id} <br />
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
