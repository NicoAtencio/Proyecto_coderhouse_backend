export default class CustomError{
    static createError(message){
        console.log('Entro a la clase de error y el message es: ', message)
        const error = new Error(message);
        throw error;
    }
}