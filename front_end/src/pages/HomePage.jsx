import Banner from "./componentHomPages/banner";
import CustomLayout from "./componentHomPages/CustomLayout ";
import GridLayout from "./componentHomPages/GridLayout";
import NewsLayout from "./componentHomPages/NewsLayout";
import StickyImages from "./componentHomPages/StickyImages";
import UserList from "./UserList ";

const HomePage = () => {
  return (
    <div className="mt-8">
      <UserList />
      {/* <NewsLayout />
      <CustomLayout />
      <Banner />
      <GridLayout />
      <StickyImages /> */}
    </div>
  );
};

export default HomePage;
