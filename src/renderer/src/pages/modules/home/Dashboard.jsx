import PreviewSection from './components/preview/PreviewSection';
import ProductViewChart from './components/preview/ProductViewChart';
import QuickInvoiceButton from './components/sidebar/QuickInvoiceButton';
import PendingOrdersList from './components/sidebar/PendingOrdersList';
import PendingPaymentsList from './components/sidebar/PendingPaymentsList';
import OrderDetailsModal from './components/sidebar/OrderDetailsModal';
import { useDashboardData } from './hooks/useDashboardData';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const {
    pendingPayments,
    pendingOrders,
    timeOptions,
    timeRange,
    setTimeRange,
    productTimeRange,
    setProductTimeRange,
  } = useDashboardData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PreviewSection 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          timeOptions={timeOptions}
          orders={pendingOrders}
        />
        
        <ProductViewChart 
          productTimeRange={productTimeRange}
          setProductTimeRange={setProductTimeRange}
        />
      </div>

      <div className="space-y-6">
        <QuickInvoiceButton />
        
        <PendingOrdersList orders={pendingOrders} setSelectedOrder={setSelectedOrder} />
        
        <PendingPaymentsList payments={pendingPayments} />
      </div>

      <OrderDetailsModal
        open={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default Dashboard;