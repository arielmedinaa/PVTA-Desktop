import React from 'react'
import DropdownMenu from '../../../../../core/components/dropdown/DropDown'
import { RiEyeLine, RiMoneyDollarCircleFill, RiMoneyDollarCircleLine } from 'react-icons/ri'

const TableCobros = ({ filteredPayments, searchQuery, formatDate, formatCurrency, getStatusBadge, getStatusIcon, handleViewPayment, handleOpenPaymentModal }) => {
  return (
    <>
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
                          <div className="font-medium text-gray-900">
                            {payment.cliente.nombre}
                          </div>
                          <div className="text-gray-500">
                            {payment.cliente.telefono}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {payment.referencia}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {formatDate(payment.fechaVencimiento)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {formatCurrency(payment.montoTotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600">
                      {formatCurrency(payment.montoPagado)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-amber-600">
                      {formatCurrency(payment.montoPendiente)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${getStatusBadge(payment.estado)}`}
                      >
                        {getStatusIcon(payment.estado)}
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
    </>
  )
}

export default TableCobros
