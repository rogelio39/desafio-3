
import { promises as fs } from 'fs';

export class Cart {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.id = Cart.generadorId();
    }   
    
    
    static generadorId() {
        if (this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement;
    }

    async createCart() {
        const datos = JSON.stringify({idCart: this.id, productsCart: this.products}, null, 4);
        await fs.writeFile(this.path, datos, 'utf8');
    }

    async writeFile() {
        const datos = JSON.stringify(this.products, null, 4);
        await fs.writeFile(this.path, datos, 'utf8');
    }

    async readProducts() {
        try {
            const data = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            this.products = data;
            return this.products;
        } catch (error) {
            if (error) {
                this.products = [];
            }
        }
    }

    async addProduct(product) {
            try {
                const {id, quantity} = product;
                // Verificar si existe el producto
                const existingProductIndex = this.products.productsCart.findIndex(prod => prod.id === id);
        
                if (existingProductIndex !== -1) {
                    // Producto ya existe, aumentar cantidad
                    this.products.productsCart[existingProductIndex].quantity++;
                    await this.writeFile();
                } else {
                    // Producto no existe, agregarlo al array
                    this.products.productsCart.push({id : id, quantity: quantity});
                    console.log('Producto agregado');
                    await this.writeFile();

                }
            } catch (error) {
                console.error('Error al agregar el producto');
            }
        

    }

    async getCartById(id) {
        if (this.usedIds.has(id)) {
            console.log('carrito encontrado')
            console.log(this.products);
        } else {
            console.log('carrito no encontrado');
            return null;
        }
    }


    async getProducts() {
        const products = await this.readProducts();
        const productId = products.productsCart;
        return productId;
    }

}








