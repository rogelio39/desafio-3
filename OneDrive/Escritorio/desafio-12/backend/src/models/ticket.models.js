import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from 'uuid';



const ticketSchema = new Schema({
    code: {
        type: String,
        default : uuidv4(),
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }

})


// ticketSchema.plugin(paginate); //implementar el metodo paginate en el schema

export const ticketModel = model('tickets', ticketSchema); //userModel seria igual al modelo de mi base de datos.
