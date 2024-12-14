import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const NewsLayout = () => {
  const scrollRef = useRef(null);
  const [tintucs, setTintucs] = useState([]);

  useEffect(() => {
    // Fetch banners from your API
    async function fetchTintucs() {
      try {
        const response = await fetch(
          "https://my-worker.namdaynay001.workers.dev/tintucs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }
        const data = await response.json();
        // Sắp xếp tin tức theo thời gian giảm dần
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setTintucs(sortedData);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchTintucs();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const scrollInterval = setInterval(() => {
        container.scrollTop += 1;

        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight
        ) {
          container.scrollTop = 0;
        }
      }, 50);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  const newsLayoutArticles = tintucs.slice(0, 4); // Show first 4 articles in NewsLayout
  return (
    <>
      <div className="w-[90%] md:w-[75%] h-[100%] justify-between flex mx-auto flex-col md:flex-row">
        {/* Phần bên trái */}
        {newsLayoutArticles.length > 0 ? (
          <div className="w-full md:w-[75%] pr-0 md:pr-4">
            {/* Phần trên */}
            <Link
              to={`/tintuc/${newsLayoutArticles[0].slug}`}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row">
                  <img
                    src={newsLayoutArticles[0].image} // Hiển thị hình ảnh của tin tức đầu tiên
                    className="w-full md:w-[70%] h-[250px] md:h-[400px] object-cover"
                    alt={newsLayoutArticles[0].title} // Sử dụng tiêu đề làm alt
                  />
                  <div className=" w-full md:w-[45%] md:h-[145px] md:pl-4 ">
                    <h3 className="font-semibold text-lg overflow-hidden">
                      {newsLayoutArticles[0].title}
                    </h3>
                    <p className="text-[10px] text-gray-400">
                      Ngày đăng: {newsLayoutArticles[0].created_at}
                    </p>
                    <p className="whitespace-normal text-[13px] h-[165px] pt-3 break-words overflow-hidden text-ellipsis ">
                      {newsLayoutArticles[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Phần dưới */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {newsLayoutArticles.slice(1, 4).map((tintuc) => (
                <Link
                  to={`/tintuc/${tintuc.slug}`}
                  key={tintuc.slug}
                  className="w-full"
                >
                  <div className=" overflow-hidden whitespace-normal break-words">
                    <img
                      src={tintuc.image} // Hiển thị hình ảnh của tin tức đầu tiên
                      className="w-full h-[250px] md:h-[210px] object-cover"
                      alt={tintuc.title} // Sử dụng tiêu đề làm alt
                    />
                    <h1 className=" text-[16px] font-bold pt-3 md:pl-3 pb-1 overflow-hidden text-ellipsis line-clamp-3">
                      {tintuc.title}
                    </h1>
                    <p className="md:pl-3 pb-1 text-[10px] text-gray-400">
                      Ngày đăng: {newsLayoutArticles[0].created_at}
                    </p>
                    <p className="h-[100px] md:ml-3 mr-3 text-[13px] overflow-hidden text-ellipsis">
                      {tintuc.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>Không có tin tức để hiển thị</div>
        )}

        {/* Phần bên phải slide chay */}
        {tintucs.length > 0 ? (
          <div
            className=" relative w-full md:w-[23%] flex flex-col justify-start mt-4 md:mt-0 overflow-y-auto"
            style={{ maxHeight: "800px" }}
          >
            <h2 className="text-3xl font-semibold absolute top-2 text-red-500 p-2 pr-14">
              Tin tức HOT
            </h2>
            <div
              className="mt-16 overflow-y-auto" // Thêm overflow-y-auto để kích hoạt thanh cuộn dọc
              ref={scrollRef}
              style={{ maxHeight: "700px" }} // Giới hạn chiều cao của vùng cuộn
            >
              {tintucs.map((tintuc, index) => (
                <Link
                  to={`/tintuc/${tintuc.slug}`}
                  key={tintuc.slug}
                  className="w-full"
                >
                  <div key={index} className="flex items-center p-2 border-b">
                    <img
                      src={tintuc.image}
                      className="w-[100px] h-[80px] object-cover rounded-md"
                      alt="Tin tức"
                    />
                    <div>
                      <h1 className="md:ml-3 text-[13px] text-gray-700 overflow-hidden text-ellipsis line-clamp-3">
                        {tintuc.title}
                      </h1>
                      <p className="md:ml-3 text-[10px] text-gray-400">
                        {newsLayoutArticles[0].created_at}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>Không có tin tức để hiển thị</div>
        )}
      </div>

      <div className="h-px w-[90%] md:w-[75%] mx-auto  my-8" />
    </>
  );
};

export default NewsLayout;
