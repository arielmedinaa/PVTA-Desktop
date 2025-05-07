import { FiUserPlus } from "react-icons/fi";

const HeaderClientes = () => {
    return (
        <>
            <div className='flex justify-between items-center mb-8'>
                <h1 className="text-2xl font-bold">Lista de Clientes</h1>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>
                    <FiUserPlus className="w-5 h-5" />
                    <span>Nuevo Cliente</span>
                </button>
            </div>
        </>
    )
}

export default HeaderClientes