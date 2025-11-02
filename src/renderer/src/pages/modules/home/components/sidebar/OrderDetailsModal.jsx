import { motion, AnimatePresence } from 'framer-motion';

const OrderDetailsModal = ({ open, onClose, order }) => {
  if (!open || !order) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg w-full max-w-md shadow-lg overflow-hidden relative"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          exit={{ y: 50 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            aria-label="Cerrar"
          >
            ×
          </button>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Detalle del Pedido</h2>
            <div className="mb-2">
              <span className="font-medium">ID:</span> {order.orderId}
            </div>
            <div className="mb-2">
              <span className="font-medium">Cliente:</span> {order.customer}
            </div>
            <div className="mb-2">
              <span className="font-medium">Artículos:</span> {order.items}
            </div>
            <div className="mb-2">
              <span className="font-medium">Total:</span> ${order.amount.toFixed(2)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Hora:</span> {order.time}
            </div>
            {/* Puedes agregar más detalles aquí */}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
