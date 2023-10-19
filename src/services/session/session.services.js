import {sessionManager} from "../../DAL/DAOs/MongoDAOs/managers/SessionManager.mongo.js";
import SessionDTO from "./session.dto.js";

class SessionServices{

    dateUser = async (id) => {
        try {
            const data = await sessionManager.findById(id);
            const user = new SessionDTO(data)
            const response = user.getData();
            return response;
        } catch (error) {
            return error;
        }
    };

};

export const sessionServices = new SessionServices();