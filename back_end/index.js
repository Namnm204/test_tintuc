import { handleOptions } from "./src/methods/handleOptions";
import { handleGet } from "./src/methods/handleGet";
import { handlePost } from "./src/methods/handlePost";
import { handleGetById } from "./src/methods/handleGetById";
import { handleDelete } from "./src/methods/handleDelete";
import { handleLogin } from "./src/methods/handleLogin";
import { handlePostBanner } from "./src/banner/handlePostBanner";
import { GetBanner } from "./src/banner/Get";
import { handleDeleteBanner } from "./src/banner/Dete";

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

    // Handle DELETE request for banners with an ID in the path
    if (request.method === "DELETE" && url.pathname.startsWith("/banners/")) {
      return handleDeleteBanner(request, env);
    }
    if (request.method === "DELETE" && url.pathname.startsWith("/")) {
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
