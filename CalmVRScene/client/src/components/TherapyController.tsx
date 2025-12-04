import { useEffect, useRef, useState } from "react";
import { useTherapySession } from "../lib/stores/useTherapySession";
import { useTherapistAnimation } from "../lib/stores/useTherapistAnimation";
import { useVoiceRecognition } from "../hooks/useVoiceRecognition";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { AITherapist, TherapyResponse } from "../services/aiTherapist";

export default function TherapyController() {
  const aiTherapistRef = useRef<AITherapist | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { 
    sessionPhase, 
    setCurrentMessage, 
    setTherapistEmotion,
    setBreathingActive,
    sessionDuration,
    incrementConversation
  } = useTherapySession();
  
  const { setSpeaking, performGesture } = useTherapistAnimation();
  const { transcript, resetTranscript } = useVoiceRecognition();
  const { speak, stop: stopSpeaking, isSpeaking } = useTextToSpeech();
  
  // Sync speaking state with therapist animation
  useEffect(() => {
    setSpeaking(isSpeaking);
  }, [isSpeaking, setSpeaking]);

  // Initialize AI therapist when session starts
  useEffect(() => {
    if (sessionPhase === 'active' && !aiTherapistRef.current) {
      console.log("Initializing AI therapist...");
      aiTherapistRef.current = new AITherapist();
      
      // Generate and speak opening prompt
      aiTherapistRef.current.generateOpeningPrompt().then(response => {
        handleTherapistResponse(response);
      });
    } else if (sessionPhase === 'ended' && aiTherapistRef.current) {
      // Generate session summary
      aiTherapistRef.current.generateSessionSummary().then(summary => {
        setCurrentMessage(summary);
        speak(summary, 'empathetic');
      });
      
      // Reset for next session
      aiTherapistRef.current.resetSession();
      aiTherapistRef.current = null;
      setSessionId(null);
    }
  }, [sessionPhase]);

  // Process user transcript when they finish speaking
  useEffect(() => {
    if (transcript && transcript.length > 10 && !isProcessing && sessionPhase === 'active') {
      const processUserInput = async () => {
        setIsProcessing(true);
        
        if (aiTherapistRef.current) {
          console.log("User said:", transcript);
          
          // Update session duration
          aiTherapistRef.current.updateSessionDuration(sessionDuration);
          
          // Get AI response
          const response = await aiTherapistRef.current.processUserInput(transcript);
          
          // Handle the response
          handleTherapistResponse(response);
          
          // Increment conversation count
          incrementConversation();
        }
        
        resetTranscript();
        setIsProcessing(false);
      };
      
      processUserInput();
    }
  }, [transcript, isProcessing, sessionPhase, sessionDuration]);

  const handleTherapistResponse = (response: TherapyResponse) => {
    console.log("Therapist response:", response);
    
    // Update UI with therapist message
    setCurrentMessage(response.message);
    
    // Update therapist emotion
    setTherapistEmotion(response.emotion);
    
    // Perform gesture if suggested
    if (response.gesture) {
      performGesture(response.gesture);
      setTimeout(() => {
        const { clearGesture } = useTherapistAnimation.getState();
        clearGesture();
      }, 2000);
    }
    
    // Speak the response with appropriate emotion
    speak(response.message, response.emotion);
    
    // Handle suggested actions
    if (response.suggestedAction === 'breathing') {
      // Trigger breathing exercise after speaking
      setTimeout(() => {
        setBreathingActive(true);
        
        // Generate breathing guidance
        if (aiTherapistRef.current) {
          aiTherapistRef.current.generateBreathingGuidance().then(breathingResponse => {
            setTimeout(() => {
              speak(breathingResponse.message, breathingResponse.emotion);
            }, 2000);
          });
        }
      }, 3000);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (isSpeaking) {
        stopSpeaking();
      }
    };
  }, []);

  return null;
}
