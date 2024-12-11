export async function handleDelete(request, env) {
  const url = new URL(request.url); // Lấy thông tin URL từ request
  const pathSegments = url.pathname.split("/"); // Tách các phần của URL
  const userId = pathSegments[1]; // Lấy phần tử thứ 2 (user ID)

  try {
    // Nếu không có ID cụ thể, xóa toàn bộ
    if (userId === "all") {
      await env.D1.prepare("DELETE FROM tintucs").run(); // Xóa toàn bộ sản phẩm
      return new Response("All records deleted successfully", { status: 200 });
    }

    // Nếu có ID cụ thể, chỉ xóa một bản ghi
    await env.D1.prepare("DELETE FROM tintucs WHERE id = ?").bind(userId).run();
    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
