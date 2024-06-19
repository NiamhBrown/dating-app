// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUsers = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
};

export const sendMatchRequest = async (token, sender, recipient) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sender: sender, recipient: recipient }),
  };
  const response = await fetch(
    `${BACKEND_URL}/users/sendRequest`,
    requestOptions
  );

  if (response.status !== 201) {
    throw new Error("Unable to send match request");
  }
  const data = await response.json();
  return data;
};

export const getOneUser = async (token, userId ) => { 
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const response = await fetch(`${BACKEND_URL}/users/${userId}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
};

export const acceptMatch = async (token, sender, recipient) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sender: sender, recipient: recipient }),
  };
  const response = await fetch(
    `${BACKEND_URL}/users/acceptMatch`,
    requestOptions
  );

  if (response.status !== 201) {
    throw new Error("Unable to accept user match");
  }
  const data = await response.json();
  return data;
};

export const removeMatch = async (token, user, otherUser) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user, otherUser: otherUser}),
  };
  const response = await fetch(
    `${BACKEND_URL}/users/unmatch`,
    requestOptions
  );

  if (response.status !== 201) {
    throw new Error("Unable to unmatch user");
  }
  const data = await response.json();
  return data;
};

export const blockUserService = async (token, user, otherUser) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user, otherUser: otherUser}),
  };
  const response = await fetch(
    `${BACKEND_URL}/users/block`,
    requestOptions
  );

  if (response.status !== 201) {
    throw new Error("Unable to block user");
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
  try {
    const response = await fetch(
      `${BACKEND_URL}/users/profilePicture`,
      requestOptions
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Unable to add profile picture: ${errorDetails}`);
    }

    return await response.json();
  } catch (error) {
    // Handle and possibly re-throw the error to the caller
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
export const getMatches = async (token, userId) => { 
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BACKEND_URL}/users/matches/${userId}`,
    requestOptions
  );

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
};

// const response = await fetch(`${BACKEND_URL}/users/matches/${userId}`, requestOptions);
export const updateUserProfile = async (updateData, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      // Handle non-2xx responses
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user profile");
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
