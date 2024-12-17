import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS

const TintucAdd = () => {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  const [contentFields, setContentFields] = useState([
    { value: "", image: "", mota_image_content: "" },
  ]);
  const [mainImage, setMainImage] = useState(""); // State to store the main image URL

  const addContentField = () => {
    setContentFields([
      ...contentFields,
      { value: "", image: "", mota_image_content: "" },
    ]);
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...contentFields];
    updatedContent[index][field] = value;
    setContentFields(updatedContent);
  };

  const handleMainImageChange = (e) => {
    const url = e.target.value;
    setMainImage(url); // Update main image URL
  };

  const onSubmit = async (data) => {
    const vietnamTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const newData = {
      ...data,
      created_at: vietnamTime,
      content: contentFields.filter(
        (item) =>
          item.value.trim() !== "" ||
          item.image.trim() !== "" ||
          item.mota_image_content.trim() !== ""
      ),
    };

    try {
      const response = await axios.post(
        "https://my-worker.namdaynay001.workers.dev/tintucs",
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("Thêm thành công");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Tiêu đề bài viết đã tồn tại");
    }
  };

  // Cập nhật modules để cho phép thay đổi màu văn bản
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link"], // Cho phép chèn liên kết
      [{ color: [] }, { background: [] }],
      ["blockquote"],
      ["image"], // Cho phép chèn hình ảnh
      ["code-block"],
    ],
  };

  // Hàm kiểm tra URL hợp lệ
  const isValidImageUrl = (url) => {
    return (
      url &&
      (url.startsWith("http://") || url.startsWith("https://")) &&
      (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png"))
    );
  };

  // Lấy giá trị người dùng đã nhập vào
  const title = watch("title");
  const description = watch("description");
  const author = watch("author");
  const mota_image = watch("mota_image");

  return (
    <div className="flex">
      <div className="mx-auto p-4 bg-white rounded-md shadow-md w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-semibold text-center mb-4">
            Thêm tin Tức
          </h1>
          <div className="flex pb-1">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Thêm tin tức
            </button>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tiêu đề tin tức"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("title", { required: true })}
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Mô tả tin tức"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("description", { required: true })}
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Đường dẫn ảnh chính"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={mainImage}
              onChange={handleMainImageChange} // Update the main image URL
            />
          </div>

          {/* Hiển thị ảnh chính nếu URL hợp lệ */}
          {isValidImageUrl(mainImage) && (
            <img
              src={mainImage}
              alt="Main Image"
              className="mt-2 w-full max-w-[150px] pb-3 pl-4 h-auto"
            />
          )}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Mô tả ảnh"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("mota_image")}
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Tác giả"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("author")}
            />
          </div>

          {/* Trường content cho phép người dùng nhập nhiều mục */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nội dung
            </label>
            {contentFields.map((field, index) => (
              <div key={index} className="mb-4 space-y-2">
                <div className="pb-3 pt-3">content: {index + 1}</div>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={(content) =>
                    handleContentChange(index, "value", content)
                  }
                  modules={modules}
                  className="react-quill mb-2 h-[100px]"
                />

                <input
                  type="text"
                  placeholder="Link ảnh content"
                  value={field.image}
                  onChange={(e) =>
                    handleContentChange(index, "image", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {/* Hiển thị ảnh nếu URL hợp lệ */}
                {isValidImageUrl(field.image) && (
                  <img
                    src={field.image}
                    alt="Image content"
                    className="mt-2 w-full max-w-[150px] pb-3 pl-4 h-auto"
                  />
                )}
                <input
                  type="text"
                  placeholder="Mô tả ảnh"
                  value={field.mota_image_content}
                  onChange={(e) =>
                    handleContentChange(
                      index,
                      "mota_image_content",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addContentField}
              className="text-blue-500 hover:underline"
            >
              <span>&#43;</span> Thêm mục nội dung
            </button>
          </div>
        </form>
      </div>

      {/* Khung xem trước tin tức */}
      <div className="mx-auto hidden md:block p-4 bg-gray-100 rounded-md shadow-md w-1/2 ml-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Xem trước tin tức
        </h2>
        <div className="w-[80%] mx-auto">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{author}</p>
          <p className="mt-2">{description}</p>

          {/* Hiển thị ảnh chính nếu có */}
          {isValidImageUrl(mainImage) && (
            <img
              src={mainImage}
              alt="Main Image"
              className="mt-2 w-full max-w-[200px] pb-3"
            />
          )}

          <p className="mt-2">{mota_image}</p>

          {/* Render content */}
          {contentFields.map((field, index) => (
            <div key={index} className="mt-4">
              <div dangerouslySetInnerHTML={{ __html: field.value }} />
              {isValidImageUrl(field.image) && (
                <img
                  src={field.image}
                  alt="Content Image"
                  className="mt-2 w-full max-w-[200px]"
                />
              )}
              <p>{field.mota_image_content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TintucAdd;
