const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';


export async function getMessages(room){
  const res = await fetch (`${API_URL}/api/v1/all/${room}`);
  return res.json();
}

export async function sendMessage(messageData){
  const res = await fetch(`${API_URL}/api/v1/send`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(messageData),
  });
  return res.json();
}