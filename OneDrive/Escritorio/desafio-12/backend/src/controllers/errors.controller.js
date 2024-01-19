
export const debug = async (req, res) => {
    req.logger.debug('Esto es un debug');
    res.send('debug correctamente procesado');
}


export const info = async (req, res) => {
    req.logger.info('<span style="color: blue">Esto es un info</span><br/>');
    res.send('info correctamente procesado');
}

export const warning = async(req, res) => {
    req.logger.warning('<span style="color: cyan">Esto es un warning</span><br/>');
    res.send('warning correctamente procesado');
}


export const error = async(req, res) => {
    req.logger.error('<span style="color: orange">Esto es un fatal</span><br/>');
    res.send('error correctamente procesado');
}

export const fatal = async(req, res) => {
    req.logger.fatal('<span style="color: darkRed">Esto es un fatal</span><br/>');
    res.send('fatal correctamente procesado');
}



