import React, { useCallback, useState, useEffect } from 'react'
import { getDataWithFilter } from '../../../../core/api/api';

const useListCobros = (initialFilter = {
    numero: "",
    fecha: "",
    cliente: "",
    monto: "",
    estado: "",
    limit: 4,
    offset: 0,
    orden: "codigo",
    tipOrden: "ASC",
}, { callBack = false } = {}) => {
    const [filter, setFilter] = useState(initialFilter);
    const [cobros, setCobros] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const listarCobrosPorFiltro = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await getDataWithFilter("cobros/listar", filter);
            setCobros(res.dataResponse);
            setTotal(res.totalRegistros);
        } catch (err) {
            setError(true);
            console.error("Error al listar cobros:", err);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        if (callBack) {
            listarCobrosPorFiltro();
        }
    }, [callBack, listarCobrosPorFiltro]);

    return {
        setFilter,
        filter,
        cobros,
        total,
        loading,
        error,
        listarCobrosPorFiltro
    }
}

export default useListCobros;