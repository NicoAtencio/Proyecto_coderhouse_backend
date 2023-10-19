import { sessionServices } from "../services/session/session.services.js";

class SessionControllers {
  getData = async (req, res) => {
    if (!req.session.passport) {
      return res.status(400).json({ message: "Please log in to access this feature" });
      // En caso de que no haya un usuario en session no tendrá datos que mostrar.
    }
    try {
      const data = await sessionServices.dateUser(req.session.passport.user);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

};

export const sessionControllers = new SessionControllers();
