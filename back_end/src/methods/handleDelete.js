export async function handleDelete(request, env) {
  const url = new URL(request.url); // Khai báo lại đối tượng URL
  const userId = url.pathname.split("/")[1]; // Extract user ID from URL

  try {
    await env.D1.prepare("DELETE FROM tintucs WHERE id = ?").bind(userId).run();
    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
