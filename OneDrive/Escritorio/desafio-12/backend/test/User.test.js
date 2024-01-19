import mongoose from "mongoose";
import {userModel} from "../src/models/users.models.js";
import Assert from 'assert';
import { createHash } from "crypto";


const assert = Assert.strict;

let password = '1234';



// mongoose.connect(process.env.MONGO_URL)
//     .then(async () => {
//         console.log('DB is connected');

//     }).catch(() => console.log('error en conexion a DB'));
await mongoose.connect("mongodb+srv://andresrogesu:Lour1618@cluster0.lwz3su9.mongodb.net/?retryWrites=true&w=majority");


describe('Test CRUD de usuarios en la ruta api/users', function() {
    //previo a comenzar todo el test
    before(  () => {
        console.log("arrancando el test");
    })

    //previo a arrancar cada uno de los tests
    beforeEach( () => {
        console.log("comienza test")
    })

    it('btener todos los usuarios mediante metodo GET', async () => {
        const users = await userModel.find();
        assert.strictEqual(Array.isArray(users), true);
    })

    it('Obtener un usuario mediante metodo get', async() => {
        const user = await userModel.findById("BUSCAR UN ID QUE EXISTA");
        assert.ok(user._id);

    })

    
    it('crear un usuario mediante metodo POST', async() => {
        const passwordHash = createHash(password)
        //FIJARSE QUE EL USUARIO EXISTA
        const newUser = {
            first_name : "ramiro",
            last_name : "perez",
            email: "ramiro@ramiro2021.com",
            age: 20,
            password: passwordHash
        }
        const user = await userModel.create(newUser);
        console.log(user);
        assert.ok(user._id);

    })

    it('Actualizar un usuario mediante metodo PUT', async() => {
        password = '12345'
        const passwordHash = createHash(password);
        const updateUser = {
            first_name : "ramiro andres",
            last_name : "perez",
            email: "ramiro@ramiro1.com",
            age: 22,
            password: passwordHash
        }
        const user = await userModel.findByIdAndUpdate("id del usuario a actualizar", updateUser);
        assert.ok(user._id);

    })

    it('Eliminar un usuario mediante metodo DELETE', async() => {

        const resultado = await userModel.findByIdAndDelete("id del usuario a eliminar");
        assert.strictEqual(typeof resultado, 'object');

    })




});
