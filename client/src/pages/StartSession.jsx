import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartSession() {
  const navigate = useNavigate();
  const [sessionStarted, setSessionStarted] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI assistant. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');

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
          conversation: [...messages.map(m => `${m.sender}: ${m.text}`), `user: ${input}`].join("\n")
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
    <div className="relative w-screen h-screen min-h-screen min-w-full flex flex-col items-center justify-center overflow-hidden font-inter">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-emerald-200 via-pink-100 to-green-200 animate-gradient-green-pink-shift bg-[length:300%_300%]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-300 opacity-30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-pink-200 opacity-30 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-[30%] right-[-8%] w-[30vw] h-[30vw] bg-green-200 opacity-20 rounded-full blur-2xl animate-pulse" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4 text-center leading-tight drop-shadow-lg">
          Start a Session
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 text-center max-w-2xl leading-relaxed drop-shadow">
          Begin your mental wellness journey. Click below to start your mental health diagnosis session.
        </p>
        {!sessionStarted ? (
          <button
            onClick={() => setSessionStarted(true)}
            className="bg-emerald-600 text-white py-3 px-8 rounded-full text-base font-bold shadow-2xl hover:bg-emerald-700 hover:scale-105 transition-all duration-300 mb-8"
          >
            Start Session
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[60vh] md:h-[70vh] lg:h-[75vh]">
            <div className="bg-white/90 shadow-2xl rounded-3xl p-4 md:p-6 lg:p-8 w-full max-w-2xl h-full flex flex-col border border-emerald-100 animate-fade-in-up">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-emerald-700 mb-2 text-center">Mental Health Diagnosis</h3>
              <div className="flex-1 overflow-y-auto mb-2 space-y-2 pr-2 custom-scrollbar text-sm md:text-base lg:text-lg">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-2xl max-w-md md:max-w-xl text-sm md:text-base lg:text-lg ${msg.sender === 'user' ? 'bg-emerald-200 text-right' : 'bg-emerald-50 text-left'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSend} className="flex gap-2 md:gap-3 mt-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-full border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 text-white px-4 py-2 rounded-full font-semibold text-sm md:text-base hover:bg-emerald-600 transition-all duration-200 shadow-md"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
        <button
          onClick={() => navigate('/dashboard')}
          className="text-emerald-600 hover:underline font-medium flex items-center justify-center mt-8 text-sm md:text-base"
          aria-label="Back to Home"
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
