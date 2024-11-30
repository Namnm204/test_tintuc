// models/userModel.js

export default class UserModel {
  constructor(db) {
    this.db = db;
  }

  async createUser(name, email) {
    return await this.db
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .bind(name, email)
      .run();
  }

  // Các phương thức khác có thể được thêm vào ở đây...
}
