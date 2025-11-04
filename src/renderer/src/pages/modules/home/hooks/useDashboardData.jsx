import { useState } from 'react';

export const useDashboardData = () => {
  const pendingPayments = [
    { id: 1, customer: 'Juan Pérez', amount: 1250.00, dueDate: '2023-11-05' },
    { id: 2, customer: 'María García', amount: 2750.00, dueDate: '2023-11-10' },
  ];

  const pendingOrders = [
    { id: 1, orderId: '#ORD-001', customer: 'Juan Pérez', items: 3, amount: 1250.00, time: 'Hace 15 min' },
    { id: 2, orderId: '#ORD-002', customer: 'María García', items: 5, amount: 2750.00, time: 'Hace 32 min' },
    { id: 3, orderId: '#ORD-003', customer: 'Pedro Rodríguez', items: 2, amount: 1500.00, time: 'Hace 45 min' },
  ];

  const timeOptions = [
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
  ];

  const [timeRange, setTimeRange] = useState(timeOptions[0]);
  const [productTimeRange, setProductTimeRange] = useState('Last 7 days');

  return {
    pendingPayments,
    pendingOrders,
    timeOptions,
    timeRange,
    setTimeRange,
    productTimeRange,
    setProductTimeRange,
  };
};
