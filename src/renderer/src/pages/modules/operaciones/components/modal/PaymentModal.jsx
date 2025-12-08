import React, { useState } from 'react';
import { MdOutlinePayment } from "react-icons/md";
import {
  RiCheckLine,
  RiMoneyDollarBoxLine,
  RiBankCardLine,
  RiBankLine,
  RiBankCard2Line,
  RiQuestionLine,
  RiQrCodeLine,
  RiCheckboxCircleLine
} from 'react-icons/ri';
import { SiMercadopago } from 'react-icons/si';
import ModalCreatePayment from './ModalCreatePayment';

const PaymentModal = ({
  isOpen,
  onClose,
  selectedPayment,
  paymentAmount,
  setPaymentAmount,
  paymentMethod,
  setPaymentMethod,
  paymentNote,
  setPaymentNote,
  handleProcessPayment,
  formatCurrency,
}) => {
  const [receivedAmount, setReceivedAmount] = useState('');

  const calculateChange = () => {
    if (!receivedAmount || isNaN(parseFloat(receivedAmount))) return 0;
    return (parseFloat(receivedAmount) - parseFloat(paymentAmount || 0)).toFixed(2);
  };

  if (!selectedPayment) return null;

  return (
    <ModalCreatePayment
      isOpen={isOpen}
      onClose={onClose}
      title={`Registrar Cobro - ${selectedPayment.referencia}`}
      size="xl"
      iconTitle={<MdOutlinePayment size={25} className='text-gray-700' />}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Método de Cobro
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-3xl border border-gray-100 p-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto a cobrar
                </label>
                <div className="relative rounded-3xl border border-gray-100 bg-white px-3 py-2 shadow-sm">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">$</span>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="0.00"
                      step="0.01"
                      min="0.01"
                      max={selectedPayment.montoPendiente}
                    />
                    <span className="text-gray-500 ml-2">PYG</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Máximo: {formatCurrency(selectedPayment.montoPendiente)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Seleccione el método de pago
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-gray-50 border border-gray-100 p-2 rounded-3xl">
                  {[
                    { id: 'efectivo', label: 'Efectivo', icon: <RiMoneyDollarBoxLine className="text-2xl" /> },
                    { id: 'tarjeta_debito', label: 'Débito', icon: <RiBankCardLine className="text-2xl" /> },
                    { id: 'tarjeta_credito', label: 'Crédito', icon: <RiBankCard2Line className="text-2xl" /> },
                    { id: 'transferencia', label: 'Transferencia', icon: <RiBankLine className="text-2xl" /> },
                    { id: 'qr', label: 'QR', icon: <RiQrCodeLine className="text-2xl" /> },
                    { id: 'otro', label: 'Otro', icon: <RiQuestionLine className="text-2xl" /> },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border ${paymentMethod === method.id
                          ? 'border-blue-500 bg-white shadow-sm'
                          : 'border-gray-100 bg-white shadow-sm'
                        } transition-colors`}
                    >
                      <span className="text-2xl mb-1">{method.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {method.label}
                      </span>
                    </button>
                  ))}</div>
              </div>

              {paymentMethod === 'efectivo' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Pago en Efectivo
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monto Recibido
                      </label>
                      <input
                        type="number"
                        value={receivedAmount}
                        onChange={(e) => setReceivedAmount(e.target.value)}
                        className="block w-full rounded-2xl border border-gray-300 px-3 py-2 shadow-sm sm:text-sm"
                        placeholder="0.00"
                        step="0.01"
                        min={paymentAmount || '0.01'}
                      />
                    </div>
                    {receivedAmount && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-800">
                          Vuelto: <span className="font-bold">${calculateChange()}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {['tarjeta_debito', 'tarjeta_credito'].includes(paymentMethod) && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Datos de la Tarjeta
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de tarjeta
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-2xl border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    {paymentMethod === 'tarjeta_credito' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          N° de cuotas
                        </label>
                        <select className="block w-full rounded-2xl border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                          <option>1 cuota sin interés</option>
                          <option>3 cuotas sin interés</option>
                          <option>6 cuotas sin interés</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Concepto del Recibo
                </label>
                <textarea
                  rows="2"
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  className="block w-full rounded-2xl border border-gray-300 shadow-sm sm:text-sm resize-none p-2"
                  placeholder="Agregar una nota o referencia para este pago"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalles del Cliente
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {selectedPayment.cliente.nombre.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedPayment.cliente.nombre}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedPayment.cliente.telefono}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Resumen de la Cuenta
                </h4>
                <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(selectedPayment.montoTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pagado:</span>
                    <span className="text-sm font-medium text-green-700">
                      {formatCurrency(selectedPayment.montoPagado)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-900">
                      Pendiente:
                    </span>
                    <span className="text-sm font-bold text-gray-500">
                      {formatCurrency(selectedPayment.montoPendiente)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Cuotas Pendientes
                  </h4>
                  <div className="space-y-2">
                    {selectedPayment.cuotas && selectedPayment.cuotas.length > 0 ? (
                      selectedPayment.cuotas.map((cuota, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Cuota {cuota.numero} - {formatCurrency(cuota.monto)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Vence: {new Date(cuota.fechaVencimiento).toLocaleDateString('es-AR')}
                              {cuota.vencida && (
                                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                                  Vencida
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${cuota.estado === 'pendiente' ? 'text-yellow-600' :
                                cuota.estado === 'vencida' ? 'text-red-600' : 'text-green-600'
                              }`}>
                              {cuota.estado === 'pendiente' ? 'Pendiente' :
                                cuota.estado === 'vencida' ? 'Vencida' : 'Pagada'}
                            </span>
                            {cuota.estado === 'pendiente' && (
                              <button
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded-full"
                                onClick={() => setPaymentAmount(cuota.monto)}
                                title="Seleccionar monto"
                              >
                                <RiCheckLine className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-3 bg-gray-50 rounded-3xl p-3 flex items-center justify-center text-center">
                        <p className="text-sm text-gray-500">
                          No hay cuotas pendientes
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Historial de Pagos
                  </h4>
                </div>
                <div className="space-y-3 bg-gray-50 rounded-3xl p-3">
                  {selectedPayment.pagos.length > 0 ? (
                    selectedPayment.pagos.map((pago, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-2xl shadow-sm"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(pago.monto)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(pago.fecha).toLocaleDateString("es-AR")}{" "}
                            • {pago.metodo}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full border border-green-800 flex items-center">
                          <RiCheckboxCircleLine className="mr-1 h-3 w-3" />
                          Completado
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">
                        No hay pagos registrados
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-full border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleProcessPayment}
              className="inline-flex justify-center rounded-full border border-transparent bg-slate-800 py-2 px-4 text-sm font-medium text-white shadow-sm"
            >
              <RiCheckLine className="-ml-1 mr-2 h-5 w-5" />
              Confirmar Pago
            </button>
          </div>
        </div>
      </div>
    </ModalCreatePayment>
  );
};

export default PaymentModal;
