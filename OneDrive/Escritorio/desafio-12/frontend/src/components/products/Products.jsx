import './Products.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookiesByName } from '../../utils/formsUtils';
import Logout from '../logout/Logout';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const token = getCookiesByName('jwtCookie');
                const response = await fetch('https://proyecto-backend1.onrender.com/api/products', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                })

                if (response.status == 200) {
                    const data = await response.json();
                    setProducts(data.docs);
                    navigate('/products')
                } else if (response.status === 401) {
                    const datos = await response.json()
                    console.error('Error acceder a productos, debes tener iniciada session', datos);
                } else {
                    const data = await response.json();
                    console.log("error", data)
                }
            } catch (error) {
                console.log('error al intentar acceder a esta url', error);
            }


        };

        getProducts();


    }, []);


    const handleLogout = () => {
        console.log("sesion cerrada")
    }


    return (
        <div>
            <div id="showProducts" className="on">
                {products && products.map(prod => (
                    <div className="products" key={prod._id}>
                        <p>Nombre: {prod.title}</p>
                        <p>Descripcion: {prod.description}</p>
                        <p>Precio: {prod.price}</p>
                        <p>Stock disponible: {prod.stock}</p>
                    </div>
                ))}
            </div>
            <Logout onLogout = {handleLogout}/>
        </div>
    )
}


export default Products