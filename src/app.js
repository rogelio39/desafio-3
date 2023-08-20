import express from "express";
import { ProductsManager } from "./models/productsManager.js";
import { Products } from "./models/Products.js";

const PORT = 4000;

const app = express();
app.use(express.json());

const productManager = new ProductsManager(); // Crear una única instancia de ProductsManager


function addProduct(prod) {
    const { title, description, price, code, stock, thumbnail } = prod;
    const newProduct = new Products(title, description, price, code, stock, thumbnail);
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

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, price, code, stock, thumbnail } = req.body;
    const products = await productManager.getProducts();

    const productToUpdate = products.find(prod => prod.id === parseInt(id));
    if (productToUpdate) {
        productManager.updatedProduct(parseInt(id), 'title', title);
        productManager.updatedProduct(parseInt(id), 'price', price);
        res.status(200).send(`producto ${title} actualizado`);
    } else {
        res.status(404).send('producto no existente');
    }

})


app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const products = await productManager.getProducts();

    const productToDelete = products.find(prod => prod.id === parseInt(id));
    if (productToDelete) {
        productManager.deleteProduct(parseInt(id));
        res.status(200).send(`producto eliminado`);
    } else {
        res.status(404).send('producto no existente');
    }


}
)

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});
