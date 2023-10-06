export const grantAccess = (req,res) => {
    const {username} = req.body;
    res.redirect(`/products?username=${username}`);
}