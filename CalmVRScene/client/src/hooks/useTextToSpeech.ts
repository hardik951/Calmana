import { useState, useEffect, useCallback } from "react";
import { voiceService } from "../services/voiceService";

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(!!window.speechSynthesis);
    
    // Update speaking state when speech ends naturally
    const checkSpeakingState = () => {
      setIsSpeaking(voiceService.isSpeaking());
    };

    const interval = setInterval(checkSpeakingState, 100);
    return () => clearInterval(interval);
  }, []);

  const speak = useCallback(async (text: string, emotion?: string) => {
    if (!isSupported) {
      setError("Text-to-speech not supported in this browser");
      return false;
    }

    if (isSpeaking) {
      voiceService.stopSpeaking();
    }

    setError(null);
    setIsSpeaking(true);

    try {
      if (emotion) {
        await voiceService.speakTherapeuticResponse(text, emotion);
      } else {
        await voiceService.speak(text);
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Speech failed");
      return false;
    } finally {
      setIsSpeaking(false);
    }
  }, [isSupported, isSpeaking]);

  const stop = useCallback(() => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
    }
  }, [isSpeaking]);

  const updateVoiceConfig = useCallback((config: {
    rate?: number;
    pitch?: number;
    volume?: number;
    language?: string;
  }) => {
    voiceService.updateConfig(config);
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    error,
    isSupported,
    updateVoiceConfig
  };
}
