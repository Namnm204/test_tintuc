import axios from "axios";
import React, { useEffect, useState } from "react";

function BannerList() {
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
        setBanners(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://my-worker.namdaynay001.workers.dev/banners/${id}`
      );
      if (response.status === 200) {
        alert("Banner deleted successfully");
        // Cập nhật trạng thái banners nếu cần
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("An error occurred while deleting the banner.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Banner List</h1>
      {banners.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                Image
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">
                  <img
                    src={banner.image}
                    alt={`Banner ${banner.id}`}
                    className="w-32 h-32 object-cover"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No banners available.</p>
      )}
    </div>
  );
}

export default BannerList;
