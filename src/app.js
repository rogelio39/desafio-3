import express from "express";
import { main } from "../script.js";

const PORT = 4000;

const app = express();


async function productos() {
    return await main();
}



app.get('/', (req, res) => {
    res.send('inicio')
})

app.get('/products', async (req, res) => {
    try {
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