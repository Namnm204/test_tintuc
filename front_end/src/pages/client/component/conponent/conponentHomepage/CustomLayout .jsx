import { Link } from "react-router-dom";

const CustomLayout = ({ tintucs, banners }) => {
  return (
    <div className="flex flex-col md:flex-row w-[90%] md:w-[75%] mx-auto">
      {/* Left Column - Banner */}
      <div className="w-full h-auto hidden md:block md:w-[25%] md:mr-4 mb-4 md:mb-0">
        {banners.length > 1 && (
          <Link to={`/${tintucs[0]?.slug}`} className="w-full">
            <img
              src={banners[0].imageSale}
              alt={`Banner ${banners[0].slug}`}
              className="w-full h-auto object-cover"
            />
          </Link>
        )}
      </div>

      {/* Right Column - Content */}
      <div className="w-full md:w-[75%]">
        {/* First Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tintucs.slice(0, 4).map((tintuc) => (
            <Link
              key={tintuc.slug}
              to={`/${tintuc.slug}`}
              className="w-full"
            >
              <div className="flex flex-col items-center">
                <img
                  src={tintuc.image}
                  alt={tintuc.title}
                  className="w-full h-[150px] object-cover"
                />
                <h3 className="p-2 h-[80px] overflow-hidden text-ellipsis line-clamp-3">
                  {tintuc.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="h-px bg-gray-300 my-4 mb-8" />

        {/* Second Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {tintucs.slice(4, 8).map((tintuc) => (
            <Link
              key={tintuc.slug}
              to={`/${tintuc.slug}`}
              className="w-full"
            >
              <div className="flex flex-col items-center">
                <img
                  src={tintuc.image}
                  alt={tintuc.title}
                  className="w-full h-[150px] object-cover"
                />
                <h3 className="p-2 h-[80px] overflow-hidden text-ellipsis line-clamp-3">
                  {tintuc.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomLayout;
