import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // TODO: Send `input` to backend and get response
    // const response = await fetch('BACKEND_API_URL', { method: 'POST', body: JSON.stringify({ message: input }) })
    // const data = await response.json();
    // setMessages(prev => [...prev, { text: data.reply, sender: "bot" }]);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="h-80 overflow-y-auto border-b border-gray-600 p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 self-end" : "bg-gray-700 self-start"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          className="flex-grow p-2 text-black rounded-l-lg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} className="bg-blue-600 px-4 py-2 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
