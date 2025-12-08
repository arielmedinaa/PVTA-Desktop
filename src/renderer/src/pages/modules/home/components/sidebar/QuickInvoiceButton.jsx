const QuickInvoiceButton = () => {
  const handleNewInvoice = () => {
    console.log('Nueva factura');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <button
        onClick={handleNewInvoice}
        className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-full transition-colors flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Nueva Factura</span>
      </button>
    </div>
  );
};

export default QuickInvoiceButton;
