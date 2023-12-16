import CustomError from "../errors/CustomError.js";
import { errorMessagges } from "../errors/error.enum.js";
import { userService } from "../services/users/users.services.js";
import socketServer from "../app.js";
import { transporter } from "../nodemailer/nodemailer.js";

class UserController {
  async findUsers (req,res) {
    try {
      const users = await userService.allUsers();
      res.status(200).json({users});
    } catch (error) {
      res.status(500).json({message:error})
    }
  }

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
      return res.redirect("/signup");
    }
    try {
      const user = await userService.newUser(req.body);
      if (!user) {
        return res.status(400).json({ message: "Username not valid" });
      }
      // Si no se crea con exito es porque ya existe un usuario con dicho username
      return res.status(200).json({message: 'User created', user});
      // res.redirect(`/login?username=${user_name}`);
    } catch (error) {;
      CustomError.createError(errorMessagges.USER_NOT_CREATED);
    }
  };

  async newRole(req,res){
    try {
      const user = await userService.changeRole(req.body);
      if(!user){
        return res.status(400).json({message:'User not found'});
      }
      const users = await userService.allUsers();
      socketServer.emit('users', users)
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({message:error})
    }
  };

  async deleteUsersByTime(req,res){
    try {
      const users = await userService.deleteUsersByConnect();
      for(let user of users){
        const messageOptions = {
          from: 'Hector Atencio',
          to: user.email,
          subject: 'Usuario eliminado',
          html: `
            <h2>Su usuario a sido eliminado por inactividad.</h2>`
        }
        await transporter.sendMail(messageOptions);
      }
      res.status(200).json({message: 'Users deleted', users});
    } catch (error) {
      res.status(500).json({message:error})
    }
  }

  async deleteUser (req,res){
    const {uid} = req.params;
    try {
      const user = await userService.deleteUserById(uid);
      if(!user){
        return res.status(400).json({message: 'Incorrect ID'});
      }
      const messageOptions = {
        from: 'Hector Atencio',
        to: user.email,
        subject: 'Usuario eliminado',
        html: `
          <h2>Su usuario de la app de proyecto final en Coderhouse a sido eliminado por un administrador.</h2>`
      }
      await transporter.sendMail(messageOptions);
      const users = await userService.allUsers();
      socketServer.emit('users', users);
      res.status(200).json({message:'User deleted', user});
    } catch (error) {
      res.status(500).json({message:error})
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
