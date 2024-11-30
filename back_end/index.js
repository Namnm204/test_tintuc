export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handling CORS for all requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method === "GET") {
      try {
        const { results } = await env.D1.prepare("SELECT * FROM users").all();
        return new Response(JSON.stringify(results), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    } else if (request.method === "DELETE") {
      const userId = url.pathname.split("/")[1]; // Extract user ID from the URL

      try {
        await env.D1.prepare("DELETE FROM users WHERE id = ?")
          .bind(userId)
          .run();

        return new Response("User deleted successfully", { status: 200 });
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }

    // Other methods
    return new Response("Method not allowed", { status: 405 });
  },
};
