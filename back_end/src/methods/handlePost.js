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

    // Chuyển đổi mảng content thành chuỗi JSON để lưu vào cơ sở dữ liệu
    const contentJson = JSON.stringify(content);

    // Chèn bài viết mới vào cơ sở dữ liệu
    const result = await env.D1.prepare(
      "INSERT INTO tintucs (title, description, image, mota_image, author, content, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
      .bind(
        title,
        description,
        image,
        mota_image,
        author,
        contentJson, // Lưu gallery dưới dạng chuỗi JSON
        created_at
      )
      .run();

    return new Response("Thêm thành công", {
      status: 201,
      result,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("POST request failed:", error); // Ghi lại lỗi chi tiết
    return new Response(`Lỗi: ${error.message}`, { status: 500 });
  }
}
