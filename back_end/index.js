import { handleOptions } from "./src/methods/handleOptions";
import { handleGet } from "./src/methods/handleGet";
import { handlePost } from "./src/methods/handlePost";
import { handleDelete } from "./src/methods/handleDelete";
import { handleGetById } from "./src/methods/handleGetById";
import { handleLogin } from "./src/methods/handleLogin";
import { handlePostBanner } from "./src/banner/handlePostBanner";
import { GetBanner } from "./src/banner/Get";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle OPTIONS request (CORS)
    if (request.method === "OPTIONS") {
      return handleOptions();
    }

    // Handle GET request for banners
    if (request.method === "GET" && url.pathname === "/banners") {
      return GetBanner(env);
    }

    // Handle GET request for all items (e.g., /tintucs)
    if (request.method === "GET" && !url.pathname.includes("/tintucs/")) {
      return handleGet(env);
    }

    // Handle GET request for specific item by ID (e.g., /tintucs/:id)
    if (request.method === "GET" && url.pathname.includes("/tintucs/")) {
      return handleGetById(env, request);
    }

    // Handle POST request for login
    if (request.method === "POST" && url.pathname === "/login") {
      return handleLogin(env, request);
    }

    // Handle POST request for banners
    if (request.method === "POST" && url.pathname === "/banners") {
      return handlePostBanner(request, env);
    }

    // Handle DELETE request
    if (request.method === "DELETE") {
      return handleDelete(request, env);
    }

    // Handle POST request for tintucs or other general POST requests
    if (request.method === "POST") {
      return handlePost(request, env);
    }

    // If the method is not allowed
    return new Response("Method not allowed", { status: 405 });
  },
};
