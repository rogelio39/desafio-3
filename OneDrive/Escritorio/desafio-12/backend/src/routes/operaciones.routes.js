import express from 'express';

const operacionesRouter = express.Router();

operacionesRouter.get('/operacionSencilla', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
        sum += i;
    }
    res.send({ status: 'success', message: `El worker ${process.pid} ha atendido esta peticion, el resultado es ${sum}` });
});

operacionesRouter.get('/operacionCompleja', (req, res) => {
    try {
        let sum = 0;
        for (let i = 0; i < 5e8; i++) {
            sum += i;
        }
        // res.send({ status: "success", message: `El worker ${process.pid} ha atendido esta peticion compleja, el resultado es ${sum}` });
        res.send({succes: "success", message: `peticion atendida con exito por el worker ${process.pid}`})
    } catch (error) {
        console.error('Error en /operacionCompleja:', error);
        res.status(500).send({ status: "error", message: "Hubo un error en el servidor" });
    }
});


export default operacionesRouter;