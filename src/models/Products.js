
export class Products {
    constructor(title, description, price, code, status, stock, thumbnail) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.code = code,
            this.status = status,
            this.stock = stock,
            this.thumbnail = thumbnail,
            // this.id = id
            this.id = Products.generadorId();
    }

    static usedIds = new Set();


    static generadorId() {
        if (this.idIncrement || this.usedIds.has(this.idIncrement)) {
            this.idIncrement++;
        } else {
            // this.idIncrement = Date.now();
            const num = Date.now();
            const idString = num.toString();
            const firstFourDigits = idString.substring(0, 12);
            const firstFourNumber = parseInt(firstFourDigits);
            this.idIncrement = firstFourNumber;
        }
        this.usedIds.add(this.idIncrement);
        return this.idIncrement;
    }



}


