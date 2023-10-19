class LoginController {

  grantAccess (req,res) {
    const { username } = req.body;
    res.redirect(`/products?username=${username}`);
  };

};

export const loginController = new LoginController();
