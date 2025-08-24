import React, { useEffect, useRef, useState } from "react";

const VideoSession = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null); 
  const [aiReplies, setAiReplies] = useState([
    { id: 1, text: "Hello! How are you feeling today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState("Neutral");

  const startCameraAndMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
      setMicOn(true);

      const emotions = ["Happy", "Sad", "Neutral", "Anxious"];
      let index = 0;
      const intervalId = setInterval(() => {
        setDetectedEmotion(emotions[index]);
        index = (index + 1) % emotions.length;
      }, 5000);

      streamRef.current.intervalId = intervalId;
    } catch (err) {
      console.error("Error accessing camera and mic:", err);
      alert(`Error accessing camera/mic: ${err.message}`);
      setCameraOn(false);
      setMicOn(false);
    }
  };

  const stopCameraAndMic = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (streamRef.current.intervalId) {
        clearInterval(streamRef.current.intervalId);
      }
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
    setMicOn(false);
    setDetectedEmotion("Neutral");
  };

  const toggleCamera = () => {
    if (!streamRef.current) {
      startCameraAndMic();
      return;
    }
    const videoTracks = streamRef.current.getVideoTracks();
    if (videoTracks.length === 0) return;

    const isEnabled = videoTracks[0].enabled;
    videoTracks.forEach((track) => (track.enabled = !isEnabled));
    setCameraOn(!isEnabled);
    if (!isEnabled && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    } else if (isEnabled && videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleMic = () => {
    if (!streamRef.current) return;
    const audioTracks = streamRef.current.getAudioTracks();
    if (audioTracks.length === 0) return;

    const isEnabled = audioTracks[0].enabled;
    audioTracks.forEach((track) => (track.enabled = !isEnabled));
    setMicOn(!isEnabled);
  };

  useEffect(() => {
    return () => {
      stopCameraAndMic();
    };
  }, []);

  const handleSend = () => {
    if (!userInput.trim()) return;
    setAiReplies((prev) => [...prev, { id: Date.now(), text: userInput }]);
    setUserInput("");

    setTimeout(() => {
      setAiReplies((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "🤖 AI: I see, can you tell me more?" },
      ]);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

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
            {micOn ? "Mute Microphone" : "Unmute Microphone"}
          </button>

          {cameraOn && (
            <div className="mt-2 text-center bg-emerald-100 border border-emerald-300 rounded-md py-2 px-4 shadow-sm w-full max-w-xs">
              <span className="font-semibold text-emerald-800 mr-2">
                Emotion Detected:
              </span>
              <span className="text-emerald-700">{detectedEmotion}</span>
            </div>
          )}
        </div>
        {cameraOn && (
          <div className="mt-4 text-center text-gray-600 italic">
            AI emotion tracking active...
          </div>
        )}
      </div>

      {/* Right: Robotic Avatar & Chat */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4 text-center">
          AI Assistant
        </h2>
        {/* Robot Head and Body SVG */}
        <div className="flex flex-col items-center select-none mx-auto mb-4 w-48 h-48 rounded-lg shadow-lg bg-gradient-to-tr from-emerald-300 to-green-600 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-white mb-2"
            fill="none"
            viewBox="0 0 64 64"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <rect x="12" y="12" width="40" height="40" rx="8" ry="8" fill="#22c55e" />
            <circle cx="24" cy="28" r="4" fill="#fff" />
            <circle cx="40" cy="28" r="4" fill="#fff" />
            <rect x="22" y="38" width="20" height="6" rx="1" ry="1" fill="#14532d" />
          </svg>
          <div className="w-20 h-16 bg-emerald-400 rounded-b-xl shadow-lg" />
        </div>

        <div className="flex-1 overflow-y-auto border rounded-lg p-3 mb-4 bg-emerald-50">
          {aiReplies.map(({ id, text }) => (
            <div
              key={id}
              className={`mb-3 px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                id % 2 === 0
                  ? "bg-emerald-200 self-start text-emerald-900"
                  : "bg-emerald-600 text-white self-end"
              }`}
              style={{ alignSelf: id % 2 === 0 ? "flex-start" : "flex-end" }}
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
            onClick={handleSend}
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
