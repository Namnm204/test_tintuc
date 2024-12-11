import { useEffect, useState } from "react";

const Endpage2 = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await fetch(
          "https://my-worker.namdaynay001.workers.dev/banners"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }
        const data = await response.json();
        setBanners(data); // Gán dữ liệu banners
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-8 mb-8 md:w-full w-[390px] md:ml-0 ml-[-20px]">
      {banners.length > 0 ? (
        <div>
          <img
            src={banners[1].imageSale}
            alt={`Banner ${banners[1].id}`}
            className="md:w-full w-[90%] h-[130px] mx-auto"
          />
        </div>
      ) : (
        <p>No banners available</p>
      )}
    </div>
  );
};

export default Endpage2;
