import { userManager } from "../DAL/DAOs/MongoDAOs/managers/UsersManager.js";
import { hashData } from "../utils.js";
import { cartManager } from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
// import { errorMessagges } from "../errors/error.enum.js";

class UserService {
  async newUser(obj) {
    // try {
      const isUserAlreadyCreated = await userManager.findUserByUsername(
        obj.user_name
      );
      if (isUserAlreadyCreated) return false;
      // const hashPassword = await hashData(obj.password);
      // const newCart = await cartManager.createOne();
      // Crea un carro nuevo y luego se lo asigna al usuario.
      // const response = await userManager.createOne({
      //   ...obj,
      //   password: hashPassword,
      //   cart: [newCart._id],
      // });
      const response = await userManager.createOne({});
      return response;
    // } catch (error) {
      // console.log('Error del servicio', error)
      // throw error;
    // }
  }
}

export const userService = new UserService();
