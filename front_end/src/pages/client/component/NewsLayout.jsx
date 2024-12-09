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
        setTintucs(data);
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
            <Link to={`/tintuc/${newsLayoutArticles[0].id}`} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row">
                  <img
                    src={newsLayoutArticles[0].image} // Hiển thị hình ảnh của tin tức đầu tiên
                    className="w-full md:w-[70%] h-[250px] md:h-[400px] object-cover"
                    alt={newsLayoutArticles[0].title} // Sử dụng tiêu đề làm alt
                  />
                  <div className=" w-full md:w-[45%] p-4 overflow-hidden">
                    <h3 className="font-semibold text-lg">
                      ID: {newsLayoutArticles[0].id}
                    </h3>
                    <h3 className="font-semibold text-lg">
                      {newsLayoutArticles[0].title}
                    </h3>
                    <p className="whitespace-normal break-words">
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
                  to={`/tintuc/${tintuc.id}`}
                  key={tintuc.id}
                  className="w-full"
                >
                  <div className=" p-4 overflow-hidden whitespace-normal break-words">
                    <h3>{tintuc.title}</h3>
                    <p className="h-[224px] text-[13px] overflow-hidden text-ellipsis line-clamp-3">
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
            className=" relative w-full md:w-[23%] flex flex-col justify-start mt-4 md:mt-0 "
            style={{ maxHeight: "700px" }} // Giới hạn chiều cao
          >
            <h2 className="text-3xl font-semibold absolute top-2 text-red-500 p-2 pr-14">
              Tin tức HOT
            </h2>
            <div
              className="mt-16 overflow-hidden"
              ref={scrollRef}
              style={{ maxHeight: "620px" }}
            >
              {/* Khoảng trống cho tiêu đề */}
              {tintucs.map((tintuc, index) => (
                <Link
                  to={`/tintuc/${tintuc.id}`}
                  key={tintuc.id}
                  className="w-full"
                >
                  <div key={index} className="flex items-center p-2">
                    <img
                      src={tintuc.image}
                      className="w-[100px] h-[80px]"
                      alt=""
                    />
                    <p className="ml-3">{tintuc.title}</p>
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
