const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getOneUser = async (token, userId) => {
    const payload = {
    userId: userId,
    };
    
    const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    };
    
    
    const response = await fetch(`${BACKEND_URL}/users/getOneUser`, requestOptions);

    if (response.status !== 200) {
    throw new Error("Unable to fetch users");
    }

    const data = await response.json();
    return data;
};