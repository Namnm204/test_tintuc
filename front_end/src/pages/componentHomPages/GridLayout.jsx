import TopGrid from "./componentGrid/TopGrid";
import MiddleGrid from "./componentGrid/MiddleGrid";
import BottomGrid from "./componentGrid/BottomGrid ";
import ImageCardList from "./componentGrid/ImageCardList";

const GridLayout = () => {
  return (
    <div className="grid grid-cols-3 w-[75%] mx-auto pb-8">
      {/* Cột 1 */}
      <div className="col-span-2 mr-4 ">
        <TopGrid />
        <div className="w-full h-[2px] bg-gray-300 my-4"></div>
        <MiddleGrid />
        <div className="w-full h-[2px] bg-gray-300 my-8"></div>
        <BottomGrid />
      </div>
      {/* Cột 2 */}
      <div className="col-span-1 w-full h-auto">
        <ImageCardList />
      </div>
    </div>
  );
};

export default GridLayout;
