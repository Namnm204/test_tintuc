import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Endpage3 = ({ tintucs, banners }) => {
  const largeCard = tintucs[0]; // Tin lớn
  const smallCards = tintucs.slice(1); // Các tin nhỏ còn lại

  return (
    <div className="space-y-4 relative h-auto mb-[100px]">
      {/* Tin lớn */}
      {largeCard && (
        <div className="w-full  rounded-lg mb-10 md:mt-0 mt-10">
          <Link to={`/tintuc/${largeCard.id}`} className="w-full">
            <img
              src={largeCard.image || "/banner.jpg"}
              alt={largeCard.title || "Tin tức"}
              className="w-[200px] md:w-[390px] h-[200px] object-cover"
            />
            <p className="mt-2 w-full md:w-[390px] px-2 text-[16px]  overflow-hidden text-ellipsis md:line-clamp-2 line-clamp-4">
              {largeCard.id || "Tiêu đề tin tức lớn"}
              {largeCard.title || "Tiêu đề tin tức lớn"}
            </p>
          </Link>
        </div>
      )}
      {/* Tin nhỏ */}
      {smallCards.map((tintuc, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 rounded-lg">
          <Link to={`/tintuc/${tintuc.id}`} className="w-full">
            <img
              src={tintuc.image || "/banner.jpg"}
              alt={tintuc.title || `Tin tức ${index + 2}`}
              className="w-full md:w-[190px] h-[100px] object-cover"
            />
            <p className="mt-2 text-left px-2 text-sm line-clamp-3">
              {tintuc.id || `Tiêu đề tin tức ${index + 2}`}
              {tintuc.title || `Tiêu đề tin tức ${index + 2}`}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Endpage3;
