export async function handlePost(request, env) {
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
