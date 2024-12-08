import { Link } from "react-router-dom";

const CustomLayout = ({ tintucs, banners }) => {
  return (
    <div className="flex flex-col md:flex-row w-[90%] md:w-[75%] mx-auto">
      {/* Left Column - Banner */}
      <div className="w-full h-auto hidden md:block md:w-[25%] md:mr-4 mb-4 md:mb-0">
        {banners.length > 1 && (
          <Link to={`/tintuc/${tintucs[0]?.id}`} className="w-full">
            <img
              src={banners[1].image}
              alt={`Banner ${banners[1].id}`}
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
              key={tintuc.id}
              to={`/tintuc/${tintuc.id}`}
              className="w-full"
            >
              <div className="flex flex-col items-center">
                <img
                  src={tintuc.image}
                  alt={tintuc.title}
                  className="w-full h-[150px] object-cover"
                />
                <p className="text-center p-2">{tintuc.title}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="h-px bg-gray-300 my-4 mb-8" />

        {/* Second Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {tintucs.slice(4, 8).map((tintuc) => (
            <Link
              key={tintuc.id}
              to={`/tintuc/${tintuc.id}`}
              className="w-full"
            >
              <div className="flex flex-col items-center">
                <img
                  src={tintuc.image}
                  alt={tintuc.title}
                  className="w-full h-[150px] object-cover"
                />
                <p className="text-center p-2">{tintuc.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomLayout;
