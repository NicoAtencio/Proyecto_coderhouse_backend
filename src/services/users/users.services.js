import { userManager } from "../../DAL/DAOs/MongoDAOs/managers/UsersManager.js";
import { hashData } from "../../utils.js";
import { cartManager } from "../../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
import { UserDTO } from "./users.dto.js";
import moment from "moment";
// import { errorMessagges } from "../errors/error.enum.js";

class UserService {
  async allUsers(){
    const users = await userManager.findAll();
    const response = new UserDTO(users);
    return response.getUsers();
  }

  async newUser(obj) {

      const isUserAlreadyCreated = await userManager.findUserByUsername(
        obj.user_name
      );
      if (isUserAlreadyCreated) return false;
      const hashPassword = await hashData(obj.password);
      const newCart = await cartManager.createOne();
      // Crea un carro nuevo y luego se lo asigna al usuario.
      const response = await userManager.createOne({
        ...obj,
        password: hashPassword,
        cart: [newCart._id],
      });
      return response;
      
  };

  async deleteUsersByConnect(){
    const users = await userManager.findAll();
    const currentTime = moment();
    const usersToDelete = users.filter(user => {
      const lastConnection = moment(user.last_connection);
      const differenceInHours = currentTime.diff(lastConnection,'hours');
      return differenceInHours > 48
      // Hace que se eliminen los usuarios que hace mas de 48 horas no ingresan a la app.
    });
    for(let user of usersToDelete){
      await userManager.deleteOne(user._id);
      const cart = user.cart;
      await cartManager.deleteOne(cart);
    }
    return usersToDelete;
  }

  async changeRole(obj){
    const user = await userManager.updateOne(obj.id,{role:obj.role});
    return user;
  }

  async deleteUserById (id) {
    const user = await userManager.deleteOne(id);
    const cart = user.cart;
    await cartManager.deleteOne(cart);
    return user;
  }
}

export const userService = new UserService();
