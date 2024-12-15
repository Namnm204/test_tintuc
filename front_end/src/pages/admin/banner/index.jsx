import axios from "axios";
import React, { useEffect, useState } from "react";

function BannerList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newBannerData, setNewBannerData] = useState({
    imageBanner: "",
    imagestick: "",
    imageSale: "",
    imagehome: "",
    imageEndpage: [], // Chuyển thành mảng
  });
  const [newImageUrl, setNewImageUrl] = useState(""); // New state for input URL

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
        );
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  const handleAddBanner = async () => {
    try {
      await axios.post(
        "https://my-worker.namdaynay001.workers.dev/banners",
        newBannerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowModal(false);
      setNewBannerData({
        imageBanner: "",
        imagestick: "",
        imageSale: "",
        imagehome: "",
        imageEndpage: [],
      });
      const response = await fetch(
        "https://my-worker.namdaynay001.workers.dev/banners"
      );
      const data = await response.json();

      setBanners(data);
    } catch (error) {
      console.error("Error adding banner:", error);
    }
  };

  const handleAddImageToEndpage = () => {
    if (newImageUrl) {
      setNewBannerData((prev) => ({
        ...prev,
        imageEndpage: [...prev.imageEndpage, newImageUrl],
      }));
      setNewImageUrl(""); // Reset the input after adding
    }
  };

  const handleRemoveImageFromEndpage = (index) => {
    setNewBannerData((prev) => ({
      ...prev,
      imageEndpage: prev.imageEndpage.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="md:p-6 bg-white rounded-lg shadow-md mt-14">
      <h1 className="text-2xl font-bold mb-4 text-center">Banner List</h1>
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
                STT
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                Image Banner
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                Image Stick
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                Image Sale
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                Image Home
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                Image Endpage
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="text-center">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={banner.imageBanner}
                    alt={`Banner ${banner.id}`}
                    className="w-32 h-32 object-cover"
                  />
                </td>
                <td className="px-4 py-2">
                  <img
                    src={banner.imagestick}
                    alt={`Stick ${banner.id}`}
                    className="w-32 h-32 object-cover"
                  />
                </td>
                <td className="px-4 py-2">
                  <img
                    src={banner.imageSale}
                    alt={`Sale ${banner.id}`}
                    className="w-32 h-32 object-cover"
                  />
                </td>
                <td className="px-4 py-2">
                  <img
                    src={banner.imagehome}
                    alt={`Home ${banner.id}`}
                    className="w-32 h-32 object-cover"
                  />
                </td>
                <td className="px-4 py-2 flex w-[300px] flex-wrap">
                  {(() => {
                    try {
                      const images = JSON.parse(banner.imageEndpage);
                      if (Array.isArray(images)) {
                        return images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`EndPage ${banner.id}-${index}`}
                            className="w-16 p-2 h-16 object-cover"
                          />
                        ));
                      }
                    } catch (e) {
                      console.error("Invalid JSON format for imageEndpage:", e);
                    }
                    return <p>không có image</p>;
                  })()}
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Thêm Banner mới</h2>
            <div className="mb-4">
              <label className="block mb-2">Image Banner:</label>
              <input
                type="text"
                placeholder="thêm link ảnh Banner"
                value={newBannerData.imageBanner}
                onChange={(e) =>
                  setNewBannerData({
                    ...newBannerData,
                    imageBanner: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image Stick:</label>
              <input
                type="text"
                placeholder="thêm link Stick 2 bên"
                value={newBannerData.imagestick}
                onChange={(e) =>
                  setNewBannerData({
                    ...newBannerData,
                    imagestick: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image Sale:</label>
              <input
                type="text"
                placeholder="thêm link ảnh Sale"
                value={newBannerData.imageSale}
                onChange={(e) =>
                  setNewBannerData({
                    ...newBannerData,
                    imageSale: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image Home:</label>
              <input
                type="text"
                placeholder="thêm link ảnh Home"
                value={newBannerData.imagehome}
                onChange={(e) =>
                  setNewBannerData({
                    ...newBannerData,
                    imagehome: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image Endpage:</label>
              <div className="flex">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="thêm link ảnh"
                />
                <button
                  onClick={handleAddImageToEndpage}
                  className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Thêm
                </button>
              </div>
              <div className="absolute hidden md:block md:ml-[600px] md:mt-[-400px]">
                <img
                  className="w-[90%]"
                  src="../../../../dist/demo.png"
                  alt=""
                />
              </div>
              <div className="mt-2">
                {newBannerData.imageEndpage.map((url, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={url}
                      alt={`Endpage preview ${index}`}
                      className="w-16 h-16 object-cover mr-2"
                    />
                    <button
                      onClick={() => handleRemoveImageFromEndpage(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleAddBanner}
                className="px-4  py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Thêm banner
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="  px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Tắt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerList;
