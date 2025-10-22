import React, { useEffect, useRef, useState } from "react";

const VideoSession = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How are you feeling today?", sender: "ai" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);

  // Emotion states
  const [detectedEmotion, setDetectedEmotion] = useState("Neutral");
  const [chatEmotion, setChatEmotion] = useState("Neutral");

  // backend config
  const CHATBOT_API = "http://127.0.0.1:5000"; // Flask backend (app.py)
  const EMOTION_API = "http://127.0.0.1:5001"; // emotion endpoint also on Flask
  const SESSION_ID = "default-session";

  // Web Speech API refs
  const recognitionRef = useRef(null);

  // 🔹 Chat container ref for auto-scroll
  const chatContainerRef = useRef(null);

  const sendFrameToBackend = async () => {
    if (!videoRef.current || !cameraOn) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg"); // Base64 encoded

    try {
      const res = await fetch(`${EMOTION_API}/analyze_frame`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });

      const data = await res.json();
      if (data.emotion) {
        setDetectedEmotion(data.emotion);
      }
    } catch (err) {
      console.error("⚠️ Error sending frame:", err);
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false, // mic handled separately via STT
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert(`Error accessing camera: ${err.message}`);
      setCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
    setDetectedEmotion("Neutral");
  };

  const toggleCamera = () => {
    if (cameraOn) {
      // 🔴 Turn off camera completely
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraOn(false);
      setDetectedEmotion("Neutral");
    } else {
      // 🟢 Turn on camera
      startCamera();
    }
  };

  // 🎤 Toggle Mic (speech-to-text)
  const toggleMic = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (!micOn) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleSend(transcript); // auto-send after speaking
      };

      recognition.onerror = (err) => {
        console.error("Speech recognition error:", err);
      };

      recognition.start();
      recognitionRef.current = recognition;
      setMicOn(true);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setMicOn(false);
    }
  };

  // 🎥 Start camera on mount & auto-send frames every 2s
  useEffect(() => {
    let interval;

    if (cameraOn) {
      interval = setInterval(() => {
        sendFrameToBackend();
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cameraOn]);

  // 📨 Send user message → backend chat
  const handleSend = async (overrideInput) => {
    const messageText = overrideInput || userInput;
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch(`${CHATBOT_API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          session_id: SESSION_ID,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const aiMessage = {
        id: Date.now() + 1,
        text: data.reply || "⚠️ No reply from server",
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);

      if (data.emotion) {
        setChatEmotion(data.emotion);
      }

      // 🗣️ Play AI response using backend TTS instead of browser voice
      try {
        const audioRes = await fetch(`${CHATBOT_API}/speak`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: aiMessage.text, gender: "female" }),
        });
        if (audioRes.ok) {
          const blob = await audioRes.blob();
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          audio.play();
        } else {
          if (window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(aiMessage.text);
            utterance.rate = 1;
            utterance.pitch = 0.8;
            window.speechSynthesis.speak(utterance);
          }
        }
      } catch (ttsErr) {
        console.error("TTS error:", ttsErr);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMsg = {
        id: Date.now() + 2,
        text: "⚠️ Error connecting to chatbot server.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setUserInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // 🔹 Auto-scroll when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // smooth scrolling
      });
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-6 gap-6">
      {/* Left: User Camera */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4 text-center">
          Your Camera
        </h2>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="rounded-xl w-full h-[400px] object-cover bg-black"
        />
        <div className="mt-4 flex justify-center flex-col items-center gap-4">
          <button
            onClick={toggleCamera}
            className={`px-6 py-2 rounded-full font-semibold shadow-md transition-colors duration-300 ${
              cameraOn
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
          </button>

          <button
            onClick={toggleMic}
            disabled={!cameraOn}
            className={`px-6 py-2 rounded-full font-semibold shadow-md transition-colors duration-300 ${
              micOn
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {micOn ? "Stop Talking" : "Unmute Microphone"}
          </button>

          {cameraOn && (
            <div className="mt-2 text-center bg-emerald-100 border border-emerald-300 rounded-md py-2 px-4 shadow-sm w-full max-w-xs">
              <span className="font-semibold text-emerald-800 mr-2">
                Video Emotion:
              </span>
              <span className="text-emerald-700">{detectedEmotion}</span>
            </div>
          )}
        </div>
        {cameraOn && (
          <div className="mt-4 text-center text-gray-600 italic">
            AI video emotion tracking active...
          </div>
        )}
      </div>

      {/* Right: AI Chat */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2 text-center">
          AI Assistant
        </h2>
        <div className="text-center mb-3 text-sm text-gray-700">
          Chat Emotion: <span className="font-semibold">{chatEmotion}</span>
        </div>

        {/* 🔹 Scrollable chat with auto-scroll */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto border rounded-lg p-3 mb-4 bg-emerald-50 max-h-[400px]"
        >
          {messages.map(({ id, text, sender }) => (
            <div
              key={id}
              className={`mb-3 px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                sender === "ai"
                  ? "bg-emerald-200 self-start text-emerald-900"
                  : "bg-emerald-600 text-white self-end"
              }`}
              style={{
                alignSelf: sender === "ai" ? "flex-start" : "flex-end",
              }}
            >
              {text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Say something..."
            className="flex-grow border border-emerald-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleSend()}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoSession;
