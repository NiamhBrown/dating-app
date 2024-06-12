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

export const sendMatchRequest = async(token, sender, recipient) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({sender: sender, recipient: recipient}),
  };
  const response = await fetch(`${BACKEND_URL}/users/sendRequest`, requestOptions);

  if(response.status !== 201){
    throw new Error('Unable to send match request');
  }
  const data = await response.json();
  return data;
};

export const getOneUser = async (token, user_id) => { 
  const requestOptions = {
  method: "GET",
  headers: {
  Authorization: `Bearer ${token}`,
  },
};

const response = await fetch(`${BACKEND_URL}/users/${user_id}`, requestOptions);

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
    body: JSON.stringify({sender: sender, recipient: recipient}),
  };
  const response = await fetch(`${BACKEND_URL}/users/acceptMatch`, requestOptions);

  if(response.status !== 201){
    throw new Error('Unable to accept user match');
  }
  const data = await response.json();
  return data;
};

export const updateUserProfile = async (updateData, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      // Handle non-2xx responses
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user profile');
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
