import 'dotenv/config';
import express, { json } from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
//rutas de db
import router from './routes/index.routes.js';
import compression from 'express-compression'
import { addLogger } from './config/logger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger.js';
import cluster from 'cluster';
import { cpus } from 'os';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../frontend/src/App.jsx';



let PORT = 3000;

const app = express();

app.use('*', (req, res) => {
    const context = {};
    const appHtml = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    res.send(
        `<!DOCTYPE html>
       <html lang="en">
         <head>
           <!-- head content -->
         </head>
         <body>
           <div id="root">${appHtml}</div>
           <script src="/path/to/your/bundle.js"></script>
         </body>
       </html>`
    );
});

const specs = swaggerJSDoc(swaggerOptions);

const whiteList = ['https://proyecto-frontend-udcd.onrender.com'];

const numeroDeProcesadores = cpus().length;


const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('access denied'));
        }
    },
    credentials: true
}


app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE)) // La cookie esta firmada
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true, //Establezco que la conexion sea mediante URL
            useUnifiedTopology: true //Manego de clusters de manera dinamica
        },
        ttl: 60 //Duracion de la sesion en la BDD en segundos

    }),
    secret: process.env.SESSION_SECRET,
    resave: false, //Fuerzo a que se intente guardar a pesar de no tener modificacion en los datos
    saveUninitialized: false //Fuerzo a guardar la session a pesar de no tener ningun dato
}))
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//inicializamos la estrategia
initializePassport();
//para que funcione passport en toda la aplicacion
app.use(passport.initialize());
//inicializamos las sesiones. Hacemos que maneje lo que seria de las sesiones
app.use(passport.session());

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Agregamos esta opción para mejorar el rendimiento en producción
};

mongoose.connect(process.env.MONGO_URL, mongooseOptions)
    .then(() => {
        console.log('DB is connected');
    })
    .catch((error) => {
        console.log('Error en conexión a DB', error);
        process.exit(1);
    });


app.use(compression());
//generacion de loggers
app.use(addLogger);

//swagger
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// // Agregamos manejo de errores para las rutas
// ...

// Agregamos manejo de errores para las rutas
app.use((err, req, res, next) => {
    // Envía una respuesta personalizada en función del tipo de error
    if (err.name === 'ValidationError') {
        res.status(400).send({ error: 'Validation error', details: err.message });
    } else {
        res.status(500).send({ error: 'Internal server error', details: err.message });
    }
});




if (cluster.isPrimary) {
    console.log('proceso primario, generando proceso trabajador');

    for (let i = 0; i < numeroDeProcesadores; i++) {
        const worker = cluster.fork();

        // Manejar evento 'online'
        worker.on('online', () => {
            console.log(`Worker ${worker.process.pid} is online`);
        });
    }

    // Manejar evento 'exit'
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
        console.log('Forking a new worker process...');
        const newWorker = cluster.fork();
        // Manejar evento 'online' para el nuevo worker
        newWorker.on('online', () => {
            console.log(`Worker ${newWorker.process.pid} is online`);
        });
    });


} else {
    console.log('Al ser un proceso forkeado, no cuento como primario por lo tanto isPrimary es false, entonces soy un worker');
    console.log(`me presento, soy un proceso worker con el id: ${process.pid}`);

    //db routes
    app.use('/', router);

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })

}