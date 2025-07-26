// src/components/AIChat.jsx
import React, { useState, useEffect, useRef } from 'react';

const languages = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
  te: 'Telugu',
};

export default function AIChat() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hello! I’m your Calmana assistant. How can I support you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'en' ? 'en-US' : language + '-IN';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + transcript);
      };

      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: '🤖 Thank you for sharing. I’m here to support you. If this is urgent, please talk to someone you trust or call for help.',
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full w-full px-4 sm:px-10 py-6 bg-gradient-to-br from-green-100 via-pink-100 to-green-50 animate-gradient-green-pink-shift">
      {/* Language Selector */}
      <div className="flex justify-end mb-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm shadow"
        >
          {Object.entries(languages).map(([code, label]) => (
            <option key={code} value={code}>{label}</option>
          ))}
        </select>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 items-end animate-fade-in-up ${
              msg.from === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.from === 'bot' && (
              <div className="text-2xl">🤖</div>
            )}
            <div
              className={`max-w-xs px-4 py-2 rounded-xl shadow-chat-bubble text-base ${
                msg.from === 'user'
                  ? 'bg-userBubble text-green-900 ml-auto'
                  : 'bg-botBubble text-green-800'
              }`}
            >
              {msg.text}
            </div>
            {msg.from === 'user' && (
              <div className="text-2xl">🧑</div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-1 px-4 animate-fade-in">
            <div className="w-2 h-2 bg-green-700 rounded-full animate-typing-blink" />
            <div className="w-2 h-2 bg-green-700 rounded-full animate-typing-blink [animation-delay:.2s]" />
            <div className="w-2 h-2 bg-green-700 rounded-full animate-typing-blink [animation-delay:.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input & Controls */}
      <div className="mt-4">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="w-full border border-green-300 rounded-lg p-4 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={sendMessage}
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Send
          </button>
          <button
            onClick={toggleListening}
            className={`px-4 rounded-lg font-bold text-white transition ${
              isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
            }`}
            title="Voice input"
          >
            🎤
          </button>
        </div>
      </div>
    </div>
  );
}
