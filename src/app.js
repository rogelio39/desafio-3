import express from "express";
import { ProductsManager } from "./models/productsManager.js";
import { Products } from "./models/Products.js";

const PORT = 4000;

const app = express();
app.use(express.json());

const productManager = new ProductsManager(); // Crear una única instancia de ProductsManager


function addProduct(prod) {
    const newProduct = new Products(prod.title, prod.description, prod.price, prod.code, prod.stock, prod.thumbnail);
    productManager.addProduct(newProduct);


}



app.get('/', (req, res) => {
    res.send('inicio')
})

app.get('/products', async (req, res) => {
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

app.get('/products/:id', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const prod = products.find((product) => product.id === parseInt(req.params.id));

        if (prod) {
            res.status(200).send(prod);
        } else {
            res.status(404).send('Producto no existente');
        }
    } catch (error) {
        res.status(500).send('error', error);
    }
});

app.post('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const prod = products.find((product) => product.code === req.body.code);

        if (prod) {
            res.status(400).send("producto existente");
        } else {
            addProduct(req.body);
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(500).send('error', error);
    }
});

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});
