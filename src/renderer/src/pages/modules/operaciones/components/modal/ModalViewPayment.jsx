import React from 'react'
import ModalCreatePayment from './ModalCreatePayment'


const ModalViewPayment = ({ viewModalOpen, setViewModalOpen, selectedPayment }) => {
    return (
        <ModalCreatePayment
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Visualizar Pago"
            size="lg"
        >
            <div>
                <p>Cliente: {selectedPayment.cliente.nombre}</p>
                <p>Referencia: {selectedPayment.referencia}</p>
                <p>Fecha de creación: {selectedPayment.fechaCreacion}</p>
                <p>Fecha de vencimiento: {selectedPayment.fechaVencimiento}</p>
                <p>Monto total: {selectedPayment.montoTotal}</p>
                <p>Monto pagado: {selectedPayment.montoPagado}</p>
                <p>Monto pendiente: {selectedPayment.montoPendiente}</p>
                <p>Estado: {selectedPayment.estado}</p>
            </div>
        </ModalCreatePayment>
    )
}

export default ModalViewPayment