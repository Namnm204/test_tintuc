import React, { useEffect, useState } from "react";
import Footer from "../../../../../layout/client/componentClient/Footer";
import Header from "../../../../../layout/client/componentClient/Header";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProductsDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [randomNews, setRandomNews] = useState([]);

  // Fetch product details based on id
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://my-worker.namdaynay001.workers.dev/tintucs/${id}`
      );

      // Check if 'content' is a string and parse it if needed
      if (typeof response.data.content === "string") {
        try {
          response.data.content = JSON.parse(response.data.content);
        } catch (e) {
          console.error("Error parsing content JSON:", e);
          response.data.content = []; // In case the content is malformed
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

  // Fetch tin tức ngẫu nhiên
  const fetchRandomNews = async () => {
    try {
      const response = await axios.get(
        "https://my-worker.namdaynay001.workers.dev/tintucs"
      );
      const allNews = response.data;
      console.log(allNews);

      const filteredNews = allNews.filter((news) => news.id !== id);

      const shuffledNews = filteredNews.sort(() => 0.5 - Math.random());

      setRandomNews(shuffledNews.slice(0, 10));
    } catch (error) {
      console.error("Failed to fetch random news:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchRandomNews();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="font-sans bg-gray-50">
      <Header />
      <div className="md:w-[75%] mx-auto px-4 py-10">
        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Article Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Article Title */}
            <h1 className="text-3xl font-bold text-black">{product.title}</h1>

            {/* Article Meta */}
            <div className="text-sm text-gray-500 flex justify-between">
              <p className="text-gray-500">Tác giả: {product.author}</p>
              <p className="text-gray-500">
                Ngày đăng: {new Date(product.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="w-full h-[2px] bg-gray-300 my-8"></div>

            {/* Article Content */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700">{product.description}</p>
            </div>

            {/* Image Section */}
            <div>
              <img
                src={product.image}
                alt="Product Image"
                className="md:h-[500px] w-full rounded-lg shadow-md"
              />
              <p className="text-center text-[13px] mt-3">
                {product.mota_image}
              </p>
            </div>

            {/* Dynamic Content */}
            <div>
              {product.content &&
              Array.isArray(product.content) &&
              product.content.length > 0 ? (
                product.content.map((contentItem, index) => (
                  <div key={index} className="mb-4">
                    <p
                      className="text-lg text-gray-700 content"
                      dangerouslySetInnerHTML={{
                        __html: contentItem.value,
                      }}
                    />
                    {contentItem.image && (
                      <div>
                        <img
                          src={contentItem.image}
                          alt={`Content image ${index + 1}`}
                          className="md:h-[500px] w-full rounded-lg shadow-md"
                        />
                        <p className="text-center text-[13px] mt-3">
                          {contentItem.mota_image_content}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No additional content available.</p>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Featured News Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Tin tức nổi bật
              </h3>

              {/* Featured News Item 1 */}
              <div>
                {randomNews.map((news, index) => (
                  <div
                    key={index}
                    className="flex space-x-4 p-4 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Link to={`/tintuc/${news.id}`} className="flex gap-4">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                      <div className="flex flex-col justify-center">
                        <p className="text-lg font-semibold text-gray-800 overflow-hidden text-ellipsis line-clamp-2">
                          {news.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Xem thêm tin tức...
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-4 mt-16">
          {/* Banner */}
          <div className="flex space-x-4">
            <img
              src="../../../../../../public/banner.jpg"
              alt="Advertisement 1"
              className="w-full rounded-lg shadow-md"
            />
            <img
              src="../../../../../../public/banner.jpg"
              alt="Advertisement 2"
              className="w-full rounded-lg shadow-md"
            />
            <img
              src="../../../../../../public/banner.jpg"
              alt="Advertisement 3"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Bình luận */}
          <div className="bg-yellow-400 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Bình luận
            </h3>
            <div className="space-y-4">
              {/* Input Field */}
              <div className="space-y-2">
                <label htmlFor="comment" className="text-sm text-gray-600">
                  Nhập bình luận
                </label>
                <input
                  id="comment"
                  type="text"
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập bình luận..."
                />
              </div>

              {/* Submit Button */}
              <button className="w-16 bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition">
                Gửi
              </button>
            </div>
          </div>

          {/* Additional Information Box */}
          <div className="bg-gray-300 p-4 rounded-lg">
            <p className="text-center text-gray-600">Bình luận</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsDetail;
