import { motion } from 'framer-motion';
import { RiArrowLeftLine } from 'react-icons/ri';
import DropDownError from '../../../../../core/components/dropdown/DropDownError';

const ModalAddCategory = ({ isCategoryClosing, handleCloseCategory, handleAddCategory, handleAddNewCategory, newCategoryName, categoryError }) => {
    return (
        <>
            <motion.div
                className="bg-white rounded-2xl shadow-lg w-[400px] max-h-[90vh] overflow-hidden flex flex-col"
                initial={{ x: 50, opacity: 0 }}
                animate={{
                    x: isCategoryClosing ? 50 : 0,
                    opacity: isCategoryClosing ? 0 : 1
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="flex items-center p-4 border-b border-gray-200">
                    <button
                        onClick={handleCloseCategory}
                        className="p-2 mr-2 text-gray-500 hover:text-gray-700"
                        title="Volver"
                    >
                        <RiArrowLeftLine className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-medium">Nueva Categoría</h3>
                </div>

                <div className="p-6">
                    <div className="mb-4">
                        <label htmlFor="newCategory" className="block mb-1 font-medium">
                            Nombre de la Categoría
                        </label>
                        <input
                            type="text"
                            id="newCategory"
                            name="nombre"
                            className="w-full p-3 border border-gray-300 rounded-full"
                            placeholder="Ingrese el nombre de la categoría"
                            value={newCategoryName.nombre}
                            onChange={handleAddNewCategory}
                        />
                        {categoryError && <DropDownError message={categoryError} />}
                    </div>

                    <button
                        type="button"
                        onClick={handleAddCategory}
                        className="w-full py-2 text-white bg-slate-800 rounded-full hover:bg-slate-900 disabled:opacity-50"
                        disabled={!newCategoryName.nombre.trim()}
                    >
                        Agregar Categoría
                    </button>
                </div>
            </motion.div>
        </>
    )
}

export default ModalAddCategory