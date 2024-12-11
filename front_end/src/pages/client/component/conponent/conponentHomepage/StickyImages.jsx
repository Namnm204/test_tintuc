import { useEffect, useState } from "react";

// ảnh 2 bên
const StickyImages = () => {
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
    <>
      {/* Left Side Image */}
      {banners.length > 0 && banners[0].imagestick && (
        <div className="fixed hidden lg:block left-0 top-1/2 transform -translate-y-1/2 z-50">
          <img
            src={banners[0].imagestick}
            alt={`Banner ${banners[0].id}`}
            className="w-24 h-64 object-cover"
          />
        </div>
      )}

      {/* Right Side Image */}
      {banners.length > 0 && banners[0].imagestick && (
        <div className="fixed right-0 lg:block hidden top-1/2 transform -translate-y-1/2 z-50">
          <img
            src={banners[1].imagestick}
            alt={`Banner ${banners[1].id}`}
            className="w-24 h-64 object-cover"
          />
        </div>
      )}
    </>
  );
};

export default StickyImages;
