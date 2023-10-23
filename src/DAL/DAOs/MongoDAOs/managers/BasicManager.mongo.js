export default class BasicManager{
    constructor(model,populateProp){
        this.model = model;
        this.populateProp = populateProp
    }
    async findAll(){
        try {
            const response = await this.model.find().populate(this.populateProp);
            return response;
        } catch (error) {
            return error;
        }
    };

    async findById(id){
        try {
            const response = await this.model.findById(id).populate(this.populateProp);
            return response;
        } catch (error) {
            return error;
        }
    };

    async createOne(obj){
        // try {
            const response = await this.model.create(obj);
            return response;
        // } catch (error) {
            console.log('Error del manejador base ',error._message)
            throw new Error(error._message);
        // }
    };

    async deleteOne(id){
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            return error
        }
    };

    async updateOne(id,obj){
        try {
            const response = await this.model.findByIdAndUpdate(id,obj);
            return response
        } catch (error) {
            return error;
        }
    }
}