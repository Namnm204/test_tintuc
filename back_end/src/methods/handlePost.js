export async function handlePost(request, env) {
  try {
    const requestBody = await request.json(); // Lấy dữ liệu JSON từ request
    const {
      title = "", // Giá trị mặc định nếu thiếu
      description = "",
      image = "",
      mota_image = "",
      author = "",
      content = [],
      created_at = new Date().toISOString(), // Lấy thời gian hiện tại nếu không có
    } = requestBody;

    // Hàm chuyển đổi title thành slug
    const generateSlug = (str) =>
      str
        .toLowerCase()
        .normalize("NFD") // Chuyển đổi ký tự Unicode sang dạng phân tách
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
        .replace(/[^a-z0-9]+/g, "-") // Thay các ký tự không phải chữ/số bằng gạch ngang
        .replace(/^-+|-+$/g, ""); // Loại bỏ dấu gạch ngang ở đầu/cuối

    const slug = generateSlug(title); // Tạo slug từ title

    // Kiểm tra trùng tiêu đề trong cơ sở dữ liệu
    const checkTitle = await env.D1.prepare(
      "SELECT COUNT(*) AS count FROM tintucs WHERE title = ?"
    )
      .bind(title)
      .first();

    if (checkTitle.count > 0) {
      return new Response(
        JSON.stringify({ message: "Tiêu đề bài viết đã tồn tại" }),
        {
          status: 409, // HTTP Conflict
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Chuyển đổi mảng content thành chuỗi JSON để lưu vào cơ sở dữ liệu
    const contentJson = JSON.stringify(content);

    // Chèn bài viết mới vào cơ sở dữ liệu
    const result = await env.D1.prepare(
      "INSERT INTO tintucs (title, description, image, mota_image, author, content, created_at, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    )
      .bind(
        title,
        description,
        image,
        mota_image,
        author,
        contentJson, // Lưu content dưới dạng chuỗi JSON
        created_at,
        slug // Lưu slug
      )
      .run();

    if (result.success) {
      return new Response(
        JSON.stringify({
          message: "Thêm tin tức thành công",
          data: {
            title,
            slug,
            description,
            image,
            mota_image,
            author,
            content: contentJson,
            created_at,
          },
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json", // Đặt kiểu nội dung là JSON
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    } else {
      // Trường hợp chèn dữ liệu không thành công
      return new Response(
        JSON.stringify({ message: "Lỗi khi thêm bài viết vào cơ sở dữ liệu" }),
        {
          status: 500, // Internal Server Error
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("POST request failed:", error); // Ghi lại lỗi chi tiết
    return new Response(JSON.stringify({ message: `Lỗi: ${error.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
