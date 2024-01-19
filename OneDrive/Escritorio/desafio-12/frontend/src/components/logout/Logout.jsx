import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Logout({onLogout}) {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await fetch('https://proyecto-backend1.onrender.com/api/session/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.status === 200) {
                // Limpia el token del almacenamiento local
                const data = await response.json();
                console.log("datos", data);
                onLogout();
                localStorage.removeItem('jwtCookie');
                navigate('/login');
            } else {
                console.error(`Error al desloguearse ${await response.text()}`);
            }
        } catch (error) {
            console.error(`Error al desloguearse ${error}`);
        }
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

Logout.propTypes = {
    onLogout: PropTypes.func.isRequired,
};
/* document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');

    logoutButton.addEventListener('click', async () => {
        console.log('Botón de cerrar sesión clickeado'); 
        try {
            const response = await fetch('/api/sessions/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                window.location.href = '/static/login';
            } else {
                // Manejar otros códigos de estado si es necesario
                console.log('Error en la respuesta del servidor:', response.status);
            }
        } catch (error) {
            console.error('Error durante la solicitud:', error);
        }
    });
});
*/