import { useState } from "react";
import Ticket from "../ticket/Ticket";
import { useParams } from "react-router-dom";


const Checkout = () => {

    const [ticket, setTicket] = useState({});
    const [viewButtonOrder, setViewButtonOrder] = useState(false);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const {cartId} = useParams('');

    const getTicket = async () => {
        try {
            const response = await fetch(`https://proyecto-backend1.onrender.com/api/carts/checkout/${cartId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const data = await response.json();
                console.log("compra realizada")
                console.log(data.ticket)
                setTicket(data.ticket);
            } else if (response.status === 404) {
                console.error('Errores 404', response);
            } else {
                console.log("error 500", response)
            }
        } catch (error) {
            console.log('error', error);
        }

        setViewButtonOrder(true);
    }

    const getCheckout = async () => {
        setShowOrderDetails(true);
    }



    return (
        <div>
            <button onClick={getTicket}>REALIZAR COMPRA</button>
            {
                viewButtonOrder && <button onClick={getCheckout}>VER DETALLES DE COMPRA</button>
            }
            {
                showOrderDetails && <Ticket ticket={ticket} />
            }
        </div>
    )
}

export default Checkout
