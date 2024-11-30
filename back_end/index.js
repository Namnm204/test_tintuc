import { handleOptions } from "./src/methods/handleOptions";
import { handleGet } from "./src/methods/handleGet";
import { handlePost } from "./src/methods/handlePost";
import { handleDelete } from "./src/methods/handleDelete";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Xử lý yêu cầu OPTIONS (CORS)
    if (request.method === "OPTIONS") {
      return handleOptions();
    }

    // Xử lý yêu cầu GET
    if (request.method === "GET") {
      return handleGet(env);
    }

    // Xử lý yêu cầu DELETE
    if (request.method === "DELETE") {
      return handleDelete(request, env);
    }

    // Xử lý yêu cầu POST
    if (request.method === "POST") {
      return handlePost(request, env);
    }

    // Nếu phương thức không hợp lệ
    return new Response("Method not allowed", { status: 405 });
  },
};
