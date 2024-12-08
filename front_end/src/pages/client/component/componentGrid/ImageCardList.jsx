import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const ImageCardList = ({ tintucs, banners }) => {
  // Ensure that news items exist
  const largeCard = tintucs[0]; // First news item
  const smallCards = tintucs.slice(1); // Remaining news items
  // console.log(tintucs);

  return (
    <div className="space-y-4 relative h-[1095px]">
      {/* Large Image Card */}
      {largeCard && (
        <div className="w-full rounded-lg mb-14 md:mt-0 mt-10">
          <Link to={`/tintuc/${largeCard.id}`} className="w-full">
            <img
              src={largeCard.image || "/banner.jpg"} // Use provided image or fallback
              alt={largeCard.title || "Tin tức"}
              className="w-[390px] h-[200px] object-cover"
            />
            <p className="mt-2 text-center px-4 text-sm break-words">
              {largeCard.title || "Tiêu đề tin tức lớn"}
            </p>
          </Link>
        </div>
      )}

      {/* Small Image Cards */}
      {smallCards.map((tintuc, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 rounded-lg">
          <Link to={`/tintuc/${tintuc.id}`} className="w-full">
            <img
              src={tintuc.image || "/banner.jpg"} // Use provided image or fallback
              alt={tintuc.title || `Tin tức ${index + 2}`}
              className=" w-full md:w-[190px] h-[200px] md:h-[100px] object-cover"
            />
            <p className="mt-2 text-left px-4 text-sm break-words">
              {tintuc.title || `Tiêu đề tin tức ${index + 2}`}
            </p>
            {/* Add separator except after the last card */}
            {index < smallCards.length - 1 && (
              <div className="w-full h-[2px] bg-gray-300 my-6"></div>
            )}
          </Link>
        </div>
      ))}

      {/* Optional: Additional Image */}
      <div className="md:absolute mt-48 md:mt-0 w-full bottom-0">
        {banners.length > 0 && (
          <div>
            <img
              src={banners[2].image}
              alt={`Banner ${banners[2].id}`}
              className="w-full h-[375px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCardList;
