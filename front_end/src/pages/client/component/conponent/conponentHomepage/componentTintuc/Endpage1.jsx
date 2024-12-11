import { Link } from "react-router-dom";

const Endpage1 = ({ tintucs }) => {
  const tin24 = tintucs.slice(23, 27);
  const tin35 = tintucs.slice(23, 35);
  return (
    <div className="grid grid-cols-1 gap-4 md:mr-4 relative md:w-full w-[335px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 pb-8  md:grid-cols-4 md:gap-4 gap-8">
        {tin24.slice(0, 4).map((tintuc, index) => (
          <div key={index} className="md:w-full w-[110%] h-[180px]">
            <Link to={`/tintuc/${tintuc.id}`} className="w-full">
              <img
                src={tintuc.image || "../../../public/banner.jpg"}
                alt={tintuc.title || "Tin tức"}
                className="w-full h-3/4 object-cover"
              />
              <p className="whitespace-normal h-[68px] md:h-[80px] text-[13px] md:text-[16px] p-2 overflow-hidden text-ellipsis line-clamp-3">
                {tintuc.id || "Nội dung tin tức"}
                {tintuc.title || "Nội dung tin tức"}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 relative">
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-8">
          {tin35.slice(0, 12).map((tintuc, index) => (
            <div key={index} className="md:w-full w-[110%] h-[180px] ">
              <Link to={`/tintuc/${tintuc.id}`} className="w-full">
                <img
                  src={tintuc.image || "../../../public/banner.jpg"}
                  alt={tintuc.title || "Tin tức"}
                  className="w-full h-3/4 object-cover"
                />
                <p className="whitespace-normal h-[55px] md:h-[78px] text-[13px] md:text-[16px]  pl-2  overflow-hidden text-ellipsis line-clamp-3">
                  {tintuc.id || "Nội dung tin tức"}
                  {tintuc.title || "Nội dung tin tức"}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Endpage1;
