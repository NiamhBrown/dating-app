const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getHistory = async (token, chatId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${BACKEND_URL}/chats/${chatId}`, requestOptions);

  if (response.status !== 200) {
    throw new Error('Unable to get history');
  } else {
    let data = response.json() 
    return data;
  }
};

export const getChats = async (token, userId) => {

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/chats/${userId}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch chats");
  }

  const data = await response.json();
  return data;
};

export const sendMessageToDB = async (token, chatId, message) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatId: chatId, message: message }),
  };
  console.log("service")
  const response = await fetch(`${BACKEND_URL}/chats/`, requestOptions);

  if (response.status !== 201) {
    throw new Error('Unable to send chat');
  }
};
