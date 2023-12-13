import chai from "chai";
import supertest from "supertest";
import config from "../../src/config.js";
// import { userManager } from "../../src/DAL/DAOs/MongoDAOs/managers/UsersManager.js";


const expect = chai.expect;
const requester = supertest(`http://localhost:${config.port}`);

let idUser;

describe('Testing usuarios', () => {
    describe('Post de usuarios', () => {
        it('El endpoint POST /api/users/signup debe crear un usuario', async function(){
            this.timeout(10000)
            const user = {
                first_name: 'Nico',
                last_name: 'Programa',
                user_name: 'NicoPrograma',
                password: 'password',
                email: 'programa@gmail.com',
                age: 26
            };
            const response = await requester.post('/api/users/signup').send(user);
            idUser = response._body.user._id;
            expect(response._body.user).to.have.property('_id');
        })
    });

    describe('Delete de usuarios', () => {
        it('El endpont DELETE /:uid debe eliminar un usuario y devolverlo', async function () {
            this.timeout(10000)
            const response = await requester.delete(`/api/users/${idUser}`);
            expect(response._body.user).to.have.property('_id');

        })
    });

    
})