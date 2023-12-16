export default class CustomError{
    static createError(message){
        const error = new Error();
        throw error;
    }
}
