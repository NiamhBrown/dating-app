const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getOneUser = async (token) => {
    const requestOptions = {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    },
};

const response = await fetch(`${BACKEND_URL}/users/getOneUser`, requestOptions);

if (response.status !== 200) {
    throw new Error("Unable to fetch users");
}

const data = await response.json();
return data;
};


export const uploadProfilePicture = async (token, file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    };

    const response = await fetch(`${BACKEND_URL}/users/profilePicture`, requestOptions);
    if (response.status !==200) {
        throw new Error("Unable to add profile picture");
    } else {
        return await response.json();
    }
};