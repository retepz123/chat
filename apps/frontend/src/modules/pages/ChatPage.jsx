import { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../components/api';

function ChatPage() {
  const [message, setMessage] = useState([]);
  const [content, setContent] = useState("");
  const [room] = useState('general');

  // Get logged-in user from localStorage
 let storedUser = null;
 try{
  const userData = localStorage.getItem('user');
  if (userData && userData !== 'undefined') {
    storedUser = JSON.parse(userData);
  }
 } catch (err) {
  console.error('Error in parsing the data from localstorage:', err);
 }

 const senderId = storedUser?._id;


  // Load messages on mount
  useEffect(() => {
    async function fetchMessages() {
      const res = await getMessages(room);
      setMessage(res.data || []);
    }
    fetchMessages();
  }, [room]);

  // Send message
  async function handleSend(e) {
    e.preventDefault();
    if (!content.trim()) return;

       if (!senderId) {
      alert("You must be logged in to send messages!");
       navigate('/login');
      return;
    }

    const messageData = {
      senderId,
      content,
      room,
      attachments: [],
    };

    const res = await sendMessage(messageData);
    if (res.data) {
      setMessage((prev) => [...prev, res.data]);
      setContent("");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Chat Room: {room}</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 400,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {message.length > 0 ? (
          message.map((msg) => (
            <div key={msg._id} style={{ marginBottom: 10 }}>
              <strong>{msg.sender?.username || "Anonymous"}:</strong> {msg.content}
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "80%", padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 5 }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatPage;
