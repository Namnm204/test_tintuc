import React, { useState } from "react";
import { useParams } from "react-router-dom"; // To fetch the product ID from URL params
import axios from "axios";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch product details based on productId
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://my-worker.namdaynay001.workers.dev/tintucs/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  React.useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        {/* Product Image Section */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info Section */}
        <div className="md:w-1/2 md:pl-12">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{product.price} VND</p>
          <p className="text-base text-gray-500 mb-6">{product.description}</p>

          {/* Variant Selection: Color */}
          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <select
              id="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            >
              {product.colors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Variant Selection: Size */}
          <div className="mb-4">
            <label
              htmlFor="size"
              className="block text-sm font-medium text-gray-700"
            >
              Size
            </label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            >
              {product.sizes.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Selection */}
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Add to Cart Button */}
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Features */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Product Features
        </h2>
        <ul className="list-disc pl-5">
          {product.features.map((feature, index) => (
            <li key={index} className="text-gray-700">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Gallery Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gallery</h2>
        <div className="flex space-x-4">
          {product.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md border"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
