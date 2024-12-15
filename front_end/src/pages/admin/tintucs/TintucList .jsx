import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TintucList = () => {
  const [tintucs, settintucs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchtintucs = async () => {
    try {
      const response = await axios.get(
        "https://my-worker.namdaynay001.workers.dev/"
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      settintucs(sortedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchtintucs();
  }, [tintucs]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tintuc?")) {
      try {
        await axios.delete(`https://my-worker.namdaynay001.workers.dev/${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        settintucs((prevtintucs) =>
          prevtintucs.filter((tintuc) => tintuc.id !== id)
        );
      } catch (error) {
        console.error("Error deleting tintuc:", error);
      }
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((selectedId) => selectedId !== id) // Bỏ chọn
          : [...prevSelected, id] // Chọn
    );
  };

  const handleDeleteSelected = async () => {
    if (
      selectedIds.length > 0 &&
      window.confirm("Are you sure you want to delete selected tintucs?")
    ) {
      try {
        // Xóa từng tin tức theo ID
        await Promise.all(
          selectedIds.map((id) =>
            axios.delete(`https://my-worker.namdaynay001.workers.dev/${id}`)
          )
        );
        // Cập nhật danh sách tin tức
        settintucs((prev) =>
          prev.filter((tintuc) => !selectedIds.includes(tintuc.id))
        );
        setSelectedIds([]); // Reset danh sách được chọn
      } catch (error) {
        console.error("Error deleting selected tintucs:", error);
      }
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTintucs = tintucs.slice(startIndex, endIndex);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="md:p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Danh sách tin tức
      </h1>
      <Link
        to="/admin/add"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Add tintuc
      </Link>
      <button
        onClick={handleDeleteSelected}
        disabled={selectedIds.length === 0}
        className={`ml-4 px-4 py-2 rounded ${
          selectedIds.length > 0
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-300 text-gray-700 cursor-not-allowed"
        }`}
      >
        Delete Selected
      </button>
      {currentTintucs.length === 0 ? (
        <div className="text-gray-600">Không có tin tức</div>
      ) : (
        <table className="min-w-full  table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-sm font-medium">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked
                        ? currentTintucs.map((tintuc) => tintuc.id)
                        : []
                    )
                  }
                  checked={selectedIds.length === currentTintucs.length}
                />
              </th>
              <th className="py-3 px-4 text-sm font-medium">ID</th>
              <th className="py-3 px-4 text-sm font-medium">Title</th>
              <th className="py-3 px-4 text-sm font-medium">Image</th>
              <th className="py-3 px-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTintucs.map((tintuc, index) => (
              <tr
                key={tintuc.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    onChange={() => handleSelect(tintuc.id)}
                    checked={selectedIds.includes(tintuc.id)}
                  />
                </td>
                <td className="py-3 px-4 text-center">{tintuc.id}</td>
                <td className="py-3 px-4">{tintuc.title}</td>
                <td className="py-3 px-4 text-center">
                  <img src={tintuc.image} alt="ảnh chính" width={"50px"} />
                </td>
                <td className="py-3 px-4 text-center flex">
                  <Link
                    to={`/admin/${tintuc.slug}`}
                    className="ml-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/edit/${tintuc.slug}`}
                    className="ml-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(tintuc.id)}
                    className="ml-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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

export default TintucList;
