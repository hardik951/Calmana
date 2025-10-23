import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  Send,
  User,
  FileText,
  MessageSquare,
  Clock,
} from "lucide-react";
// Corrected paths for components in src/components/ui/
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";

// Mock data for the session - in a real app, this would be a prop
const defaultPatient = {
  name: "Emma Wilson",
  avatar: "/api/placeholder/64/64",
  age: 34,
  gender: "Female",
  reason: "Follow-up Consultation",
  lastVisit: "2023-10-15",
  allergies: "Penicillin",
};

// Mock chat messages
const mockMessages = [
  { from: "patient", text: "Hello Dr. Smith, I'm ready for our session." },
  { from: "doctor", text: "Hi Emma, good to see you. How have you been feeling since our last talk?" },
];

export function DoctorSession({ patient = defaultPatient, onEndSession }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { from: "doctor", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    // Main container is full-screen, flex row
    <div className="flex h-screen w-full bg-gray-100">
      
      {/* Main Video and Controls Area */}
      <main className="flex-1 flex flex-col bg-gray-900 relative">
        
        {/* Patient Video Feed (Placeholder) */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full h-full bg-black rounded-xl flex items-center justify-center text-gray-500">
            {/* TODO: Wire up Patient Video SDK Element */}
            <VideoOff className="w-24 h-24" />
            <span className="text-2xl ml-4">{patient.name}'s Video</span>
          </div>
        </div>

        {/* Doctor Self-View (Placeholder) */}
        <div className="absolute top-6 right-6 w-64 h-40 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-700">
          {/* TODO: Wire up Doctor Video SDK Element */}
          <div className="h-full flex items-center justify-center text-gray-400">
            {isCameraOn ? "My Video" : <VideoOff className="w-10 h-10" />}
          </div>
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
          
          {/* ===== "END CALL" BUTTON - UPDATED ===== */}
          <Button
            variant="destructive"
            size="lg"
            // Updated classes to make a "pill" shape
            className="rounded-full h-16 px-6 flex items-center gap-2" 
            onClick={onEndSession} 
          >
            <PhoneOff className="w-7 h-7" />
            {/* Added text label */}
            <span className="text-lg font-semibold">End Call</span> 
          </Button>
          {/* ======================================= */}

        </div>
      </main>

      {/* Right Sidebar - Patient Info, Notes, Chat */}
      <aside className="w-96 h-screen flex flex-col bg-gradient-to-b from-emerald-100 via-pink-100 to-green-100 border-l border-gray-300">
        
        {/* Patient Header */}
        <div className="p-6 border-b border-green-200/80">
          <div className="flex items-center gap-4">
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
        </div>

        {/* Tabs for Details, Notes, Chat */}
        <Tabs defaultValue="details" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3 bg-green-100/80 m-4">
            <TabsTrigger value="details"><User className="w-4 h-4 mr-2" />Details</TabsTrigger>
            <TabsTrigger value="notes"><FileText className="w-4 h-4 mr-2" />Notes</TabsTrigger>
            <TabsTrigger value="chat"><MessageSquare className="w-4 h-4 mr-2" />Chat</TabsTrigger>
          </TabsList>

          {/* Details Tab Content */}
          <TabsContent value="details" className="flex-1 overflow-y-auto px-6 space-y-4">
            <Card className="bg-white/80">
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between"><span className="text-gray-500">Age</span><span className="font-semibold text-gray-800">{patient.age}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Gender</span><span className="font-semibold text-gray-800">{patient.gender}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Last Visit</span><span className="font-semibold text-gray-800">{patient.lastVisit}</span></div>
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
            {/* TODO: Add more patient history components */}
          </TabsContent>

          {/* Notes Tab Content */}
          <TabsContent value="notes" className="flex-1 flex flex-col overflow-y-auto px-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Private Session Notes</h3>
            <Textarea 
              placeholder="Start typing your private notes here... (Only visible to you)" 
              className="flex-1 bg-white/90 min-h-[300px]"
            />
            <Button className="w-full bg-green-600 hover:bg-green-700">Save Note</Button>
          </TabsContent>

          {/* Chat Tab Content */}
          <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 px-6 pb-4">
            {/* Message Display Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-white/80 rounded-lg">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.from === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-[80%] ${
                    msg.from === 'doctor' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            {/* Chat Input Area */}
            <div className="flex gap-2">
              <Input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-white"
                value={newMessage}
                onChange={(e) => setNewMessage(e.targe.value)}
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
