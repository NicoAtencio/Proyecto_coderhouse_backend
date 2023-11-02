import { logger } from "../winston/winston.js";

class LoggerController {
    getLoggers = (req,res) => {
        logger.fatal('fatal');
        logger.error('error');
        logger.warning('warning');
        logger.info('info');
        logger.http('http');
        logger.debug('debug');
        res.send({message: 'Test logger'})
    }
}

export const loggerController = new LoggerController(); 