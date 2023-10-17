export default class SessionDTO{
    constructor(obj){
        this.first_name= obj.first_name;
        this.last_name= obj.last_name;
        this.email= obj.email;
        this.cart = obj.cart; 
        this.id = obj._id
    }
    
    getData (){
        return {first_name:this.first_name,last_name:this.last_name,email:this.email,id:this.id,cart:this.cart}
    }
}