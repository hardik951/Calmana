import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useTherapySession } from "../lib/stores/useTherapySession";
import { useAudio } from "../lib/stores/useAudio";
import { useVoiceRecognition } from "../hooks/useVoiceRecognition";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

interface SessionUIProps {
  isXRSupported: boolean;
  isInVR: boolean;
  onEnterVR: () => void;
  onExitVR: () => void;
  onStartSession: () => void;
}

export default function SessionUI({ 
  isXRSupported, 
  isInVR, 
  onEnterVR, 
  onExitVR, 
  onStartSession 
}: SessionUIProps) {
  const [showControls, setShowControls] = useState(!isInVR);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  
  const { 
    sessionPhase, 
    currentMessage, 
    sessionDuration,
    endSession 
  } = useTherapySession();
  
  const { isMuted, toggleMute } = useAudio();
  
  const {
    isListening,
    startListening,
    stopListening,
    transcript
  } = useVoiceRecognition();
  
  const {
    isSpeaking,
    speak,
    stop: stopSpeaking
  } = useTextToSpeech();

  // Hide/show controls based on VR state
  useEffect(() => {
    setShowControls(!isInVR);
  }, [isInVR]);

  // Format session duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleBreathingToggle = () => {
    const newState = !isBreathingActive;
    setIsBreathingActive(newState);
    // Update the session store to control the breathing orb
    const { setBreathingActive } = useTherapySession.getState();
    setBreathingActive(newState);
  };

  const handleEndSession = () => {
    endSession();
    if (isSpeaking) {
      stopSpeaking();
    }
    if (isListening) {
      stopListening();
    }
  };

  if (!showControls && isInVR) {
    return null; // Hide UI in VR mode
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Main UI Panel */}
      <div className="absolute top-4 left-4 right-4 pointer-events-auto">
        <Card className="bg-black/80 text-white border-gray-600">
          <CardContent className="p-4">
            {/* Session Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  sessionPhase === 'active' ? 'bg-green-500' : 
                  sessionPhase === 'ended' ? 'bg-red-500' : 'bg-gray-500'
                }`} />
                <span className="text-sm font-medium">
                  {sessionPhase === 'idle' && 'Ready to Begin'}
                  {sessionPhase === 'active' && `Session Active - ${formatDuration(sessionDuration)}`}
                  {sessionPhase === 'ended' && 'Session Complete'}
                </span>
              </div>
              
              {/* VR Button */}
              {isXRSupported && (
                <Button
                  onClick={isInVR ? onExitVR : onEnterVR}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  {isInVR ? 'Exit VR' : 'Enter VR'}
                </Button>
              )}
            </div>

            {/* Session Controls */}
            <div className="flex items-center space-x-2 mb-4">
              {sessionPhase === 'idle' && (
                <Button 
                  onClick={onStartSession}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Start Therapy Session
                </Button>
              )}
              
              {sessionPhase === 'active' && (
                <>
                  <Button 
                    onClick={handleEndSession}
                    variant="destructive"
                  >
                    End Session
                  </Button>
                  
                  <Button
                    onClick={handleMicToggle}
                    variant={isListening ? "default" : "outline"}
                    size="sm"
                  >
                    {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    onClick={toggleMute}
                    variant="outline"
                    size="sm"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    onClick={handleBreathingToggle}
                    variant={isBreathingActive ? "default" : "outline"}
                    size="sm"
                  >
                    {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    Breathing
                  </Button>
                </>
              )}
            </div>

            {/* Current Message Display */}
            {currentMessage && (
              <div className="bg-gray-800 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-300 mb-1">Therapist:</p>
                <p className="text-white">{currentMessage}</p>
                {isSpeaking && (
                  <div className="flex items-center mt-2 text-blue-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2" />
                    <span className="text-xs">Speaking...</span>
                  </div>
                )}
              </div>
            )}

            {/* Voice Recognition Feedback */}
            {isListening && (
              <div className="bg-green-900/50 p-3 rounded-lg mb-4">
                <p className="text-sm text-green-300 mb-1">Listening:</p>
                <p className="text-white">{transcript || "Speak now..."}</p>
                <div className="flex items-center mt-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                  <span className="text-xs">Recording...</span>
                </div>
              </div>
            )}

            {/* Breathing Instructions */}
            {isBreathingActive && (
              <div className="bg-blue-900/50 p-3 rounded-lg">
                <p className="text-sm text-blue-300 mb-1">Breathing Exercise:</p>
                <p className="text-white">Follow the breathing orb - inhale as it grows, exhale as it shrinks</p>
                <div className="flex items-center mt-2 text-blue-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2" />
                  <span className="text-xs">Active</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Session Help */}
      {sessionPhase === 'idle' && (
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
          <Card className="bg-gray-900/90 text-white border-gray-600">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Welcome to VR Therapy</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Take a seat and get comfortable in the therapy chair</li>
                <li>• Your AI therapist will guide you through the session</li>
                <li>• Use the breathing orb for relaxation exercises</li>
                <li>• Speak naturally - your voice will be heard and understood</li>
                {isXRSupported && <li>• Enter VR mode for a fully immersive experience</li>}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
