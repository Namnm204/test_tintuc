export async function handleGetById(env, request) {
  try {
    // Extract the 'id' from the URL path
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Assumes the URL is like /tintucs/:id

    // Prepare the SQL query to fetch the news by ID
    const { results } = await env.D1.prepare(
      "SELECT * FROM tintucs WHERE id = ?"
    )
      .bind(id)
      .all();

    // If no result found, return a 404 error
    if (results.length === 0) {
      return new Response("News not found", { status: 404 });
    }

    // Return the specific news data as JSON
    return new Response(JSON.stringify(results[0]), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("GET by ID Error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
