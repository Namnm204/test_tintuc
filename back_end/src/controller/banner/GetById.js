export async function handleGetBanner(request, env) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Lấy id từ URL (ví dụ: /banners/1)

    // Truy vấn cơ sở dữ liệu để lấy thông tin banner theo id
    const query = "SELECT * FROM banners WHERE id = ?";
    const result = await env.D1.prepare(query).bind(id).first();

    if (result) {
      return new Response(
        JSON.stringify({
          message: "Lấy thông tin banner thành công",
          data: result,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Không tìm thấy banner với id này" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("GET request failed:", error); // Ghi lại lỗi nếu có
    return new Response(
      JSON.stringify({ message: "Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
