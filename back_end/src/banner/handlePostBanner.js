export async function handlePostBanner(request, env) {
  try {
    const requestBody = await request.json(); // Lấy nội dung JSON từ request
    const { image } = requestBody;

    // Kiểm tra nếu trường image không tồn tại
    if (!image) {
      return new Response("Missing required field: image", { status: 400 });
    }

    // Thêm banner mới vào cơ sở dữ liệu
    const result = await env.D1.prepare(
      "INSERT INTO banners (image) VALUES (?)"
    )
      .bind(image)
      .run();

    return new Response("Thêm banner thành công", {
      status: 201,
      result,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("POST request failed:", error); // Log lỗi chi tiết
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
