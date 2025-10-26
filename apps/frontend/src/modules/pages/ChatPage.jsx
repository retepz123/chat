import { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../components/api';

function ChatPage() {
  const [message, setMessage] = useState([]);
  const [content, setContent] = useState("");
  const [room] = useState('general');
  const senderId = '68fc47783e44cfa316e7be75';

  //load message on mount
  useEffect(() => {
    async function fetchMessages(){
      const res = await getMessages(room);
      setMessage(res.data || []);
    }
    fetchMessages();
  }, [room]);

  //send message
  async function handleSend(e){
    e.preventDefault();
    if (!content.trim())
      return;

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

