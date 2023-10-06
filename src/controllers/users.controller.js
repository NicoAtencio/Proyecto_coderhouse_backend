import { newUser } from "../services/users.services.js";

export const createUser = async (req,res) => {
    const {first_name,last_name,user_name,email,age,password} = req.body;
    if(!first_name || !last_name || !user_name || !email || !age || !password){
        return res.redirect('/signup');
    };
    try {
        const user = await newUser(req.body);
        if(!user){
            return res.status(400).json({message:'Username not valid'});
        }
        // Si no se crea con exito es porque ya existe un usuario con dicho username
        res.redirect(`/login?username=${user_name}`);
    } catch (error) {
        res.status(500).json({message:error})
    }
};

export const destroySession = (req,res)=> {
    req.session.destroy(err => {
        if(err) res.status(500).json({message: 'Logout failed'});
        res.redirect('/login');
    })
};

export const allowAccess = (req,res) => {
    const username=req.user.user_name
    res.redirect(`/products?username=${username}`);
};