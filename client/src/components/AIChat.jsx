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
  const [talkMode, setTalkMode] = useState(false); // Talk mode toggle
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const stopRequestedRef = useRef(false); // Track manual stop

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
        setInput(transcript); // place transcript into input
        sendMessage(transcript); // auto-send when voice finishes
      };

      // DO NOT auto-restart here — restart after TTS finishes so conversation doesn't overlap.
      recognition.onend = () => {
        setIsListening(false);
        // no auto restart here — handled after TTS completes
      };

      recognition.onerror = (err) => {
        console.warn('Recognition error', err);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, talkMode]);

  // When talkMode toggles ON/OFF, start/stop recognition accordingly
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (talkMode) {
      // user turned on Talk Mode -> start listening (user click is a gesture so browser permits)
      stopRequestedRef.current = false;
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Failed to start recognition:', err);
      }
    } else {
      // talk mode off -> stop listening
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
    if (isListening) {
      // user manually stops: set stopRequested so auto-restart won't happen
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

  // Play bot reply with backend TTS and restart mic AFTER audio ends (if talkMode still active)
  const playBotSpeech = async (text) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/speak",
        { text, gender: "female" },
        { responseType: "blob" }
      );

      const audioBlob = new Blob([res.data], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      return new Promise((resolve, reject) => {
        const audio = new Audio(audioUrl);

        audio.onended = () => {
          // restart recognition only if talk mode is still on and the user didn't manually stop
          if (talkMode && !stopRequestedRef.current) {
            try {
              recognitionRef.current?.start();
              setIsListening(true);
            } catch (err) {
              console.warn('Failed to restart recognition after TTS:', err);
            }
          }
          resolve();
        };

        audio.onerror = (e) => {
          console.error('Audio playback error', e);
          resolve(); // still resolve so app continues
        };

        // attempt to play; browsers may block autoplay in some contexts but since this is triggered after a user action it should work
        audio.play().catch((err) => {
          console.warn('Playback failed or blocked:', err);
          // even if blocked, resolve to avoid hanging
          resolve();
        });
      });
    } catch (err) {
      console.error("TTS error:", err);
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

      // If Talk Mode: stop recognition (if running), play TTS, then playBotSpeech will restart mic when audio finishes
      if (talkMode) {
        try {
          // Stop recognition now to avoid overlapping capture while TTS plays
          stopRequestedRef.current = false; // don't treat this as manual stop
          recognitionRef.current?.stop();
          setIsListening(false);
        } catch (err) {
          console.warn('Error stopping recognition before TTS:', err);
        }

        // Wait for playback to finish (playBotSpeech resolves after audio.onended)
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

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full w-full px-4 sm:px-10 py-6 bg-gradient-to-br from-green-100 via-pink-100 to-green-50">
      {/* Language selector + Mode toggle */}
      <div className="flex justify-between mb-2">
        <button
          onClick={() => setTalkMode((prev) => !prev)}
          className={`px-3 py-1 rounded-md font-semibold text-white ${
            talkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'
          }`}
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

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.from === 'bot' && <div className="text-2xl">🤖</div>}
            <div className={`max-w-xs px-4 py-2 rounded-xl shadow text-base ${
              msg.from === 'user'
                ? 'bg-green-200 text-green-900 ml-auto'
                : 'bg-green-100 text-green-800'
            }`}>
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

      {/* Input controls */}
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
          <button
            onClick={() => sendMessage()}
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            Send
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleListening}
              className={`px-4 rounded-lg font-bold text-white ${
                isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
              }`}
              title="Voice input"
            >
              🎤
            </button>
            {/* small visual indicator */}
            <div className="text-sm">
              {isListening ? <span className="text-green-700">Listening…</span> : <span className="text-gray-500">Not listening</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
