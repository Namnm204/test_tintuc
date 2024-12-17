import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS

const UpdatePostForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { slug } = useParams(); // Lấy slug từ URL
  const [contentFields, setContentFields] = useState([
    { value: "", image: "", mota_image_content: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://my-worker.namdaynay001.workers.dev/tintucs/${slug}`
        );
        if (response.status === 200) {
          const post = response.data;

          // Kiểm tra xem content có phải là chuỗi JSON không và phân tích nó thành mảng
          let content = post.content;
          if (typeof content === "string") {
            try {
              content = JSON.parse(content); // Chuyển chuỗi JSON thành mảng
            } catch (error) {
              console.error("Lỗi phân tích JSON content:", error);
              content = []; // Khởi tạo mảng rỗng nếu không phân tích được
            }
          }

          // Kiểm tra xem content có phải là mảng không trước khi set vào state
          if (Array.isArray(content)) {
            setContentFields(content);
          } else {
            console.error("Content không phải là mảng hợp lệ.");
            setContentFields([]); // Khởi tạo mảng rỗng nếu không phải mảng
          }

          // Set các giá trị còn lại trong form
          setValue("title", post.title);
          setValue("description", post.description);
          setValue("image", post.image);
          setValue("mota_image", post.mota_image);
          setValue("author", post.author);
          setValue("created_at", post.created_at);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        setMessage("Lỗi khi tải bài viết");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, setValue]);

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
      const response = await axios.put(
        `https://my-worker.namdaynay001.workers.dev/tintucs/${slug}`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Cập nhật thành công");
        navigate("/admin/list");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Có lỗi xảy ra khi cập nhật bài viết");
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

  // Kiểm tra nếu contentFields là mảng trước khi gọi map
  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="mx-auto p-4 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Cập nhật tin tức
        </h1>

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
          {Array.isArray(contentFields) && contentFields.length > 0 ? (
            contentFields.map((field, index) => (
              <div key={index} className="mb-4">
                <div className="pb-3 pt-3">content: {index + 1}</div>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={(content) =>
                    handleContentChange(index, "value", content)
                  }
                  modules={modules} // Áp dụng modules để cho phép thay đổi màu văn bản
                  className="react-quill mb-2 h-[100px]" // Áp dụng class để thay đổi kích thước
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
            ))
          ) : (
            <p>Không có nội dung để hiển thị.</p>
          )}
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
            Cập nhật tin tức
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostForm;
