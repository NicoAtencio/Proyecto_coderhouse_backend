export const authMiddleware = (role) => {
    return (req,res,next) => {
        if(req.user.role !== role){ 
            console.log('Esta entrando')
            return res.status(401).json({message:'You are not authorized to access this route'});
        }
        next();
    }
}