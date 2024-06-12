const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const sendMessage = async (token, sender, recipient, message) => {
    const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({sender: sender, recipient: recipient, message: message}),
      };
      const response = await fetch(`${BACKEND_URL}/chats/send`, requestOptions);
    
      if (response.status !== 201) {
        throw new Error('Unable to send chat');
      }
}