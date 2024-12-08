import { useEffect, useState } from "react";
import Banner from "./component/banner";
import CustomLayout from "./component/CustomLayout ";
import GridLayout from "./component/GridLayout";
import NewsLayout from "./component/NewsLayout";
import StickyImages from "./component/StickyImages";

const HomePage = () => {
  const [tintucs, setTintucs] = useState([]);
  const [banners, setBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 23;

  useEffect(() => {
    // Fetch banners from your API
    async function fetchTintucs() {
      try {
        const response = await fetch(
          "https://my-worker.namdaynay001.workers.dev/tintucs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }
        const data = await response.json();
        setTintucs(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchTintucs();
  }, []);

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

  // Calculate the start and end indices for slicing the data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTintucs = tintucs.slice(startIndex, endIndex);

  const newsLayoutArticles = currentTintucs.slice(0, 4); // Show first 4 articles in NewsLayout
  const customLayoutArticles = currentTintucs.slice(4, 12); // Show next 8 articles in CustomLayout

  return (
    <div className="mt-8 relative">
      <NewsLayout tintucs={newsLayoutArticles} />
      <CustomLayout tintucs={customLayoutArticles} banners={banners} />
      <Banner />
      <GridLayout tintucs={currentTintucs} banners={banners} />
      <StickyImages />

      <div className="flex justify-center md:mt-4 mt-24 pb-5">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Trở về
        </button>
        <span className="mx-4 mt-2">Trang {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={endIndex >= tintucs.length}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Tiếp
        </button>
      </div>
    </div>
  );
};

export default HomePage;
