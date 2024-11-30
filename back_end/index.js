import { handleOptions } from "./src/methods/handleOptions";
import { handleGet } from "./src/methods/handleGet";
import { handlePost } from "./src/methods/handlePost";
import { handleDelete } from "./src/methods/handleDelete";
import { handleGetById } from "./src/methods/handleGetById";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle OPTIONS request (CORS)
    if (request.method === "OPTIONS") {
      return handleOptions();
    }

    // Handle GET request for all items (e.g., /tintucs)
    if (request.method === "GET" && !url.pathname.includes("/tintucs/")) {
      return handleGet(env);
    }

    // Handle GET request for specific item by ID (e.g., /tintucs/:id)
    if (request.method === "GET" && url.pathname.includes("/tintucs/")) {
      return handleGetById(env, request);
    }

    // Handle DELETE request
    if (request.method === "DELETE") {
      return handleDelete(request, env);
    }

    // Handle POST request
    if (request.method === "POST") {
      return handlePost(request, env);
    }

    // If the method is not allowed
    return new Response("Method not allowed", { status: 405 });
  },
};
