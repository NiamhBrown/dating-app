// DO NOT USE - USE user.js

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const getOneUser = async (token, userId) => {
  // DO NOT USE
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

  const response = await fetch(
    `${BACKEND_URL}/users/getOneUser`,
    requestOptions
  );

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

  const response = await fetch(
    `${BACKEND_URL}/users/profilePicture`,
    requestOptions
  );
  if (response.status !== 200) {
    throw new Error("Unable to add profile picture");
  } else {
    console.log("successful...");
    return await response.json();
  }
};
