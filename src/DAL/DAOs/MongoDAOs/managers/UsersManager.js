import userModel from "../../../MongoDB/models/users.model.js";
import BasicManager from "./BasicManager.mongo.js";

class UserManager extends BasicManager {
  constructor() {
    super(userModel, "cart");
  }

  async findUserByUsername(username) {
    const user = await userModel.findOne({ user_name: username });
    return user;
  }
}

export const userManager = new UserManager();
