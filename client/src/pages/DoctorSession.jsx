import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  Send,
  Clock,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";

const defaultPatient = {
  name: "Emma Wilson",
  avatar: "/api/placeholder/64/64",
  age: 34,
  gender: "Female",
  reason: "Follow-up Consultation",
  lastVisit: "2023-10-15",
  allergies: "Penicillin",
};

const mockMessages = [
  { from: "patient", text: "Hello Dr. Smith, I'm ready for our session." },
  { from: "doctor", text: "Hi Emma, good to see you. How have you been feeling since our last talk?" },
];

export function DoctorSession({ patient = defaultPatient, onEndSession }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const videoRef = useRef(null);

  // Start/stop camera
  useEffect(() => {
    let stream;
    const startCamera = async () => {
      if (isCameraOn) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      } else if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { from: "doctor", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Main Video & Controls */}
      <main className="flex-1 flex flex-col bg-gray-900 relative">
        {/* Patient Video Placeholder */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full h-full bg-black rounded-xl flex items-center justify-center text-gray-500">
            <span className="text-2xl ml-4">{patient.name}'s Video</span>
          </div>
        </div>

        {/* Doctor Self-View */}
        <div className="absolute top-6 right-6 w-64 h-40 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-700 overflow-hidden">
          {isCameraOn ? (
            <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <VideoOff className="w-10 h-10" />
              <span className="ml-2">Camera Off</span>
            </div>
          )}
        </div>

        {/* Session Timer */}
        <div className="absolute top-6 left-6 bg-black/50 text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Clock className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="font-mono text-lg">24:15</span>
        </div>

        {/* Control Bar */}
        <div className="bg-gray-800/90 w-full py-4 flex justify-center items-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full w-16 h-16 bg-gray-700 hover:bg-gray-600 text-white"
            onClick={() => setIsMicOn(!isMicOn)}
          >
            {isMicOn ? <Mic className="w-7 h-7" /> : <MicOff className="w-7 h-7" />}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full w-16 h-16 bg-gray-700 hover:bg-gray-600 text-white"
            onClick={() => setIsCameraOn(!isCameraOn)}
          >
            {isCameraOn ? <Video className="w-7 h-7" /> : <VideoOff className="w-7 h-7" />}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full w-16 h-16 bg-gray-700 hover:bg-gray-600 text-white"
          >
            <ScreenShare className="w-7 h-7" />
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full h-16 px-6 flex items-center gap-2"
            onClick={onEndSession}
          >
            <PhoneOff className="w-7 h-7" />
            <span className="text-lg font-semibold">End Call</span>
          </Button>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-96 h-screen flex flex-col bg-gradient-to-b from-emerald-100 via-pink-100 to-green-100 border-l border-gray-300">
        {/* Patient Info Header */}
        <div className="p-6 border-b border-green-200/80 flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-green-400">
            <AvatarImage src={patient.avatar} alt={patient.name} />
            <AvatarFallback className="text-xl bg-green-200 text-green-800">
              {patient.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-green-900">{patient.name}</h2>
            <p className="text-md text-green-700">{patient.reason}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3 bg-green-100/80 m-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          {/* Details */}
          <TabsContent value="details" className="flex-1 overflow-y-auto px-6 space-y-4">
            <Card className="bg-white/80">
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between"><span>Age</span><span>{patient.age}</span></div>
                <div className="flex justify-between"><span>Gender</span><span>{patient.gender}</span></div>
                <div className="flex justify-between"><span>Last Visit</span><span>{patient.lastVisit}</span></div>
              </CardContent>
            </Card>
            <Card className="bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-700">Alerts & Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="destructive">{patient.allergies}</Badge>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes */}
          <TabsContent value="notes" className="flex-1 flex flex-col overflow-y-auto px-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Private Session Notes</h3>
            <Textarea placeholder="Start typing your private notes here..." className="flex-1 bg-white/90 min-h-[300px]" />
            <Button className="w-full bg-green-600 hover:bg-green-700">Save Note</Button>
          </TabsContent>

          {/* Chat */}
          <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 px-6 pb-4">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-white/80 rounded-lg">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-[80%] ${msg.from === 'doctor' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-white"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="icon" className="bg-green-600 hover:bg-green-700" onClick={handleSendMessage}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
