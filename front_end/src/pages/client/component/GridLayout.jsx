import BottomGrid from "./componentGrid/BottomGrid ";
import MiddleGrid from "./componentGrid/MiddleGrid";
import TopGrid from "./componentGrid/TopGrid";
import ImageCardList from "./componentGrid/ImageCardList";
/* eslint-disable react/prop-types */
const GridLayout = ({ tintucs, banners }) => {
  const ImageCardListActive = tintucs.slice(20, 23);
  const topGridArticles = tintucs.slice(12, 20);
  // console.log(tintucs);

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 w-[90%] md:w-[75%] mx-auto pb-8">
      {/* Cột 1 */}
      <div className="col-span-2 mr-4">
        <TopGrid tintucs={topGridArticles} />
        <div className="w-full h-[2px] bg-gray-300 my-4"></div>
        <MiddleGrid />
        <div className="w-full h-[2px] bg-gray-300 my-8"></div>
        <BottomGrid />
      </div>
      {/* Cột 2 */}
      <div className="md:col-span-1  w-full h-auto">
        <ImageCardList tintucs={ImageCardListActive} banners={banners} />
      </div>
    </div>
  );
};

export default GridLayout;
