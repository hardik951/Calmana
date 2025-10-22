// src/components/AvatarChat.jsx
import React, { useEffect, useRef, useState } from 'react';

const EMOJI_BY_MOOD = {
  happy: '😊', sad: '😔', angry: '😠', anxious: '😟', neutral: '🙂'
};

// Simple avatar (SVG) that animates mouth when speaking
function TalkingAvatar({ isSpeaking, mood = 'neutral' }) {
  return (
    <div className="avatar-wrap">
      <div className="avatar-face">
        <div className="avatar-emoji">{EMOJI_BY_MOOD[mood] || '🙂'}</div>
        <div className={`avatar-mouth ${isSpeaking ? 'speaking' : ''}`} />
      </div>
    </div>
  );
}

export default function AvatarChat() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi, I’m Calmana. I’m here to support your mental well-being. What’s on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [mood, setMood] = useState('neutral');

  const recognitionRef = useRef(null);
  const endRef = useRef(null);

  // ---- STT (browser) ----
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const recog = new SR();
    recog.lang = 'en-US';
    recog.continuous = false;
    recog.interimResults = false;

    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(prev => (prev ? prev + ' ' : '') + transcript);
    };
    recog.onend = () => setListening(false);

    recognitionRef.current = recog;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return alert('SpeechRecognition not supported in this browser.');
    if (!listening) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // ---- TTS (browser) ----
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 1.0;
    utter.pitch = 1.0;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  // ---- Send to Flask /chat ----
  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg) return;

    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setInput('');

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, session_id: 'web-session' })
      });
      const data = await res.json();

      if (data.error) {
        setMessages(prev => [...prev, { from: 'bot', text: '⚠️ Server error. Please try again.' }]);
        return;
      }

      setMood(data.emotion || 'neutral');
      setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
      speak(data.reply);
    } catch (e) {
      setMessages(prev => [...prev, { from: 'bot', text: '⚠️ Unable to reach server.' }]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSpeaking]);

  return (
    <div className="chat-shell">
      <div className="topbar">
        <TalkingAvatar isSpeaking={isSpeaking} mood={mood} />
        <div className="title">
          <div className="name">Calmana</div>
          <div className="sub">Compassionate, trauma-informed assistant</div>
        </div>
      </div>

      <div className="log">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            <div className="bubble">{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="composer">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Speak or type your thoughts…"
        />
        <div className="actions">
          <button onClick={sendMessage} className="btn send">Send</button>
          <button onClick={startListening} className={`btn mic ${listening ? 'live' : ''}`}>
            {listening ? 'Stop 🎙️' : 'Speak 🎙️'}
          </button>
        </div>
      </div>
    </div>
  );
}
