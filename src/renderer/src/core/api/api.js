const apiUrl = import.meta.env.VITE_API_URL;

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