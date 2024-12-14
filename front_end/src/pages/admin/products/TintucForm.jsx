import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS

const UserForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [contentFields, setContentFields] = useState([
    { value: "", image: "", mota_image_content: "" },
  ]);

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
      [{ color: [] }, { background: [] }], // Thêm chức năng thay đổi màu chữ và màu nền
      ["blockquote"],
      ["image"],
      ["code-block"],
    ],
  };

  return (
    <div className="mx-auto p-4 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold text-center mb-4">Add News</h1>

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
            {...register("image")}
          />
        </div>

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
            <div key={index} className="mb-4">
              <div>{index + 1}</div>
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={(content) =>
                  handleContentChange(index, "value", content)
                }
                modules={modules} // Áp dụng modules để cho phép thay đổi màu văn bản
                className="react-quill mb-2" // Áp dụng class để thay đổi kích thước
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Thêm tin tức
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
