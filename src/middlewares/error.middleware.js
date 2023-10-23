export const errorMiddleware = (error,req,res) => {
    console.log('Entro al error')
    res.send({
        status: 'Error',
        message: error.message
    })
};