const businessUrl = import.meta.env.VITE_BUSINESS_URL;
import toast from "react-hot-toast";

export const validarExistenciaPorCodigo = async (codigo) => {
    const res = await fetch(`${businessUrl}productos/validarExistencia?codigo=${codigo}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (res.ok) {
        return { existe: true, mensaje: "El código ya existe, seleccione otro" }
    }
    return {
        existe: false
    };
}