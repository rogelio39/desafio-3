import { expect } from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { createHash } from '../src/utils/bcrypt.js';

await mongoose.connect("mongodb+srv://andresrogesu:Lour1618@cluster0.lwz3su9.mongodb.net/?retryWrites=true&w=majority");

const expectChai = expect;

const requester = supertest('http://localhost:4000');


let cookie = {};



//test para  sesiones

describe('Test User  Session api/sessions', function () {
    this.timeout(10000);

    it("Ruta: api/sessions/register con metodo POST", async () => {
        const newPassword = createHash('12345');
        const newUser = {
            first_name: "ramiro",
            last_name: "perez",
            email: "ramiro@dddsaddkdk.com",
            age: 20,
            password: newPassword
        }


        const {statusCode, _body} = await requester.post('/api/sessions/register').send(newUser);

        expect(_body.mensaje).to.be.equal('User created');
        expect(statusCode).to.be.equal(200)

    })


    it('Ruta api/sessions/login con metodo POST', async() => {

        const user = {
            email:"roge@coder.com",
            password : "1234"
        }


        const resultado = await requester.post('/api/sessions/login').send(user);

        const cookieResult = resultado.headers['set-cookie'][0];

        expect(cookieResult).to.be.ok;

        cookie = {
            name: cookieResult.split("=")[0],
            value: resultado._body.token
        }
        expect(cookie.name).to.be.ok.and.equal('jwtCookie');
        expect(cookie.value).to.be.ok;
    })


    
    it('Ruta api/sessions/current con metodo GET', async() => {

        const {statusCode, _body} = await requester.get('/api/sessions/current').set('authorization', `${cookie.value}`);

        expect(_body.user.email).to.be.equal('roge@coder.com');
        expect(statusCode).to.be.equal(200);

    })
    

})



// //test para productos
describe('test CRUD de la ruta productos de api/products', function () {
    this.timeout(10000);
    it('Ruta: api/products metodo GET', async () => {

        const { ok } = await requester.get('/api/products');
        expectChai(ok).to.be.ok;
    })

    it('Ruta: api/products metodo POST', async () => {
        const newProduct = {
            title: 'Pan prueba supertest100000',
            description: 'prueba de creacion producto para supertest1sasadsa00',
            code: '100asds00',
            price: 200,
            stock: 100,
            category: 'panes'
        }



        const { statusCode, _body, ok } = await requester.post('/api/products').set('authorization', `${cookie.value}`).send(newProduct);

        //consultar por los tres valores para ver si el test pasa o no

        expectChai(statusCode).to.be.equal(201);
        expectChai(_body.status).to.be.equal(true);
        expectChai(ok).to.be.ok;

    })

    it('Ruta: api/products metodo PUT', async () => {
        const id = '659c9b92277ed581d5263f0e'
        const productUpdate = {
            title: 'Pan  ad',
            description: 'prueba cdon ',
            code: 'ab',
            price: 200,
            stock: 10,
            category: 'panes'
        }

        const { statusCode } = await requester.put(`/api/products/${id}`).set('authorization', `${cookie.value}`).send(productUpdate);

        expectChai(statusCode).to.be.equal(201);
    })

    it('Ruta: api/products metodo DELETE', async () => {
        const id = '659c9f366db819dc7952c5f9'
        const { statusCode } = await requester.delete(`/api/products/${id}`).set('authorization', `${cookie.value}`);

        expectChai(statusCode).to.be.equal(201);
    })

})


// test para carts

describe('test CRUD de la ruta carts de api/carts', function () {
    this.timeout(5000);

    it('Ruta: api/carts metodo POST', async () => {
        const cid = '65453f25e16d6efa1e994572';
        const pid = '659c9b92277ed581d5263f0e';

        const { statusCode, ok, _body } = await requester.post(`/api/carts/${cid}/product/${pid}`).set('authorization', `${cookie.value}`).send({ quantity: 1 });

        expectChai(ok).to.be.equal(true);
        expectChai(_body.respuesta).to.be.equal('ok');
        expectChai(statusCode).to.be.equal(200);
    })



})