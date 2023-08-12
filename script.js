import { promises as fs } from 'fs';
class ProductsManager {
    constructor() {
        this.products = [];
        this.usedIds = new Set();
        this.filePath = './productos.json';
        this.writeProducts();
        this.readProducts();
    }

    async writeProducts() {
        const datos = JSON.stringify(this.products, null, 4);
        await fs.writeFile(this.filePath, datos, 'utf8');
    }

    async readProducts() {
        try {
            const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            this.products = data;
            this.products.forEach(producto => this.usedIds.add(producto.id));
            return this.products;
        } catch (error) {
            if (error) {
                this.products = [];
                this.usedIds = new Set();
            }
        }
    }

    async addProduct(product) {
        try {
            //verificar si existe el producto
            const existingProduct = this.products.find(prod => prod.code === product.code);
            if (existingProduct) {
                throw new Error('el producto ya existe');
            } else {
                this.products.push(product);
                this.usedIds.add(product.id)
                console.log('producto agregado');
                await this.writeProducts();
            }
        } catch (error) {
            console.error('error al agregar el producto');
        }

    }

    async updatedProduct(productId, propertyName, newValue) {
        try {
            const productToUpdate = this.products.find((prod) => prod.id === productId);
            if (!productToUpdate) {
                throw new Error('producto no encontrado');
            } else {
                productToUpdate[propertyName] = newValue;

                const index = this.products.findIndex((prod) => prod.id === productId);
                if (index !== -1) {
                    this.products[index] = productToUpdate;
                    const productos = JSON.stringify(this.products, null, 4)
                    await this.writeProducts();


                }
            }
        } catch (error) {
            console.error('error', error.message);
        }
    }

    async getProductById(id) {
        const productId = this.products.find((prod) => prod.id === id);
        if (productId) {
            console.log('producto encontrado')
            console.log(productId);
        } else {
            console.log('Producto no encontrado');
            return null;
        }


    }

    async getProducts() {
        const products = await this.readProducts();
        console.log(products)
    }

    async deleteProduct(id) {
        try {
            const products = this.products.find((prod) => prod.id === id);
            if (products) {
                const prodsToDelete = this.products.filter(prod => prod.id !== id);
                this.products = prodsToDelete;
                await this.writeProducts();
            }
        } catch (error) {
            console.error('error al eliminar el producto', error.message);
        }
    }
}


class Products {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.code = code,
            this.stock = stock,
            this.thumbnail = thumbnail,
            this.id = Products.generadorId();
    }

    static usedIds = new Set();

    static generadorId() {
        if (this.idIncrement && this.usedIds.has(this.idIncrement)) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        this.usedIds.add(this.idIncrement);
        return this.idIncrement;
    }



}

const productManager = new ProductsManager();
productManager.writeProducts();

const product1 = new Products('Pan Integral', 'Pan con harina integral y mix de semillas', 500, 'ALV100', 10, []);
const product2 = new Products('Pan Blanco', 'Pan blanco con mix de semillas', 600, 'ALV101', 10, []);
const product3 = new Products('Pan de Campo', 'Pan de campo con hierbas', 700, 'ALV102', 10, []);
const product4 = new Products('Pan de masa madre', 'Pan de masa madre tipo hogaza', 800, 'ALV103', 10, []);
const product5 = new Products('Pan de centeno', 'Pan de centeno con semillas de chia', 900, 'ALV104', 10, []);
const product6 = new Products('Pan de Campo', 'Pan de campo con hierbas', 700, 'ALV102', 10, []);

setTimeout(() => {
    productManager.addProduct(product1);
    productManager.addProduct(product2);
    productManager.addProduct(product3);

}, 100)


setTimeout(() => {
    productManager.deleteProduct(2);
}, 200)

setTimeout(() => {
    productManager.updatedProduct(3, 'title', 'pepe');
}, 300)




