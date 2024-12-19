import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS

const UpdatePostForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const { slug } = useParams(); // Lấy slug từ URL
  const [contentFields, setContentFields] = useState([
    { value: "", image: "", mota_image_content: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const watchedFields = watch(); // Theo dõi toàn bộ các trường

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://my-worker.namdaynay001.workers.dev/tintucs/${slug}`
        );
        if (response.status === 200) {
          const post = response.data;

          // Phân tích content nếu là JSON
          let content = post.content;
          if (typeof content === "string") {
            try {
              content = JSON.parse(content);
            } catch (error) {
              console.error("Lỗi phân tích JSON content:", error);
              content = [];
            }
          }

          setContentFields(Array.isArray(content) ? content : []);
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

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link"],
      [{ color: [] }, { background: [] }],
      ["blockquote"],
      ["image"],
      ["code-block"],
    ],
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="flex space-x-4">
      {/* Form cập nhật tin tức */}
      <div className="w-1/2 mx-auto p-4 bg-white rounded-md shadow-md">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nội dung
            </label>
            {contentFields.map((field, index) => (
              <div key={index} className="mb-4">
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={(content) =>
                    handleContentChange(index, "value", content)
                  }
                  modules={modules}
                  className="react-quill mb-2"
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
                  placeholder="Mô tả ảnh content"
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
              Cập nhật tin tức
            </button>
          </div>
        </form>
      </div>

      {/* Xem trước tin tức */}
      <div className="w-1/2 bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Xem trước tin tức</h2>
        <div>
          <p className="text-sm text-gray-600 mb-2">
            {watchedFields.author || "Tác giả"}
          </p>
          <h3 className="text-lg font-bold">
            {watchedFields.title || "Tiêu đề sẽ hiển thị ở đây"}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {watchedFields.description || "Mô tả sẽ hiển thị ở đây..."}
          </p>
          {watchedFields.image && (
            <img
              src={watchedFields.image}
              alt="Hình ảnh chính"
              className="w-full h-auto mb-2"
            />
          )}
          <p className="text-sm text-gray-600 mb-2 mt-[-5px] text-center">
            {watchedFields.mota_image || "Mô tả sẽ hiển thị ở đây..."}
          </p>
          {contentFields.map((field, index) => (
            <div key={index} className="mb-4">
              <div
                className="mb-2"
                dangerouslySetInnerHTML={{ __html: field.value }}
              />
              {field.image && (
                <img
                  src={field.image}
                  alt={field.mota_image_content || "Hình ảnh phụ"}
                  className="w-full h-auto"
                />
              )}
              {field.mota_image_content && (
                <p className="text-sm text-gray-600 text-center">
                  {field.mota_image_content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatePostForm;
