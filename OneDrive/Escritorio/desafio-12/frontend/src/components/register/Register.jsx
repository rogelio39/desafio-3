import './Register.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const formRef = useRef(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData)
            console.log(data);

            const response = await fetch('https://proyecto-backend1.onrender.com/api/session/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                // body: JSON.stringify({ first_name, last_name, age, email, password })
            })


            if (response.ok) {
                try {
                    const datos = await response.json();
                    console.log('Usuario registrado con éxito:', datos);
                    navigate('/login');
                } catch (error) {
                    console.error('Error al procesar la respuesta como JSON:', error);
                }
            } else  {
                const errorData = await response.text();
                console.error('Error al registrar usuario:', errorData);
            } 
        } catch (error) {
            console.error("error al procesar solicitud: ", error)
        }
    }

    return (
        <div>
            <h1 className="login">REGISTER</h1>
            <form id="idForm" onSubmit={handleSubmit} ref={formRef}>

                <label htmlFor="first_name">Enter your name</label>
                <input type="text" id="first_name" name="first_name" required />

                <label htmlFor="last_name">Enter your lastname</label>
                <input type="text" id="last_name" name="last_name" required />

                <label htmlFor="age">age</label>
                <input type="number" id="age" name="age" required />


                <label htmlFor="email">Enter your email</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Enter your password</label>
                <input type="password" id="password" name="password" required />

                <button type="submit" id="buttonRegister">REGISTER</button>
                <button type="button" id="gitHubButton">Ingresar con github</button>
            </form>
            <div id="userContainer">
                <h1></h1>
            </div>
            <div id="errorContainer">

            </div>
        </div>
    )
}


export default Register


