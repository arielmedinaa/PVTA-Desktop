const ProductViewChart = ({ productTimeRange, setProductTimeRange }) => {
  return (
    <div className="space-y-4">
      <div className='bg-white rounded-3xl shadow-sm p-6'>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Product view</h2>
          <div className="flex items-center">
            <select
              value={productTimeRange}
              onChange={(e) => setProductTimeRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Last 7 days</option>
              <option>Last month</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 h-72 relative">
          <div className="absolute inset-0 flex items-end justify-around p-6">
            <div className="h-20 w-6 bg-gray-200 rounded-t-md"></div>
            <div className="h-36 w-6 bg-gray-200 rounded-t-md"></div>
            <div className="h-28 w-6 bg-gray-200 rounded-t-md"></div>
            <div className="h-48 w-6 bg-gray-200 rounded-t-md"></div>
            <div className="h-32 w-6 bg-gray-200 rounded-t-md"></div>
            <div className="h-56 w-6 bg-green-400 rounded-t-md relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                2.2m
              </div>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div className="h-24 w-6 bg-gray-200 rounded-t-md"></div>
            <div className="h-16 w-6 bg-gray-200 rounded-t-md"></div>
          </div>

          <div className="absolute bottom-6 left-6 text-3xl font-bold text-gray-300">
            $10.2m
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewChart;
