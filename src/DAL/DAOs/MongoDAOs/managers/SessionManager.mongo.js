import userModel from "../../../MongoDB/models/users.model.js";
import BasicManager from "./BasicManager.mongo.js";

class SessionManager extends BasicManager{
    constructor(){
        super(userModel,'cart')
    };
};

export const sessionManager = new SessionManager();