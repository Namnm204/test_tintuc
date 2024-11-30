// src/functions/handleLogin.js
export async function handleLogin(env, req) {
  try {
    const { email, password } = await req.json(); // Lấy thông tin email và password từ request body

    // Kiểm tra nếu không có email hoặc password
    if (!email || !password) {
      return new Response("Email và mật khẩu là bắt buộc", { status: 400 });
    }

    // Truy vấn người dùng từ cơ sở dữ liệu D1
    const { results } = await env.D1.prepare(
      "SELECT * FROM users WHERE email = ?"
    )
      .bind(email)
      .all();

    if (results.length === 0) {
      return new Response("Người dùng không tồn tại", { status: 404 });
    }

    const user = results[0];

    // Kiểm tra mật khẩu (giả sử mật khẩu đã được mã hóa)
    if (user.password !== password) {
      return new Response("Mật khẩu không hợp lệ", { status: 401 });
    }

    // Không tạo token, chỉ trả về thông báo đăng nhập thành công
    return new Response(
      JSON.stringify({ message: "Đăng nhập thành công", user }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Cho phép CORS
          "Access-Control-Allow-Methods": "GET, POST, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return new Response(`Lỗi: ${error.message}`, { status: 500 });
  }
}
