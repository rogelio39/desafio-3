import express from "express";
import { ProductsManager } from "./models/productsManager.js";
import { Products } from "./models/Products.js";

const PORT = 4000;

const app = express();

const product1 = new Products('Pan Integral', 'Pan con harina integral y mix de semillas', 500, 'ALV100', 10, []);
const product2 = new Products('Pan Blanco', 'Pan blanco con mix de semillas', 600, 'ALV101', 10, []);
const product3 = new Products('Pan de Campo', 'Pan de campo con hierbas', 700, 'ALV102', 10, []);
const product4 = new Products('Pan de masa madre', 'Pan de masa madre tipo hogaza', 800, 'ALV103', 10, []);
const product5 = new Products('Pan de centeno', 'Pan de centeno con semillas de chia', 900, 'ALV104', 10, []);


async function productos() {
    const productManager = new ProductsManager();

    productManager.addProduct(product1);
    productManager.addProduct(product2);
    productManager.addProduct(product3);
    productManager.addProduct(product4);
    productManager.addProduct(product5);

    return await productManager.getProducts();
}


app.get('/', (req, res) => {
    res.send('inicio')
})

app.get('/products', async (req, res) => {
    try {
        productos();
        const products = await productos();

        const { limit } = req.query;
        console.log(req.query);
        if (limit) {
            const prod = products.slice(0, limit);
            res.send(prod);
        } else {
            res.send(products);
        }
    } catch (error) {
        res.status(500).send('error al cargar productos', error);
    }

})

app.get('/products/:id', async (req, res) => {
    try {
        productos();
        const products = await productos();
        const prod = products.find((product) => product.id === parseInt(req.params.id));

        if (prod) {
            res.send(prod);
        } else {
            res.send('Producto no existente');
        }
    } catch (error) {
        res.status(500).send('error', error);
    }


}
);



app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
})