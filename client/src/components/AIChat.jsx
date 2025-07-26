// src/components/AIChat.jsx
import React, { useState } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I’m your Calmana assistant. How can I support you today?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');

    // Stub bot response after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text:
            "Thank you for sharing. Remember, I'm here to listen. If this is an emergency, please seek professional help.",
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto flex flex-col h-96">
      <h3 className="text-xl font-semibold text-green-800 mb-4">Calmana Chat</h3>
      <div className="flex-1 overflow-y-auto mb-4 border border-green-200 rounded p-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 max-w-xs px-3 py-2 rounded-lg ${
              msg.from === 'user'
                ? 'bg-green-200 self-end text-green-900'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <textarea
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        className="border border-green-300 rounded p-2 resize-none"
      />
      <button
        onClick={sendMessage}
        className="mt-2 w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold transition"
      >
        Send
      </button>
    </div>
  );
}
