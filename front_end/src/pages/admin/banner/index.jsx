import axios from "axios";
import React, { useEffect, useState } from "react";

function BannerList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newBannerImage, setNewBannerImage] = useState("");

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
  }, [banners]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await axios.delete(
          `https://my-worker.namdaynay001.workers.dev/banners/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBanners((prevBanners) =>
          prevBanners.filter((banner) => banner.id !== id)
        ); // Update the banner list
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  const handleAddBanner = async () => {
    if (!newBannerImage) {
      alert("Please enter an image URL");
      return;
    }

    try {
      await axios.post(
        "https://my-worker.namdaynay001.workers.dev/banners",
        { image: newBannerImage },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowModal(false);
      setNewBannerImage("");
      // Fetch the updated banners list
      const response = await fetch(
        "https://my-worker.namdaynay001.workers.dev/banners"
      );
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error("Error adding banner:", error);
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
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Thêm Banner
      </button>
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

      {/* Modal for adding a new banner */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Thêm Banner mới</h2>
            <div className="mb-4">
              <label className="block mb-2">Thêm Link Banner:</label>
              <input
                type="text"
                value={newBannerImage}
                onChange={(e) => setNewBannerImage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handleAddBanner}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Thêm Banner
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="ml-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Tắt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerList;
