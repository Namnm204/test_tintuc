import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To fetch the product slug from URL params
import axios from "axios";
import { Helmet } from "react-helmet"; // Import Helmet

const DetailTintucPageAdmin = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  // Fetch product details based on slug
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

  if (!product) return <p>Loading...</p>;

  return (
    <>
      {/* Update meta tags dynamically */}
      <Helmet>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image} />
      </Helmet>

      <div className="container mx-auto p-6 md:mt-0 mt-12">
        <div className="flex flex-col md:flex-row">
          {/* Product Image Section */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={product.image}
              alt={product.title}
              className="md:w-[60%] w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2 md:pl-12">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              <h3>Tiêu đề:</h3>
              {product.title}
            </h1>

            <p className="text-base text-gray-500 mb-6">
              Mô tả: {product.description}
            </p>

            {/* Author and Content */}
            <p className="text-base text-gray-700 mb-4">
              Tác giả: {product.author}
            </p>
            <div className="mb-4">
              <h3 className="font-semibold">Nội dung:</h3>
              {product.content &&
              Array.isArray(product.content) &&
              product.content.length > 0 ? (
                product.content.map((contentItem, index) => (
                  <div key={index} className="mb-6">
                    <p
                      className="text-lg text-gray-700 mb-3 content"
                      dangerouslySetInnerHTML={{
                        __html: contentItem.value,
                      }}
                    />
                    <div className="flex items-start space-x-4">
                      {contentItem.image && (
                        <img
                          src={contentItem.image}
                          alt={`Content image ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-md border border-gray-300 shadow-sm"
                        />
                      )}
                      <p className="text-sm text-gray-600">
                        Mô tả ảnh:
                        <span className="italic">
                          {contentItem.mota_image_content}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No content available.</p>
              )}
            </div>

            {/* Created At */}
            <p className="mt-6 text-sm text-gray-500">
              Ngày đăng tải: {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTintucPageAdmin;
