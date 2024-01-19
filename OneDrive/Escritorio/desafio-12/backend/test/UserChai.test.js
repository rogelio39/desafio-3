import { expect } from 'chai';
import mongoose from "mongoose";
import { userModel } from "../src/models/users.models.js";
import { createHash } from '../src/utils/bcrypt.js';


await mongoose.connect("mongodb+srv://andresrogesu:Lour1618@cluster0.lwz3su9.mongodb.net/?retryWrites=true&w=majority");

const expectChai = expect;

let password = '1234';

describe('test CRUD Users con chai en api/users', function () {
    this.timeout(5000);
    //previo a comenzar todo el test
    before(() => {
        console.log("arrancando el test");
    })
    //previo a arrancar cada uno de los tests
    beforeEach(() => {
        console.log("comienza test")
    })

    it('obtener todos los usuarios mediante metodo GET', async () => {
        const users = await userModel.find();
        expectChai(users).not.to.be.equal([]);
    })

    it('Obtener un usuario mediante metodo get', async () => {
        const user = await userModel.findById("FIJARSE UN ID QUE EXISTA");
        expectChai(user).to.have.property('_id')

    })

    it('crear un usuario mediante metodo POST', async () => {
        const newPassword = createHash(password);
        //CHEQUEAR QUE EL USUARIO NO EXISTA
        const newUser = {
            first_name: "ramiro",
            last_name: "perez",
            email: "ramiro@ramiro122.com",
            age: 20,
            password: newPassword
        }
        const user = await userModel.create(newUser);
        expectChai(user).to.have.property('_id');

    })

    it('Actualizar un usuario mediante metodo PUT', async () => {
        password = '123456'
        const passwordHash = createHash(password)
        const updateUser = {
            first_name: "ramiro ",
            last_name: "perez",
            email: "ramiro@ramiro11.com",
            age: 22,
            password: passwordHash
        }
        const user = await userModel.findByIdAndUpdate("FIJARSE UN ID VALIDO", updateUser);
        expectChai(user).to.have.property('_id');
    })

    it('Eliminar un usuario mediante metodo DELETE', async () => {

        const resultado = await userModel.findByIdAndDelete('BUSCAR UN ID QUE EXISTA');

        expectChai(resultado).to.be.ok
    })

})
