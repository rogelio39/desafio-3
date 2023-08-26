import express from "express";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import path from 'path';
import multer from "multer";

//rutas productos
import prodsRouter from "./routes/products.routes.js";

//rutas cart
import cartRouter from "./routes/cart.routes.js";

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/public/img');
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()} ${file.originalname}`)
    }
});

const upload = multer({ storage: storage });


//routes productos
app.use('/api/products', prodsRouter);

//ruta para imagenes
app.use('/static', express.static(path.join(__dirname, '/public')));//aqui se deben concatenar las rutas.

//routes cart
app.use('/api/carts', cartRouter);


app.get('/', (req, res) => {
    res.send('inicio')
});

//este es el endpoint en el que me voy a conectar a mi aplicacion
app.post('/upload', upload.single('product'), (req, res) =>{
    res.status(200).send('imagen cargada');
})

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});
