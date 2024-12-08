import { useEffect, useState } from "react";

const Banner = () => {
  const [banners, setBanners] = useState([]);
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
  return (
    <div className="mt-8 mb-8">
      {banners.length > 0 && (
        <div>
          <img
            src={banners[0].image}
            alt={`Banner ${banners[0].id}`}
            className="md:w-[60%] w-[90%] h-[130px] mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Banner;
