export async function handleDeleteBanner(request, env) {
  const url = new URL(request.url);
  const id = url.pathname.split("/")[2]; // Lấy ID từ URL (/banners/1 -> id = "1")

  try {
    await env.D1.prepare("DELETE FROM banners WHERE id = ?").bind(id).run();
    return new Response("Banner deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
