export async function handlePostBanner(request, env) {
  try {
    const requestBody = await request.json();
    const { imageBanner, imagestick, imageSale, imagehome, imageEndpage } =
      requestBody;

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

    const imageEndpageJson = JSON.stringify(imageEndpage);

    const query =
      "INSERT INTO banners (imageBanner, imagestick, imageSale, imagehome, imageEndpage) VALUES (?, ?, ?, ?, ?)";
    const result = await env.D1.prepare(query)
      .bind(imageBanner, imagestick, imageSale, imagehome, imageEndpageJson)
      .run();

    return new Response(
      JSON.stringify({
        message: "Thêm banner thành công",
        data: {
          imageBanner,
          imagestick,
          imageSale,
          imagehome,
          imageEndpage,
        },
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("POST request failed:", error); // Ghi lại lỗi nếu có
    return new Response(
      JSON.stringify({ message: "Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
