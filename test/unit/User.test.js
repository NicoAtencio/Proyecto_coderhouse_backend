import { userManager } from "../../src/DAL/DAOs/MongoDAOs/managers/UsersManager.js";
import "../db.js";
import {expect} from "chai";



describe("Get user", () => {
  beforeEach(function () {
    this.timeout(10000);
    // Esto hace que cada test tenga 10 segundos maximo para resolverse, por defecto son 2 segundos. Pero no me esta funcionando
    // en funciones asincronas   
  });

  it('El get debe devolver un arreglo', async function () {
    this.timeout(10000)
    const result = await userManager.findAll();
    expect(result).to.be.an("array");
  });

});

describe('Post user', () => {
  beforeEach(function () {
    this.timeout(10000);
  });
  after(async function(){
    const user = await userManager.findUserByUsername('NicoPrograma');
    await userManager.deleteOne(user._id)
  });
  it('El post debe crear un usuario', async function(){
    this.timeout(10000)
    const user = {
      first_name: 'Nico',
      last_name: 'Programa',
      user_name: 'NicoPrograma',
      password: 'password',
      email: 'programa@gmail.com',
      age: 26
    };
    const newUser = await userManager.createOne(user);
    expect(newUser).to.have.property('_id');
  })
});

describe('Put user', () => {
  before(async function () {
    const user = {
      first_name: 'Nico',
      last_name: 'Programa',
      user_name: 'NicoPrograma',
      password: 'password',
      email: 'programa@gmail.com',
      age: 26
    };
    const newUser = await userManager.createOne(user);
    this.id = newUser._id
  });
  after(async function(){
    const user = await userManager.findUserByUsername('NicoPrograma');
    await userManager.deleteOne(user._id)
  });
  it('Debe devolver el usuario con los datos modificados', async function(){
    const updateUser = {
      first_name: 'Cambiado',
      last_name: 'Otro last name',
      age: 30
    };
    const user = await userManager.updateOne(this.id,updateUser);
    expect(user).to.have.property('first_name').that.equals('Cambiado');
    expect(user).to.have.property('last_name').that.equals('Otro last name');
    expect(user).to.have.property('age').that.equals(30);
  })
});

describe('Delete user', () => {
  before(async function (){
    const user = {
      first_name: 'Nico',
      last_name: 'Programa',
      user_name: 'NicoPrograma',
      password: 'password',
      email: 'programa@gmail.com',
      age: 26
    };
    const newUser = await userManager.createOne(user);
    this.id = newUser._id;
  });
  
  it('No debe encontrarse el usuario que se elimino', async function () {
    await userManager.deleteOne(this.id);
    const user = await userManager.findById(this.id);
    expect(user).to.equal(null);
  });
});

