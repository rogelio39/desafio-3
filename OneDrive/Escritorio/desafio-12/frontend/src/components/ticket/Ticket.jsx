
const Ticket = (ticket) => {
    const ticketDetails = ticket.ticket;

    return (
        <div className="ticket">
            <h1>ORDEN DE COMPRA N°: {ticketDetails.code}</h1>
            <h2>Total: {ticketDetails.amount}</h2>
            <h2>Usuario: {ticketDetails.purchaser}</h2>
            <h2>Fecha de compra: {ticketDetails.purchase_datetime}</h2>
        </div>
    )
}

export default Ticket
