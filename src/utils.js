import {dirname} from 'path';
import { fileURLToPath } from 'url';

export const validar = (obj) => {
    return obj.title && obj.description && obj.code && obj.price && obj.status && obj.stock && obj.category
}
// Función para validar que todos los campos obligatorios sean enviados en el cuerpo de la petición.

export const __dirmane = dirname(fileURLToPath(import.meta.url));



