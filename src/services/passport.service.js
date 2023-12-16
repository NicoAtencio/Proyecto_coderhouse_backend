import { passportManager } from "../DAL/DAOs/MongoDAOs/managers/PassportManager.mongo.js";
import { compareData } from "../utils.js";
import { cartManager } from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
import { userManager } from "../DAL/DAOs/MongoDAOs/managers/UsersManager.js";

class PassportServices {
  user = async (username, password) => {
    const user = await passportManager.findUserByUsername(username);
    if (!user) return false;
    const isPassword = await compareData(password, user.password);
    if (!isPassword) return false;
    return user;
  };

  userGitHub = async (username) => {
    const user = await passportManager.findUserByUsername(username);
    if (!user) return false;
    return user;
  };

  newUserGitHub = async (obj) => {
    const newCart = await cartManager.createOne();
    // Crea un carro y luego se lo asigna al usuario.
    const user = await passportManager.createOne({ ...obj, cart: newCart });
    return user;
  };

  updateDateConecction = async (id) => {
    await userManager.updateOne(id, { last_connection: Date.now() });
    return true;
  };
}

export const passportServices = new PassportServices();
