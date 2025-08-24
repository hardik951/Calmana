import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartSession() {
  const navigate = useNavigate();
  const [sessionStarted, setSessionStarted] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI assistant. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');
  const [diagnosedIssue, setDiagnosedIssue] = useState('generalized anxiety'); // can be dynamic later

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to UI
    setMessages([...messages, { sender: 'user', text: input }]);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: [...messages.map(m => `${m.sender}: ${m.text}`), `user: ${input}`].join("\n"),
          diagnosed_issue: diagnosedIssue
        })
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: "⚠️ Error fetching reply" }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "❌ Connection error" }]);
    }

    setInput("");
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center font-inter">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-200 via-pink-100 to-green-200 animate-gradient-green-pink-shift" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
          Start a Session
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
          Begin your mental wellness journey. Click below to start your session.
        </p>

        {!sessionStarted ? (
          <>
            <button
              onClick={() => setSessionStarted(true)}
              className="bg-emerald-600 text-white py-3 px-8 rounded-full font-bold shadow-2xl hover:bg-emerald-700 hover:scale-105 transition-all duration-300 mb-4"
            >
              Start AI Diagnosis 
            </button>
            <button
              onClick={() => navigate('/video-session')}
              className="bg-green-600 text-white py-3 px-8 rounded-full font-bold shadow-2xl hover:bg-green-700 hover:scale-105 transition-all duration-300"
            >
              Start Video Session
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[70vh]">
            <div className="bg-white/90 shadow-2xl rounded-3xl p-6 w-full max-w-2xl h-full flex flex-col border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-700 mb-2 text-center">Mental Health Diagnosis</h3>
              <div className="flex-1 overflow-y-auto mb-2 space-y-2 pr-2 custom-scrollbar">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-2xl max-w-md text-sm ${msg.sender === 'user' ? 'bg-emerald-200 text-right' : 'bg-emerald-50 text-left'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSend} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-full border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button type="submit" className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate('/dashboard')}
          className="text-emerald-600 hover:underline font-medium mt-8 text-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
