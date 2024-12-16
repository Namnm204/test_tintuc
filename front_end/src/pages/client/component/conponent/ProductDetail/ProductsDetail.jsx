import React, { useEffect, useState } from "react";
import Footer from "../../../../../layout/client/componentClient/Footer";
import Header from "../../../../../layout/client/componentClient/Header";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProductsDetail = () => {
  const { slug } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [randomNews, setRandomNews] = useState([]);

  // Fetch product details based on id
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://my-worker.namdaynay001.workers.dev/tintucs/${slug}`
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
  }, [slug]);

  // Fetch tin tức ngẫu nhiên
  const fetchRandomNews = async () => {
    try {
      const response = await axios.get(
        "https://my-worker.namdaynay001.workers.dev/tintucs"
      );
      const allNews = response.data;
      // console.log(allNews);

      const filteredNews = allNews.filter((news) => news.id !== slug);

      const shuffledNews = filteredNews.sort(() => 0.5 - Math.random());

      setRandomNews(shuffledNews.slice(0, 8));
    } catch (error) {
      console.error("Failed to fetch random news:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchRandomNews();
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="font-sans ">
      <Header />
      <div className="md:w-[63%] mx-auto px-4 py-5 md:py-10">
        {/* conent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Article Content */}
          <div className="md:col-span-2">
            {/* Article Title */}
            <h1 className="text-3xl font-bold text-black">{product.title}</h1>

            {/* Article Meta */}
            <div className="text-sm text-gray-500 flex md:justify-between mt-5">
              <p className="text-gray-500">Tác giả: {product.author}</p>
              <div className="flex items-center space-x-4 ">
                <p className="text-gray-500 text-sm">
                  Ngày đăng: {new Date(product.created_at).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-1 text-gray-500 text-sm">
                  <span className="text-lg">👁️‍🗨️</span>
                  {/* Unicode eye symbol */}
                  <p>{product.view}</p>
                </div>
              </div>
            </div>
            <div className=" w-full h-[2px] bg-gray-300 mb-5 mt-2"></div>

            {/* Article Content */}
            <div className="space-y-4 mb-3">
              <p className="text-lg text-gray-700">{product.description}</p>
            </div>

            {/* Image Section */}
            <div className="mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full  rounded-lg shadow-md"
              />
              <p className="text-center text-[13px]">{product.mota_image}</p>
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
                      <div className="mt-3">
                        <img
                          src={contentItem.image}
                          alt={`Content image ${index + 1}`}
                          className=" w-full rounded-lg shadow-md object-cover"
                        />
                        <p className="text-center text-[13px]">
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
            {/* tin nổi bật */}
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
                    <Link to={`/tintuc/${news.slug}`} className="flex gap-4">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-32 h-32 object-cover rounded-md "
                      />
                      <div className="flex flex-col justify-center">
                        <p className="text-lg font-semibold text-gray-800 overflow-hidden text-ellipsis line-clamp-2">
                          {news.title}
                        </p>
                        <p className="pb-1 text-[10px] text-gray-400">
                          Ngày đăng: {news.created_at}
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

        {/* end */}
        <div className="space-y-4 mt-16">
          {/* Banner */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <img
              src="../../../../../../public/imagessale.jpg"
              alt="Advertisement 1"
              className="w-full rounded-lg shadow-md  object-cover"
            />
            <img
              src="../../../../../../public/imagessale.jpg"
              alt="Advertisement 2"
              className="w-full rounded-lg shadow-md  object-cover"
            />
            <img
              src="../../../../../../public/imagessale.jpg"
              alt="Advertisement 3"
              className="w-full rounded-lg shadow-md  object-cover"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsDetail;
