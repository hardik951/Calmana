// src/components/AIChat.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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
  const [talkMode, setTalkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const stopRequestedRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const currentAudioRef = useRef(null); // Track currently playing bot audio

  // Speech Recognition Setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'en' ? 'en-US' : `${language}-IN`;
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (talkMode && !stopRequestedRef.current && !isSpeakingRef.current) {
          setTimeout(() => {
            if (recognitionRef.current) {
              recognitionRef.current.start();
              setIsListening(true);
            }
          }, 200);
        }
      };

      recognition.onerror = (err) => {
        console.warn('Recognition error', err);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, talkMode]);

  // Talk mode toggle
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (talkMode) {
      stopRequestedRef.current = false;
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Failed to start recognition:', err);
      }
    } else {
      stopRequestedRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      setIsListening(false);
    }
  }, [talkMode]);

  // Toggle manual listening (mic button)
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    // Stop any playing bot audio instantly
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
      isSpeakingRef.current = false;
    }

    if (isListening) {
      stopRequestedRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      setIsListening(false);
    } else {
      stopRequestedRef.current = false;
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Failed to start recognition:', err);
      }
    }
  };

  // Play bot reply with backend TTS
  const playBotSpeech = async (text) => {
    try {
      isSpeakingRef.current = true;

      if (isListening && recognitionRef.current) {
        stopRequestedRef.current = true;
        recognitionRef.current.stop();
        setIsListening(false);
      }

      const res = await axios.post(
        "http://localhost:5000/speak",
        { text, gender: "female" },
        { responseType: "blob" }
      );

      const audioBlob = new Blob([res.data], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      return new Promise((resolve) => {
        audio.onended = () => {
          isSpeakingRef.current = false;
          currentAudioRef.current = null;

          if (talkMode && recognitionRef.current && !stopRequestedRef.current) {
            try {
              recognitionRef.current.start();
              setIsListening(true);
            } catch (err) {
              console.warn('Failed to restart recognition after TTS:', err);
            }
          }
          resolve();
        };

        audio.onerror = () => {
          isSpeakingRef.current = false;
          currentAudioRef.current = null;
          resolve();
        };

        audio.play().catch(() => resolve());
      });
    } catch (err) {
      console.error("TTS error:", err);
      isSpeakingRef.current = false;
      currentAudioRef.current = null;
    }
  };

  // Send message to backend
  const sendMessage = async (messageText = input) => {
    if (!messageText || !messageText.trim()) return;

    const userMessage = { from: 'user', text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/chat', {
        message: messageText,
      });

      const botReply = res.data.reply || '🤖 Sorry, I didn’t get that.';
      setMessages((prev) => [...prev, { from: 'bot', text: botReply }]);

      if (talkMode) {
        try {
          stopRequestedRef.current = false;
          recognitionRef.current?.stop();
          setIsListening(false);
        } catch (err) {
          console.warn('Error stopping recognition before TTS:', err);
        }

        await playBotSpeech(botReply);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '⚠️ Unable to connect to server. Try again later.' },
      ]);
    } finally {
      setIsTyping(false);
    }
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
    <div className="flex flex-col h-full w-full px-4 sm:px-10 py-6 bg-gradient-to-br from-green-100 via-pink-100 to-green-50">
      <div className="flex justify-between mb-2">
        <button
          onClick={() => setTalkMode((prev) => !prev)}
          className={`px-3 py-1 rounded-md font-semibold text-white ${talkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'}`}
        >
          {talkMode ? '🎤 Talk Mode' : '💬 Chat Mode'}
        </button>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          {Object.entries(languages).map(([code, label]) => (
            <option key={code} value={code}>{label}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.from === 'bot' && <div className="text-2xl">🤖</div>}
            <div className={`max-w-xs px-4 py-2 rounded-xl shadow text-base ${msg.from === 'user' ? 'bg-green-200 text-green-900 ml-auto' : 'bg-green-100 text-green-800'}`}>
              {msg.text}
            </div>
            {msg.from === 'user' && <div className="text-2xl">🧑</div>}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-1 px-4">
            <div className="w-2 h-2 bg-green-700 rounded-full animate-ping" />
            <div className="w-2 h-2 bg-green-700 rounded-full animate-ping [animation-delay:.2s]" />
            <div className="w-2 h-2 bg-green-700 rounded-full animate-ping [animation-delay:.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="w-full border border-green-300 rounded-lg p-4 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="flex gap-2 mt-2 items-center">
          <button onClick={() => sendMessage()} className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
            Send
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleListening}
              className={`px-4 rounded-lg font-bold text-white ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'}`}
              title="Voice input"
            >
              🎤
            </button>
            <div className="text-sm">
              {isListening ? <span className="text-green-700">Listening…</span> : <span className="text-gray-500">Not listening</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
