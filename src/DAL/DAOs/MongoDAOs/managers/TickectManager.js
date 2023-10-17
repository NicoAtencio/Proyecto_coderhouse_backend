import BasicManager from "./BasicManager.mongo.js";
import {ticketModel} from "../../../MongoDB/models/ticket.model.js"

class TicketManager extends BasicManager{
    constructor(){
        super(ticketModel)
    }
}

export const ticketManager = new TicketManager();