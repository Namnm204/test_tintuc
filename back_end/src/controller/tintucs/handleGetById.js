export async function handleGetBySlug(env, request) {
  try {
    // Lấy 'slug' từ URL path
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop(); // Giả định URL dạng /tintucs/:slug

    if (!slug) {
      return new Response("Slug is required", { status: 400 });
    }

    // Truy vấn SQL để lấy tin tức theo slug
    const { results } = await env.D1.prepare(
      "SELECT * FROM tintucs WHERE slug = ?"
    )
      .bind(slug)
      .all();

    // Kiểm tra nếu không tìm thấy kết quả
    if (!results || results.length === 0) {
      return new Response("News not found", { status: 404 });
    }

    // Trả về dữ liệu tin tức ở dạng JSON
    return new Response(JSON.stringify(results[0]), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Cho phép CORS
        "Access-Control-Allow-Methods": "GET, POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("GET by Slug Error:", error);
    return new Response(`Internal Server Error: ${error.message}`, {
      status: 500,
    });
  }
}
