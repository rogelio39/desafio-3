import { __dirname } from "../path.js"

export const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info: {
            title: "documentacion del proyecto backend",
            description: "API coder backend"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
