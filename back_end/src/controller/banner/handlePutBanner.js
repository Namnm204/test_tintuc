export async function handlePutBanner(request, env) {
  try {
    // Lấy URL và id từ đường dẫn của yêu cầu
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Lấy id từ URL (ví dụ: /banners/:id)

    // Đọc dữ liệu từ request body
    const requestBody = await request.json();
    const { imageBanner, imagestick, imageSale, imagehome, imageEndpage } =
      requestBody;

    // Kiểm tra nếu bất kỳ trường nào không hợp lệ hoặc thiếu
    if (
      !imageBanner ||
      !imagestick ||
      !imageSale ||
      !imagehome ||
      !Array.isArray(imageEndpage)
    ) {
      return new Response(
        JSON.stringify({ message: "Missing or invalid required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Chuyển đổi imageEndpage thành JSON string nếu cần
    const imageEndpageJson = JSON.stringify(imageEndpage);

    // Truy vấn để cập nhật banner trong cơ sở dữ liệu
    const query =
      "UPDATE banners SET imageBanner = ?, imagestick = ?, imageSale = ?, imagehome = ?, imageEndpage = ? WHERE id = ?";

    // Thực thi truy vấn với dữ liệu đã bind
    const result = await env.D1.prepare(query)
      .bind(imageBanner, imagestick, imageSale, imagehome, imageEndpageJson, id)
      .run();

    // Kiểm tra nếu truy vấn thành công
    if (result.success) {
      return new Response(
        JSON.stringify({
          message: "Cập nhật banner thành công",
          data: {
            imageBanner,
            imagestick,
            imageSale,
            imagehome,
            imageEndpage,
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    } else {
      // Nếu không tìm thấy banner với id này
      return new Response(
        JSON.stringify({ message: "Không tìm thấy banner với id này" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    // Nếu có lỗi xảy ra
    console.error("PUT request failed:", error); // Log lỗi ra console
    return new Response(
      JSON.stringify({ message: "Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
