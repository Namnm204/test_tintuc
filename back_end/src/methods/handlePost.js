export async function handlePost(request, env) {
  try {
    const requestBody = await request.json(); // Get JSON body
    const {
      title = "", // Gán giá trị mặc định nếu thiếu
      description = "",
      image = "",
      author = "",
      category = "",
      gallery = [], // Mặc định là mảng rỗng
      content = "",
      created_at = new Date().toISOString(), // Gán thời gian hiện tại nếu không có
    } = requestBody;

    // Convert gallery array to JSON string to store it in database
    const galleryJson = JSON.stringify(gallery);

    // Insert new article into the database
    const result = await env.D1.prepare(
      "INSERT INTO tintucs (title, description, image, author, category, gallery, content, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    )
      .bind(
        title,
        description,
        image,
        author,
        category,
        galleryJson, // Store gallery as JSON string
        content,
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
    console.error("POST request failed:", error); // Log detailed error
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
