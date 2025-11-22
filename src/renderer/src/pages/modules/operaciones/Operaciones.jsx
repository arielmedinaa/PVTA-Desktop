import React, { useState } from "react";
import {
  RiMoneyDollarCircleLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiCloseCircleLine,
  RiAlertLine,
} from "react-icons/ri";
import Paginacion1 from "../../../core/components/pagination/Paginacion1";
import PaymentModal from "./components/modal/PaymentModal";
import { FiAlertCircle } from "react-icons/fi";
import TableCobros from "./components/table/TableCobros";
import FilterCobros from "./components/filters/FilterCobros";

const getStatusIcon = (estado) => {
  switch(estado.toLowerCase()) {
    case 'completado':
      return <RiCheckboxCircleLine className="mr-1 h-6 w-6" />;
    case 'parcial':
      return <RiTimeLine className="mr-1 h-4 w-4" />;
    case 'pendiente':
      return <RiAlertLine className="mr-1 h-4 w-4" />;
    default:
      return <FiAlertCircle className="mr-1 h-4 w-4" />;
  }
};

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
        return "bg-amber-50 text-amber-800 border border-amber-800 flex items-center w-28";
      case "Completado":
        return "bg-green-50 text-green-800 border border-green-800 flex items-center w-28";
      case "Parcial":
        return "bg-blue-50 text-blue-800 border border-blue-800 flex items-center w-28";
      case "Vencido":
        return "bg-red-50 text-red-800 border border-red-800 flex items-center w-28";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-800 flex items-center w-28";
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
            <FilterCobros
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <TableCobros
              filteredPayments={filteredPayments}
              searchQuery={searchQuery}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
              getStatusBadge={getStatusBadge}
              getStatusIcon={getStatusIcon}
              handleViewPayment={handleViewPayment}
              handleOpenPaymentModal={handleOpenPaymentModal}
            />

            <div className="px-6 py-4 border-t border-gray-200">
              <Paginacion1 data={filteredPayments} itemsPerPage={5} />
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        selectedPayment={selectedPayment}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        paymentDate={paymentDate}
        setPaymentDate={setPaymentDate}
        paymentNote={paymentNote}
        setPaymentNote={setPaymentNote}
        handleProcessPayment={handleProcessPayment}
        formatCurrency={formatCurrency}
      />
    </>
  );
};

export default Operaciones;
