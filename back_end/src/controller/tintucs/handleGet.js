export async function handleGet(env) {
  try {
    const { results } = await env.D1.prepare("SELECT * FROM tintucs").all();
    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
