export async function handlePost(request, env) {
  try {
    const requestBody = await request.json();
    const {
      title = "",
      description = "",
      image = "",
      mota_image = "",
      author = "",
      content = [],
      created_at = new Date().toISOString(),
      keyword = "", // Thêm trường keywords
    } = requestBody;

    // Hàm chuyển đổi title thành slug
    const generateSlug = (str) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const slug = generateSlug(title);

    // Kiểm tra tiêu đề trùng lặp
    const checkTitle = await env.D1.prepare(
      "SELECT COUNT(*) AS count FROM tintucs WHERE title = ?"
    )
      .bind(title)
      .first();

    if (checkTitle.count > 0) {
      return new Response(
        JSON.stringify({ message: "Tiêu đề bài viết đã tồn tại" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Chuyển đổi content thành chuỗi JSON
    const contentJson = JSON.stringify(content);

    // Chèn bài viết mới vào cơ sở dữ liệu
    const result = await env.D1.prepare(
      "INSERT INTO tintucs (title, description, image, mota_image, author, content, created_at, slug, view, keyword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
      .bind(
        title,
        description,
        image,
        mota_image,
        author,
        contentJson,
        created_at,
        slug,
        0, // Lượt xem mặc định là 0
        keyword // Thêm giá trị keywords
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
            view: 0,
            keyword, // Trả về keywords
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
    } else {
      return new Response(
        JSON.stringify({ message: "Lỗi khi thêm bài viết vào cơ sở dữ liệu" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("POST request failed:", error);
    return new Response(JSON.stringify({ message: `Lỗi: ${error.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
