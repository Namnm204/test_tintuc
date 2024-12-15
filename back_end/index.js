import { handleDeleteBanner } from "./src/controller/banner/Dete";
import { GetBanner } from "./src/controller/banner/Get";
import { handlePostBanner } from "./src/controller/banner/handlePostBanner";
import { handleLogin } from "./src/controller/handleLogin";
import { handleDelete } from "./src/controller/tintucs/handleDelete";
import { handleGet } from "./src/controller/tintucs/handleGet";
import { handleGetBySlug } from "./src/controller/tintucs/handleGetById";
import { handlePost } from "./src/controller/tintucs/handlePost";
import { handlePut } from "./src/controller/tintucs/handlePut";
import { handleOptions } from "./src/methods/handleOptions";

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

    // Handle PUT request for tintucs (update a post)
    if (request.method === "PUT" && url.pathname.startsWith("/tintucs/")) {
      return handlePut(request, env); // Gọi controller PUT
    }

    // Handle GET request for specific item by ID (e.g., /tintucs/:id)
    if (request.method === "GET" && url.pathname.includes("/tintucs/")) {
      return handleGetBySlug(env, request);
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
