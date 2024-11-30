const NewsLayout = () => {
  return (
    <>
      <div className="w-[90%] md:w-[75%] h-[100%] justify-between flex mx-auto flex-col md:flex-row">
        {/* Phần bên trái */}
        <div className="w-full md:w-[75%] pr-0 md:pr-4">
          {/* Phần trên */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row">
              <img
                src="../../../public/banner.jpg"
                className="w-full md:w-[70%] h-[250px] md:h-[400px] object-cover"
                alt=""
              />
              <div className="bg-gray-300 w-full md:w-[45%] p-4 overflow-hidden">s
                <p className="whitespace-normal break-words">
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaáđwdwaaaaaaaaaaaaaaaaa
                </p>
              </div>
            </div>
          </div>

          {/* Phần dưới */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-300 p-4 overflow-hidden whitespace-normal break-words">
              <p>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                ssssssssssssssssssssssssssssssáđwdwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </p>
            </div>
            <div className="bg-gray-300 p-4 overflow-hidden whitespace-normal break-words">
              <p>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                ssssssssssssssssssssssssssssssáđwdwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </p>
            </div>
            <div className="bg-gray-300 p-4 overflow-hidden whitespace-normal break-words">
              <p>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                ssssssssssssssssssssssssssssssáđwdwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </p>
            </div>
          </div>
        </div>

        {/* Phần bên phải */}
        <div className="bg-gray-300 w-full md:w-[23%] flex items-center justify-center mt-4 md:mt-0">
          <h2 className="text-xl font-semibold">Slide tin tức hot chạy</h2>
        </div>
      </div>
      <div className="h-px w-[90%] md:w-[75%] mx-auto bg-gray-300 my-8" />
    </>
  );
};

export default NewsLayout;
