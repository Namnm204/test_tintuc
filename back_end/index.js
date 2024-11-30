export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS handling for all requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Handling GET request
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
        console.error("GET Error:", error);
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }

    // Handling DELETE request
    if (request.method === "DELETE") {
      const userId = url.pathname.split("/")[1]; // Extract user ID from URL

      try {
        await env.D1.prepare("DELETE FROM users WHERE id = ?")
          .bind(userId)
          .run();
        return new Response("User deleted successfully", { status: 200 });
      } catch (error) {
        console.error("DELETE Error:", error);
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }

    // Handling POST request (Add new user)
    if (request.method === "POST") {
      try {
        const requestBody = await request.json(); // Get JSON body
        const { name, email } = requestBody;

        // Validate inputs
        if (!name || !email) {
          return new Response("Missing required fields: name or email", {
            status: 400,
          });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return new Response("Invalid email format", {
            status: 400,
          });
        }

        // Insert new user into the database
        const result = await env.D1.prepare(
          'INSERT INTO users (name, "email ") VALUES (?, ?)'
        )
          .bind(name, email)
          .run();

        return new Response("User added successfully", {
          status: 201,
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

    // If method is not allowed
    return new Response("Method not allowed", { status: 405 });
  },
};
