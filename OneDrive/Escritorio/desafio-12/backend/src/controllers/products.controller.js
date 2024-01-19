import { productModel } from "../models/products.models.js";

export const getProducts = async (req, res) => {
    const { limit, page, filter, sort } = req.query;

    const pag = page ? page : 1;
    const lim = limit ? limit : 10;
    const ord = sort == 'asc' ? 1 : -1;

    try {
        const products = await productModel.paginate({ filter: filter }, { limit: lim, page: pag, sort: { price: ord } });
        if (products) {
            res.status(200).send(products);
        } else {
            res.status(404).send({ error: 'productos no encontrados' });
        }
    } catch (error) {
        res.status(500).send({ error: `error en consultar productos ${error}` });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({ error: 'producto no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ error: `error en consultar producto ${error}` });
    }

}

export const postProduct = async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;

    try {
        const product = await productModel.create({ title, description, code, price, stock, category });
        if (product) {
            res.status(201).send(product);
        } else {
            res.status(400).send({ error: 'error en crear producto' });
        }

    } catch (error) {
        //este error code es de llave duplicada
        if (error.code == 11000) {
            res.status(400).send({ error: 'producto ya creado con llave duplicada' });
        } else {
            res.status(500).send({ error: `error en crear producto ${error}` });
        }
    }

}



export const putProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, stock, category } = req.body;

    try {
        const product = await productModel.findByIdAndUpdate(id, { title, description, code, price, stock, category });
        if (product) {
            res.status(201).send(product);
        } else {
            res.status(400).send({ error: 'error en actualizar producto' });
        }

    } catch (error) {
        res.status(500).send({ error: `error en actualizar producto ${error}` });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findByIdAndDelete(id);
        if (product) {
            res.status(201).send(product);
        } else {
            res.status(400).send({ error: 'error en eliminar producto' });
        }
    } catch (error) {
        res.status(500).send({ error: `error en eliminar producto ${error}` });
    }

}
