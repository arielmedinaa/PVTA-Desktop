import React, { useState } from "react";
import {
  RiSearchLine,
  RiFilterLine,
  RiMoneyDollarCircleLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiCloseCircleLine,
  RiEyeLine,
  RiMoneyDollarCircleFill,
  RiCalendarLine,
  RiInformationLine,
  RiCheckLine,
} from "react-icons/ri";
import Paginacion1 from "../../../core/components/pagination/Paginacion1";
import ModalCreatePayment from "./components/modal/ModalCreatePayment";
import DropdownMenu from "../../../core/components/dropdown/DropDown";

const Operaciones = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [paymentNote, setPaymentNote] = useState("");
  const [payments, setPayments] = useState([
    {
      id: 1,
      cliente: { id: 1, nombre: "Juan Pérez", telefono: "+5491123456789" },
      referencia: "Venta #1234",
      fechaCreacion: "2023-11-01T10:30:00",
      fechaVencimiento: "2023-11-15T23:59:59",
      montoTotal: 12500.0,
      montoPagado: 12500.0,
      montoPendiente: 0.0,
      estado: "Completado",
      pagos: [
        { fecha: "2023-11-01T10:30:00", monto: 12500.0, metodo: "Efectivo" },
      ],
    },
    {
      id: 2,
      cliente: { id: 2, nombre: "María García", telefono: "+5491187654321" },
      referencia: "Venta #1235",
      fechaCreacion: "2023-11-02T14:15:00",
      fechaVencimiento: "2023-11-17T23:59:59",
      montoTotal: 8500.0,
      montoPagado: 3000.0,
      montoPendiente: 5500.0,
      estado: "Parcial",
      pagos: [
        {
          fecha: "2023-11-02T14:15:00",
          monto: 3000.0,
          metodo: "Transferencia",
        },
        // Pago pendiente de 5500.00
      ],
    },
    {
      id: 3,
      cliente: { id: 3, nombre: "Carlos López", telefono: "+5491155551212" },
      referencia: "Venta #1236",
      fechaCreacion: "2023-11-03T09:45:00",
      fechaVencimiento: "2023-11-20T23:59:59",
      montoTotal: 12300.0,
      montoPagado: 0.0,
      montoPendiente: 12300.0,
      estado: "Pendiente",
      pagos: [],
    },
    {
      id: 4,
      cliente: { id: 4, nombre: "Ana Martínez", telefono: "+5491166661313" },
      referencia: "Venta #1237",
      fechaCreacion: "2023-10-28T16:20:00",
      fechaVencimiento: "2023-11-12T23:59:59",
      montoTotal: 9800.0,
      montoPagado: 0.0,
      montoPendiente: 9800.0,
      estado: "Vencido",
      pagos: [],
    },
    {
      id: 5,
      cliente: { id: 5, nombre: "Roberto Sánchez", telefono: "+5491177771414" },
      referencia: "Venta #1238",
      fechaCreacion: "2023-11-04T11:10:00",
      fechaVencimiento: "2023-11-18T23:59:59",
      montoTotal: 15600.0,
      montoPagado: 10000.0,
      montoPendiente: 5600.0,
      estado: "Parcial",
      pagos: [
        { fecha: "2023-11-04T11:10:00", monto: 5000.0, metodo: "Tarjeta" },
        { fecha: "2023-11-05T10:30:00", monto: 5000.0, metodo: "Efectivo" },
        // Pago pendiente de 5600.00
      ],
    },
  ]);

  const summaryData = [
    {
      label: "Pendientes",
      value: `$${payments
        .filter((p) => p.estado === "Pendiente")
        .reduce((sum, p) => sum + p.montoPendiente, 0)
        .toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
      color: "amber",
      icon: <RiTimeLine className="text-amber-500 text-xl" />,
      lastUpdate: "Actualizado: Hoy",
    },
    {
      label: "Cobrados Hoy",
      value: `$${payments
        .filter((p) => {
          const hoy = new Date().toISOString().split("T")[0];
          return p.pagos.some((pago) => pago.fecha.startsWith(hoy));
        })
        .reduce((sum, p) => sum + p.montoPagado, 0)
        .toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
      color: "green",
      icon: <RiMoneyDollarCircleLine className="text-green-500 text-xl" />,
      lastUpdate: "Hoy",
    },
    {
      label: "Total Cobrado",
      value: `$${payments
        .reduce((sum, p) => sum + p.montoPagado, 0)
        .toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
      color: "blue",
      icon: <RiCheckboxCircleLine className="text-blue-500 text-xl" />,
      lastUpdate: "Este mes",
    },
    {
      label: "Vencidos",
      value: `$${payments
        .filter((p) => p.estado === "Vencido")
        .reduce((sum, p) => sum + p.montoPendiente, 0)
        .toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
      color: "red",
      icon: <RiCloseCircleLine className="text-red-500 text-xl" />,
      lastUpdate: "Por vencer",
    },
  ];

  const filteredPayments = payments.filter((payment) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return payment.estado === "Pendiente";
    if (activeTab === "completed") return payment.estado === "Completado";
    if (activeTab === "partial") return payment.estado === "Parcial";
    if (activeTab === "expired") return payment.estado === "Vencido";
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pendiente":
        return "bg-amber-100 text-amber-800";
      case "Completado":
        return "bg-green-100 text-green-800";
      case "Parcial":
        return "bg-blue-100 text-blue-800";
      case "Vencido":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-AR", options);
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setViewModalOpen(true);
  };

  const handleOpenPaymentModal = (payment) => {
    setSelectedPayment(payment);
    setPaymentAmount(payment.montoPendiente.toFixed(2));
    setPaymentModalOpen(true);
  };

  const handleProcessPayment = () => {
    if (!selectedPayment || !paymentAmount) return;

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) return;

    const updatedPayments = payments.map((p) => {
      if (p.id === selectedPayment.id) {
        const newPaid = p.montoPagado + amount;
        const newPending = p.montoTotal - newPaid;
        const newStatus =
          newPending <= 0 ? "Completado" : newPaid > 0 ? "Parcial" : p.estado;

        return {
          ...p,
          montoPagado: newPaid,
          montoPendiente: newPending > 0 ? newPending : 0,
          estado: newStatus,
          pagos: [
            ...p.pagos,
            {
              fecha: new Date().toISOString(),
              monto: amount,
              metodo: paymentMethod,
              nota: paymentNote,
            },
          ],
        };
      }
      return p;
    });

    setPayments(updatedPayments);
    setPaymentModalOpen(false);
    resetPaymentForm();
  };

  const resetPaymentForm = () => {
    setPaymentAmount("");
    setPaymentMethod("efectivo");
    setPaymentDate(new Date().toISOString().split("T")[0]);
    setPaymentNote("");
    setSelectedPayment(null);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cobros</h1>
              <p className="text-gray-500">
                Gestiona tus cobros pendientes y realizados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 rounded-3xl bg-gray-50 border border-gray-100 p-2">
            {summaryData.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center mb-2">
                  {item.icon}
                  <span className="text-gray-600 ml-2">{item.label}</span>
                </div>
                <div className="text-2xl font-bold mb-1">{item.value}</div>
                <div className="text-xs text-gray-500">{item.lastUpdate}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-8">
            <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  onClick={() => setActiveTab("all")}
                >
                  Todos
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "pending" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  onClick={() => setActiveTab("pending")}
                >
                  Pendientes
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "partial" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  onClick={() => setActiveTab("partial")}
                >
                  Parciales
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "completed" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completados
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "expired" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  onClick={() => setActiveTab("expired")}
                >
                  Vencidos
                </button>
              </div>

              <div className="flex space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por cliente o referencia..."
                    className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiSearchLine className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
                  <RiFilterLine className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Referencia
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Vencimiento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monto Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pagado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pendiente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.length > 0 ? (
                    filteredPayments
                      .filter(
                        (payment) =>
                          payment.cliente.nombre
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          payment.referencia
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                      )
                      .map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <span className="text-gray-600 font-medium">
                                  {payment.cliente.nombre.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {payment.cliente.nombre}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {payment.cliente.telefono}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.referencia}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(payment.fechaVencimiento)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(payment.montoTotal)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            {formatCurrency(payment.montoPagado)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">
                            {formatCurrency(payment.montoPendiente)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(payment.estado)}`}
                            >
                              {payment.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <DropdownMenu
                              options={[
                                {
                                  label: "Ver",
                                  onClick: () => handleViewPayment(payment),
                                  icon: RiEyeLine,
                                },
                                {
                                  label: "Pagar",
                                  onClick: () => handleOpenPaymentModal(payment),
                                  icon: RiMoneyDollarCircleFill,
                                  visible: payment.estado === "Pendiente" || payment.estado === "Parcial" || payment.estado === "Vencido",
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <RiMoneyDollarCircleLine className="h-12 w-12 text-gray-300 mb-2" />
                          <p className="text-sm font-medium">
                            No se encontraron cobros
                          </p>
                          <p className="text-xs mt-1">
                            Intenta con otros filtros de búsqueda
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="px-6 py-4 border-t border-gray-200">
              <Paginacion1 data={filteredPayments} itemsPerPage={5} />
            </div>
          </div>
        </div>
      </div>

      {paymentModalOpen && selectedPayment && (
        <ModalCreatePayment
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          title={`Registrar Pago - ${selectedPayment.referencia}`}
        >
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <RiInformationLine className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Detalles del cobro
                  </h3>
                  <div className="mt-2 text-sm text-blue-700 space-y-1">
                    <p>
                      <span className="font-medium">Cliente:</span>{" "}
                      {selectedPayment.cliente.nombre}
                    </p>
                    <p>
                      <span className="font-medium">Total:</span>{" "}
                      {formatCurrency(selectedPayment.montoTotal)}
                    </p>
                    <p>
                      <span className="font-medium">Pagado:</span>{" "}
                      {formatCurrency(selectedPayment.montoPagado)}
                    </p>
                    <p className="font-semibold">
                      <span className="font-medium">Pendiente:</span>{" "}
                      {formatCurrency(selectedPayment.montoPendiente)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto a pagar
                </label>
                <div className="mt-1 relative rounded-full shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-full p-2 border"
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    max={selectedPayment.montoPendiente}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">PYG</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Máximo: {formatCurrency(selectedPayment.montoPendiente)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método de pago
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-full border p-2"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia bancaria</option>
                  <option value="tarjeta_credito">Tarjeta de crédito</option>
                  <option value="tarjeta_debito">Tarjeta de débito</option>
                  <option value="mercadopago">Mercado Pago</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ">
                  Fecha del pago
                </label>
                <div className="mt-1 relative rounded-full shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiCalendarLine className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-full p-2 border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nota (opcional)
                </label>
                <textarea
                  rows="3"
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 resize-none"
                  placeholder="Agregar una nota o referencia para este pago"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleProcessPayment}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RiCheckLine className="-ml-1 mr-2 h-5 w-5" />
                Registrar pago
              </button>
            </div>
          </div>
        </ModalCreatePayment>
      )}
    </>
  );
};

export default Operaciones;
