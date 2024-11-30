import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // State để quản lý danh sách các link ảnh trong gallery
  const [galleryLinks, setGalleryLinks] = useState([""]);

  // Hàm thêm một trường nhập liệu mới cho gallery
  const addGalleryField = () => {
    setGalleryLinks([...galleryLinks, ""]);
  };

  // Hàm cập nhật giá trị của từng trường gallery
  const handleGalleryChange = (index, value) => {
    const updatedGallery = [...galleryLinks];
    updatedGallery[index] = value;
    setGalleryLinks(updatedGallery);
  };

  const onSubmit = async (data) => {
    const vietnamTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const newData = {
      ...data,
      created_at: vietnamTime, // Gán thời gian hiện tại cho created_at
      gallery: galleryLinks.filter((link) => link.trim() !== ""), // Lọc bỏ các link trống
    };

    console.log("Dữ liệu gửi đến server:", newData); // Kiểm tra dữ liệu
    try {
      const response = await axios.post(
        "https://my-worker.namdaynay001.workers.dev/news", // Thay đổi URL theo yêu cầu của bạn
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        navigate("/admin"); // Điều hướng nếu thành công
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Lỗi mạng hoặc sự cố backend.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold text-center mb-4">Add News</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("title", { required: true })}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("description", { required: true })}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Image URL"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("image")}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Author"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("author", { required: true })}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Category"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("category", { required: true })}
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Content"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("content", { required: true })}
          />
        </div>

        {/* Trường gallery cho phép người dùng nhập nhiều link */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Gallery (Multiple Links)
          </label>
          {galleryLinks.map((link, index) => (
            <div key={index} className="mb-2 flex">
              <input
                type="text"
                placeholder="Enter image URL"
                value={link}
                onChange={(e) => handleGalleryChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addGalleryField}
            className="text-blue-500 hover:underline"
          >
            Add More Image
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add News
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
