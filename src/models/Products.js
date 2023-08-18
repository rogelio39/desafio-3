
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
        if (this.idIncrement && this.usedIds.has(this.idIncrement)) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        this.usedIds.add(this.idIncrement);
        return this.idIncrement;
    }



}