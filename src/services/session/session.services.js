import {sessionManager} from "../../DAL/DAOs/MongoDAOs/managers/SessionManager.mongo.js";
import SessionDTO from "./session.dto.js";

class SessionServices{

    dateUser = async (id) => {
            const data = await sessionManager.findById(id);
            const user = new SessionDTO(data);
            const response = user.getData();
            return response;
    };

};

export const sessionServices = new SessionServices();