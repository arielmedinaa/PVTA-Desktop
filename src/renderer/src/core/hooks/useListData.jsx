import { useCallback, useState } from "react"
import { getData, getDataWithFilter } from "../api/api";
import { toast } from "@heroui/react";

const FILTER_DATA = {
    numero: "",
    nombre: "",
    fecha: new Date(),
    estado: "",
    tipo: "",
}

export const useListData = () => {
    const [loading, setLoading] = useState(false);
    const [listData, setListData] = useState([]);
    const [filterData, setFilterData] = useState(FILTER_DATA);

    const fetchListData = useCallback(async (api) => {
        try {
            setLoading(true);
            const res = await getData(api);
            setListData(res);
        } catch (error) {
            toast.error("Error fetching data");
            console.error("Error fetching data:", error);
            setListData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchListDataWithFilter = useCallback(async (api) => {
        try {
            setLoading(true);
            const res = await getDataWithFilter(api, filterData);
            setListData(res);
        } catch (error) {
            toast.error("Error fetching data");
            console.error("Error fetching data:", error);
            setListData([]);
        } finally {
            setLoading(false);
        }
    }, [filterData]);

    return {
        loading,
        listData,
        filterData,
        setFilterData,
        fetchListDataWithFilter,
        fetchListData,
    }
}

