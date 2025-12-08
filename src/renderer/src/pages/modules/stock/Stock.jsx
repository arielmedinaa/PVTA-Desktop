import { RiArrowRightDownLine, RiArrowRightUpLine } from "react-icons/ri";
import FilterStock from "./components/filters/FilterStock"
import TableStock from "./components/table/TableStock"
import { dataFalseStock, listStock } from "./const/dataStock"

const Stock = () => {
    return (
        <>
            <div className="space-y-8">
                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Stock</h1>
                            <p className="text-gray-500">
                                Gestiona tus cobros pendientes y realizados
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-slate-700 text-white px-4 py-2 rounded-full flex items-center gap-2">
                                <RiArrowRightUpLine className="text-emerald-400" /> Agregar Entrada</button>
                            <button className="bg-gray-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
                                <RiArrowRightDownLine className="text-rose-400" /> Agregar Salida</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mb-8 rounded-3xl bg-gray-50 border border-gray-100 p-2">
                        {dataFalseStock.map((item, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm"
                            >
                                <div className="flex items-center mb-2">
                                    {item.icon}
                                    <span className="text-gray-600 ml-2">{item.name}</span>
                                </div>
                                <div className="text-2xl font-bold mb-1">{item.stock}</div>
                                <div className="text-xs text-gray-500">{item.minStock}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-8">
                        <FilterStock />
                        <TableStock products={listStock} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Stock