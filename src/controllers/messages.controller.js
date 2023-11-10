import { transporter } from "../nodemailer/nodemailer.js";
import { messageServices } from "../services/messages.service.js";
import  config  from "../config.js";

class MessagesControllers{
    sendMail = async (req,res) => {
        try {
            const mail = await messageServices.getMailUser(req.session.passport.user);
            const messageOptions = {
                from: "Hector Atencio",
                to: mail,
                subject: "Restaurar contraseña",
                html: `
                    <h3>Hacé click en el siguiente link para restaurar tu contraseña</h3>
                    <a href= "http://localhost:${config.port}/resetpassword">Restaurar contraseña</a>`
            }  
            await transporter.sendMail(messageOptions);
            res.send(`<h2>Ingresá al link enviado al mail para restaurar tu contraseña, para ello no debes cerrar sesion.</h2>`);
        } catch (error) {
            res.status(500).json({message:error})
        }
    }

    resetPassword = async (req,res) => {
        if(!req.session.passport.user){
            return res.status(400).json({message: 'needs to log in'});
        }
        try {
            const editePassword = await messageServices.newPassword({passwords : req.body, id:req.session.passport.user});
            if(!editePassword){
                return res.status(400).json({message:'Incorrect password'});
            };
            res.status(200).json({message:`Cambio de contraseña con exito`})
        } catch (error) {
            res.stauts(500).json({message:error})
        }

    }
};

export const messagesControllers = new MessagesControllers();