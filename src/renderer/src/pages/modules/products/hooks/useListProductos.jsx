import React, { useCallback, useState, useEffect } from 'react'
import { getDataWithFilter } from '../../../../core/api/api';

const useListProductos = (initialFilter = {
    codigo: "",
    descripcion: "",
    categoria: "",
    marca: "",
    precioini: "",
    preciofin: "",
    limit: 4,
    offset: 0,
    orden: "codigo",
    tipOrden: "ASC",
}, { callBack = false } = {}) => {
    const [filter, setFilter] = useState(initialFilter);
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const listarProductosPorFiltro = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await getDataWithFilter("productos/listar", filter);
            setProductos(res.dataResponse);
            setTotal(res.totalRegistros);
        } catch (err) {
            setError(true);
            console.error("Error al listar productos:", err);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        if (callBack) {
            listarProductosPorFiltro();
        }
    }, [callBack, listarProductosPorFiltro]);

    return {
        setFilter,
        filter,
        productos,
        total,
        loading,
        error,
        listarProductosPorFiltro
    }
}

export default useListProductos;