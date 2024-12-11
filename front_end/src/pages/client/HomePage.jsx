import { useEffect, useState } from "react";
import NewsLayout from "./component/conponent/conponentHomepage/NewsLayout";
import CustomLayout from "./component/conponent/conponentHomepage/CustomLayout ";
import Banner from "./component/conponent/conponentHomepage/Banner";
import GridLayout from "./component/conponent/conponentHomepage/GridLayout";
import StickyImages from "./component/conponent/conponentHomepage/StickyImages";

const HomePage = () => {
  const [tintucs, setTintucs] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchTintucs() {
      try {
        const response = await fetch(
          "https://my-worker.namdaynay001.workers.dev/tintucs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }
        const data = await response.json();
        // Sắp xếp tin tức theo thời gian giảm dần
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setTintucs(sortedData);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchTintucs();
  }, [tintucs]);

  useEffect(() => {
    // Fetch banners from your API
    async function fetchBanners() {
      try {
        const response = await fetch(
          "https://my-worker.namdaynay001.workers.dev/banners"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }
        const data = await response.json();
        setBanners(data); // Assuming the data is an array of banners with image URLs
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchBanners();
  }, []);

  const customLayoutArticles = tintucs.slice(4, 12);

  return (
    <div className="mt-8 relative">
      <NewsLayout />
      <CustomLayout tintucs={customLayoutArticles} banners={banners} />
      <Banner />
      <GridLayout tintucs={tintucs} banners={banners} />
      <StickyImages />
    </div>
  );
};

export default HomePage;
