export async function handleDelete(request, env) {
  const url = new URL(request.url); // Lấy thông tin URL từ request
  const pathSegments = url.pathname.split("/"); // Tách các phần của URL
  const productId = pathSegments[pathSegments.length - 1]; // Lấy ID từ phần cuối của URL

  try {
    // Nếu không có ID cụ thể, xóa toàn bộ
    if (productId === "all") {
      await env.D1.prepare("DELETE FROM tintucs").run(); // Xóa toàn bộ tin tức
      return new Response("All records deleted successfully", { status: 200 });
    }

    // Nếu có ID cụ thể, chỉ xóa một bản ghi
    const result = await env.D1.prepare("DELETE FROM tintucs WHERE id = ?")
      .bind(productId)
      .run();

    if (result.changedRows === 0) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response("Product deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
