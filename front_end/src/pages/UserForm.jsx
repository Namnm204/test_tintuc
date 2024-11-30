import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Nếu đang sửa, gọi API để lấy thông tin người dùng
      axios
        .get(`https://my-worker.namdaynay001.workers.dev/${id}`)
        .then((response) => {
          const user = response.data[0];
          // Đặt giá trị cho các trường
          setValue("name", user.name);
          setValue("email", user["email "].trim());
        })
        .catch((error) => console.error(error));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        // Cập nhật người dùng
        await axios.put(
          `https://my-worker.namdaynay001.workers.dev/${id}`,
          data
        );
      } else {
        // Thêm người dùng mới
        await axios.post(
          "https://my-worker.namdaynay001.workers.dev/users",
          data
        );
      }
      navigate("/"); // Quay về trang danh sách người dùng
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold text-center mb-4">
          {id ? "Edit User" : "Add User"}
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("name", { required: true })}
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("email", { required: true })}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {id ? "Update" : "Add"} User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
