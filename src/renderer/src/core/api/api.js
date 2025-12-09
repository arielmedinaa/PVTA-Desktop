const apiUrl = import.meta.env.VITE_API_URL;
const businessUrl = import.meta.env.VITE_BUSINESS_URL;

export const validateLogin = async (body) => {
    console.log('pasa por el post')
    try {
        const res = await fetch(`${apiUrl}licenses/validate`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            return null;
        } else {
            const data = await res.json();
            console.log('todo bien pa ', data);
            return data;
        }
    } catch (error) {
        return error;
    }
}

export const getData = async (url) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    try {
        const res = await fetch(`${businessUrl}${url}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userData.access_token}`,
            }
        })

        if (!res.ok) {
            return null;
        } else {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        return error;
    }
}

export const getDataWithFilter = async (url, filter) => {
    try {
        const res = await fetch(`${businessUrl}${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(filter)
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error en la petición');
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error en getDataWithFilter:', error);
        throw error;
    }
}

export const postData = async (url, body) => {
    try {
        const res = await fetch(`${businessUrl}${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            return null;
        } else {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        return error;
    }
}