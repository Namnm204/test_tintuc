// controllers/userController.js

export default class UserController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(req, headers) {
    try {
      const { name, email } = await req.json(); // Lấy dữ liệu từ request body
      await this.userModel.createUser(name, email);
      return new Response(
        JSON.stringify({ message: "User created successfully" }),
        {
          status: 201,
          headers,
        }
      );
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500, headers });
    }
  }

  // Các phương thức khác có thể được thêm vào ở đây...
}
