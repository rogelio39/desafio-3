import {Router} from "express";
import { Cart } from "../models/cart.js";
import { ProductsManager } from "../models/productsManager.js";

const cartRouter = Router();
const productManager = new ProductsManager();
const cart = new Cart('./cart.json');


cartRouter.post('/', async (req, res) => {
    try {
        await cart.createCart();
        const newCart = await cart.getProducts();
        res.status(200).send(`Carrito creado con exito ${JSON.stringify(newCart, null, 4)}`);
    } catch (error) {
        res.status(500).send('error');
    }
});


cartRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const idCart = cart.id;
        if(idCart === parseInt(cid)){
            res.status(200).send(await cart.getProducts());
        } else {
            res.status(404).send('not found');
        }
        } catch (error) {
        res.status(500).send('error al cargar productos');
    }
})  




cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const newProduct = {id: pid, quantity: 1};
        const productsBaseData = await productManager.getProducts();
        const idProduct = productsBaseData.find(prod => prod.id === parseInt(pid));
        const products = await cart.getProducts();
        const product = products.find(prod => prod.id === idProduct.id);
        if (product) {
            await cart.addProduct(product);
            res.status(400).send(`cantidad de producto actualizado a ${product.quantity}`);
        } else {
            await cart.addProduct(newProduct);
            res.status(200).send('producto creado con exito');
        }
    } catch (error) {
        res.status(500).send('error');
    }
});





export default cartRouter;