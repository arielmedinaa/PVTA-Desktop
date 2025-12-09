import { useState } from 'react';
import HeaderStock from './components/header/HeaderStock';
import FilterStock from "./components/filters/FilterStock"
import TableStock from "./components/table/TableStock"
import ModalAddStock from "./components/modals/ModalAddStock"
import { listStock } from "./const/dataStock"

const Stock = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [stockData, setStockData] = useState(listStock);
    return (
        <>
            <div className="space-y-8">
                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <HeaderStock setShowAddModal={setShowAddModal} />

                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-8">
                        <FilterStock activeTab={"all"}/>
                        <TableStock products={stockData} />
                    </div>

                </div>
            </div>

            {showAddModal && (
                <ModalAddStock
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={(newStock) => {
                        setStockData([...stockData, newStock]);
                        setShowAddModal(false);
                    }}
                />
            )}
        </>
    )
}

export default Stock