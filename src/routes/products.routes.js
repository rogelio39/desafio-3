import {Router} from "express";
import { ProductsManager } from "../models/productsManager.js";
import { Products } from "../models/Products.js";

const productManager = new ProductsManager();

async function addProduct(prod) {
    const { title, description, price, code, status, stock, thumbnail } = prod;
    const newProduct = new Products(title, description, price, code, status, stock, thumbnail);
    await productManager.addProduct(newProduct);
    return newProduct;
}


const prodsRouter = Router();


prodsRouter.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const { limit } = req.query;
        if (limit) {
            const prod = products.slice(0, limit);
            res.status(200).send(prod);
        } else {
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(500).send('error al cargar productos', error);
    }
})  



prodsRouter.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await productManager.getProductById(parseInt(id));

        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send('Producto no existente');
        }
    } catch (error) {
        res.status(500).send('error', error);
    }
});


prodsRouter.post('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const prod = products.find((product) => product.code === req.body.code);

        if (prod) {
            res.status(400).send("producto existente");
        } else {
            await addProduct(req.body);
            res.status(200).send('producto creado con exito');
        }
    } catch (error) {
        res.status(500).send('error', error);
    }
});



export default prodsRouter;