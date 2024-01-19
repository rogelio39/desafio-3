import { generateToken } from "../utils/jwt.js";


export const login = async (req, res) => {
    try {
        if (!req.user) {
            req.logger.error('<span style="color: orange">Esto es un fatal</span><br/>');
            res.status(401).send({ message: 'invalid user' })
        }

        // //esto es por si seguimos con sessiones en db. Si usamos JWT se borra
        // req.session.user = {
        //     first_name: req.user.first_name,
        //     last_name: req.user.last_name,
        //     age: req.user.age,
        //     email: req.user.email,
        // };
        // res.status(200).send({usuario: 'usuario logueado'})

        // Actualizar last_connection al iniciar sesión
        req.user.last_connection = Date.now();

        //generamos el token
        const token = generateToken(req.user);
        // //enviamos el token por cookie
        res.cookie('jwtCookie', token, {
            maxAge: 4320000 //12 hs en mili segundos
        });
        // res.status(200).send({ payload: req.user });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: `error al iniciar  sesion ${error}` });
    }
}

// export const login =  async (req, res, next) => {
//     try {
//         // Lógica de inicio de sesión
//         // Si hay un error, lánzalo para que sea manejado por el middleware de manejo de errores
//         if (!req.user) {
//             throw new Error('Invalid user');
//         }

//         // Generamos el token
//         const token = generateToken(req.user);

//         // Enviamos el token por cookie
//         res.cookie('jwtCookie', token, {
//             maxAge: 4320000 // 12 hs en milisegundos
//         });

//         res.status(200).send({ token });
//     } catch (error) {
//         // Si hay un error en la lógica de inicio de sesión, lógica personalizada aquí
//         req.logger.error(`Error en la lógica de inicio de sesión: ${error.message}`);
//         next(error); // Pasa el error al siguiente middleware de manejo de errores
//     }
// };


export const register = async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).send({ message: 'existing user' })
        } else {
            res.status(200).send({ mensaje: 'User created' });
        }
    } catch (error) {
        res.status(500).send({ message: `Error register ${error}` });
    }
}

export const github = async (req, res) => {
    res.status(200).send({ message: 'usuario registrado' });
}

export const githubCallback = async (req, res) => {
    req.session.user = req.user;
    res.status(200).send({ message: 'usuario logueado' });
}

export const current = async (req, res) => {
    res.send({ "user": req.user });
}
export const logout = async (req, res) => {
    try {
        // si manejo sesiones en base de datos va esto
        if (req.session.user) {
            req.session.user.last_connection = Date.now();
            req.session.destroy();
        }
        else if (req.user) {
            // Actualizar last_connection al cerrar sesión
            req.user.last_connection = Date.now();
        }
        // sino, va esto:
        res.clearCookie('jwtCookie');
        res.status(200).send({ resultado: 'usuario deslogueado' })
    } catch (error) {
        res.status(400).send({ error: `error en logout ${error}` });
    }
}


