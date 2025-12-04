import { useState, useEffect, useCallback, useRef } from "react";
import { voiceService } from "../services/voiceService";

export function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const onResultRef = useRef<((transcript: string) => void) | null>(null);

  useEffect(() => {
    setIsSupported(voiceService.isSupported());
  }, []);

  const startListening = useCallback((onResult?: (transcript: string) => void) => {
    if (!isSupported) {
      setError("Speech recognition not supported in this browser");
      return false;
    }

    if (isListening) {
      return false;
    }

    onResultRef.current = onResult || null;
    setError(null);
    setTranscript("");

    const success = voiceService.startListening(
      (newTranscript: string) => {
        setTranscript(newTranscript);
        if (onResultRef.current) {
          onResultRef.current(newTranscript);
        }
      },
      () => {
        setIsListening(false);
      }
    );

    if (success) {
      setIsListening(true);
    } else {
      setError("Failed to start voice recognition");
    }

    return success;
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isListening) {
        voiceService.stopListening();
      }
    };
  }, [isListening]);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
}
