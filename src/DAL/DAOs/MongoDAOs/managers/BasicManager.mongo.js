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
            throw error;
        }
    };

    async findById(id){
        try {
            const response = await this.model.findById(id).populate(this.populateProp);
            return response;
        } catch (error) {
            throw error;
        }
    };

    async createOne(obj){
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            throw error;
        }
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
            const response = await this.model.findByIdAndUpdate(id,obj,{new:true});
            // Al agregarle new:true retorna el documento modificado.
            return response
        } catch (error) {
            throw error;
        }
    }
}