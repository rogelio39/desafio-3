import express from "express";
import { ProductsManager } from "./models/productsManager.js";
import { Products } from "./models/Products.js";

const PORT = 4000;

const app = express();

app.use(express.json());

const product1 = new Products('Pan Integral', 'Pan con harina integral y mix de semillas', 500, 'ALV100', 10, []);
const product2 = new Products('Pan Blanco', 'Pan blanco con mix de semillas', 600, 'ALV101', 10, []);
const product3 = new Products('Pan de Campo', 'Pan de campo con hierbas', 700, 'ALV102', 10, []);
const product4 = new Products('Pan de masa madre', 'Pan de masa madre tipo hogaza', 800, 'ALV103', 10, []);
const product5 = new Products('Pan de centeno', 'Pan de centeno con semillas de chia', 900, 'ALV104', 10, []);


async function addProductos(prod) {
    const prodManager = new ProductsManager();

    prodManager.addProduct(prod);

    return await prodManager.getProducts();

}

async function productos() {
    const prodManager = new ProductsManager();

    prodManager.addProduct(product1);
    prodManager.addProduct(product2);
    prodManager.addProduct(product3);
    prodManager.addProduct(product4);
    prodManager.addProduct(product5);


    return await prodManager.getProducts();
}





app.get('/', (req, res) => {
    res.send('inicio')
})

app.get('/products', async (req, res) => {
    try {
        productos();
        const products = await products();
        addProductos();
        const products2 = await addProductos();
        const { limit } = req.query;
        console.log(req.query);
        if (limit) {
            const prod = products.slice(0, limit);
            res.send(prod);
        } else {
            res.status(200).send(products);
            console.log(products)
            console.log(products2);
        }
    } catch (error) {
        res.status(404).send('error al cargar productos');
    }

})

app.get('/products/:id', async (req, res) => {
    try {
        await addProductos();
        const prodManager = productsManagerInstance();
        const products = await prodManager.getProducts();

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

app.post('/products', async (req, res) => {
    addProductos();
    const prodManager = await productsManagerInstance();
    const products = await prodManager.getProducts();
    const producto = products.find(prod => prod.code === req.body.code);
    if (producto) {
        res.status(400).send('producto ya existente');
    } else {
        prodManager.addProduct(req.body);
        res.status(200).send('Producto creado');
    }
})



app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
})