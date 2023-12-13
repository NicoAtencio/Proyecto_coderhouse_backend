export class UserDTO {
    constructor(arr){
        this.obj = arr
    }

    getUsers(){
        return this.obj.map((user) => {
            return {id:user._id , name: `${user.first_name} ${user.last_name}`,email:user.email, age:user.age, role: user.role} });
    }
}