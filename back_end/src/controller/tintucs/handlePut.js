export async function handlePut(request, env) {
  try {
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop(); // Lấy slug từ URL (ví dụ: /tintucs/:slug)
    const requestBody = await request.json();

    // Đảm bảo các trường không bị undefined, nếu có thì thay thế bằng giá trị mặc định
    const {
      title = "",
      description = "",
      image = "",
      mota_image = "",
      author = "",
      content = [],
      created_at = new Date().toISOString(),
    } = requestBody;

    // Hàm chuyển đổi title thành slug mới
    const generateSlug = (str) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const newSlug = generateSlug(title); // Tạo slug mới từ title

    // Kiểm tra xem slug có tồn tại trong cơ sở dữ liệu hay không
    const checkSlugExistence = await env.D1.prepare(
      "SELECT COUNT(*) AS count FROM tintucs WHERE slug = ?"
    )
      .bind(slug) // Dùng slug từ URL
      .first();

    if (checkSlugExistence.count === 0) {
      return new Response(
        JSON.stringify({
          message: "Slug không tồn tại, không thể cập nhật bài viết",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Cập nhật bài viết trong cơ sở dữ liệu
    let contentJson = JSON.stringify(content); // Chuyển từ const thành let để có thể thay đổi giá trị

    // Nếu contentJson rỗng, đảm bảo rằng nó là một mảng rỗng hợp lệ
    if (!contentJson) {
      contentJson = JSON.stringify([]);
    }

    // Cập nhật bài viết trong cơ sở dữ liệu
    const result = await env.D1.prepare(
      "UPDATE tintucs SET title = ?, description = ?, image = ?, mota_image = ?, author = ?, content = ?, created_at = ?, slug = ? WHERE slug = ?"
    )
      .bind(
        title,
        description,
        image,
        mota_image,
        author,
        contentJson,
        created_at,
        newSlug, // Cập nhật slug mới
        slug // Cập nhật theo slug cũ
      )
      .run();

    if (result.success) {
      return new Response(
        JSON.stringify({
          message: "Cập nhật tin tức thành công",
          data: {
            slug: newSlug, // Trả về slug mới được tạo
            title,
            description,
            image,
            mota_image,
            author,
            content: contentJson,
            created_at,
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    } else {
      console.error("D1 update failed: ", result); // Log thêm chi tiết lỗi nếu cần
      return new Response(
        JSON.stringify({ message: "Lỗi khi cập nhật bài viết" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("PUT request failed:", error); // Log lỗi chi tiết
    return new Response(JSON.stringify({ message: `Lỗi: ${error.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
