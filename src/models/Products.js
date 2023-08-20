
export class Products {
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
        let newId = this.idIncrement || 1;
        
        while (this.usedIds.has(newId)) {
            newId++;
        }
        
        this.usedIds.add(newId);
        this.idIncrement = newId;
        return newId;
    }



    }
