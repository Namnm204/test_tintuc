export async function handleGetBySlug(env, request) {
  try {
    const url = new URL(request.url);
    const slug = url.pathname.split("/tintucs/")[1]; // Lấy slug từ URL

    if (!slug) {
      return new Response(JSON.stringify({ message: "Slug không hợp lệ" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Tăng view trước khi trả về bài viết
    await env.D1.prepare("UPDATE tintucs SET view = view + 1 WHERE slug = ?")
      .bind(slug)
      .run();

    // Lấy thông tin bài viết từ database
    const article = await env.D1.prepare("SELECT * FROM tintucs WHERE slug = ?")
      .bind(slug)
      .first();

    if (!article) {
      return new Response(
        JSON.stringify({ message: "Bài viết không tồn tại" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết bài viết:", error);
    return new Response(
      JSON.stringify({ message: `Lỗi hệ thống: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
