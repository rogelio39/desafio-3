import transporter from "../config/nodemailer.js";


export const nodemailerSend = async (req, res) => {
    let resultado;

    try {
        resultado = await transporter.sendMail({
            from: "TEST MAIL rogeliosuleta@gmail.com",
            to: "andresrogesu@gmail.com",
            subject: "Hola, buenas tardes",
            html:
                `
            <div>
                <h1>Buenas tardes</h1>
            </div>
    `
        })

        if (resultado) {

            console.log(resultado);
            res.status(200).send({ succes: "mail enviado con exito" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "error al enviar mail" });
    }
}



export const sendRecoveryMail = (email, recoveryLink) => {

    if(email){
        const mailOptions = {
            from: 'rogeliosuleta@gmail.com',
            to: email,
            subject: 'Link para restablecer su password',
            text: `Haga click en el siguiente enlace para reestablecer su password: ${recoveryLink}`
        }

        
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error(error);
        }else{
            console.log("Mail enviado correctamente");
        }
    })
    } else {
        console.log("debes ingresar una direccion de correo electronico");
    }


}


