import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To fetch the product ID from URL params
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Fetch product details based on id
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://my-worker.namdaynay001.workers.dev/tintucs/${id}`
      );

      // Check if 'gallery' is a string and parse it if needed
      if (typeof response.data.gallery === "string") {
        try {
          response.data.gallery = JSON.parse(response.data.gallery);
        } catch (e) {
          console.error("Error parsing gallery JSON:", e);
          response.data.gallery = []; // In case the gallery is malformed
        }
      }

      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        {/* Product Image Section */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-[60%] h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info Section */}
        <div className="md:w-1/2 md:pl-12">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            <h3>Tiêu đề:</h3>
            {product.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Danh mục: {product.category}
          </p>
          <p className="text-base text-gray-500 mb-6">
            Mô tả: {product.description}
          </p>

          {/* Author and Content */}
          <p className="text-base text-gray-700 mb-4">
            Tác giả: {product.author}
          </p>
          <div className="mb-4">
            <h3 className="font-semibold"></h3>
            <p>Nội dung: {product.content}</p>
          </div>

          {/* Gallery Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ảnh phụ
            </h2>
            <div className="flex space-x-4">
              {Array.isArray(product.gallery) && product.gallery.length > 0 ? (
                product.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                ))
              ) : (
                <p>No gallery images available.</p>
              )}
            </div>
          </div>

          {/* Created At */}
          <p className="mt-6 text-sm text-gray-500">
            Ngày đăng tải: {new Date(product.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
