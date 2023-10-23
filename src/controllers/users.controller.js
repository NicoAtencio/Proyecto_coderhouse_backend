import CustomError from "../errors/CustomError.js";
import { errorMessagges } from "../errors/error.enum.js";
import { userService } from "../services/users.services.js";

class UserController {
  async createUser(req, res,next) {
    const { first_name, last_name, user_name, email, age, password } = req.body;
    if (
      !first_name ||
      !last_name ||
      !user_name ||
      !email ||
      !age ||
      !password
    ) {
      // throw new CustomError (errorMessagges.USER_NOT_CREATED);
      // return res.redirect("/signup");
    }
    try {
      const user = await userService.newUser(req.body);
      if (!user) {
        return res.status(400).json({ message: "Username not valid" });
      }
      // Si no se crea con exito es porque ya existe un usuario con dicho username
      res.redirect(`/login?username=${user_name}`);
    } catch (error) {
      next(error);
      // console.log('Error des controlador: ', error);
      // CustomError.createError(errorMessagges.USER_NOT_CREATED);
      // throw new CustomError(errorMessagges.USER_NOT_CREATED)
    }
  }

  async destroySession(req, res) {
    req.session.destroy((err) => {
      if (err) res.status(500).json({ message: "Logout failed" });
      res.redirect("/login");
    });
  }

  async allowAccess(req, res) {
    const username = req.user.user_name;
    res.redirect(`/products?username=${username}`);
  }
}

export const userController = new UserController();
