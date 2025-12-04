import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type SessionPhase = "idle" | "active" | "ended";

interface TherapySessionState {
  sessionPhase: SessionPhase;
  currentMessage: string | null;
  sessionStartTime: number | null;
  sessionDuration: number;
  conversationCount: number;
  isBreathingActive: boolean;
  therapistEmotion: 'neutral' | 'empathetic' | 'encouraging' | 'concerned';
  
  // Actions
  startSession: () => void;
  endSession: () => void;
  setCurrentMessage: (message: string) => void;
  clearCurrentMessage: () => void;
  incrementConversation: () => void;
  setBreathingActive: (active: boolean) => void;
  setTherapistEmotion: (emotion: 'neutral' | 'empathetic' | 'encouraging' | 'concerned') => void;
  updateSessionDuration: () => void;
  resetSession: () => void;
}

export const useTherapySession = create<TherapySessionState>()(
  subscribeWithSelector((set, get) => ({
    sessionPhase: "idle",
    currentMessage: null,
    sessionStartTime: null,
    sessionDuration: 0,
    conversationCount: 0,
    isBreathingActive: false,
    therapistEmotion: 'neutral',
    
    startSession: () => {
      const now = Date.now();
      set(() => ({ 
        sessionPhase: "active",
        sessionStartTime: now,
        sessionDuration: 0,
        conversationCount: 0
      }));
      
      console.log("Therapy session started");
    },
    
    endSession: () => {
      set(() => ({ 
        sessionPhase: "ended",
        isBreathingActive: false
      }));
      
      console.log("Therapy session ended");
    },
    
    setCurrentMessage: (message: string) => {
      set(() => ({ currentMessage: message }));
    },
    
    clearCurrentMessage: () => {
      set(() => ({ currentMessage: null }));
    },
    
    incrementConversation: () => {
      set((state) => ({ 
        conversationCount: state.conversationCount + 1 
      }));
    },
    
    setBreathingActive: (active: boolean) => {
      set(() => ({ isBreathingActive: active }));
      console.log(`Breathing exercise ${active ? 'started' : 'stopped'}`);
    },
    
    setTherapistEmotion: (emotion: 'neutral' | 'empathetic' | 'encouraging' | 'concerned') => {
      set(() => ({ therapistEmotion: emotion }));
    },
    
    updateSessionDuration: () => {
      const state = get();
      if (state.sessionPhase === 'active' && state.sessionStartTime) {
        const duration = Math.floor((Date.now() - state.sessionStartTime) / 1000);
        set(() => ({ sessionDuration: duration }));
      }
    },
    
    resetSession: () => {
      set(() => ({
        sessionPhase: "idle",
        currentMessage: null,
        sessionStartTime: null,
        sessionDuration: 0,
        conversationCount: 0,
        isBreathingActive: false,
        therapistEmotion: 'neutral'
      }));
    }
  }))
);

// Set up automatic session duration updates
let durationInterval: NodeJS.Timeout | null = null;

useTherapySession.subscribe(
  (state) => state.sessionPhase,
  (sessionPhase) => {
    if (sessionPhase === 'active') {
      // Start duration tracking
      durationInterval = setInterval(() => {
        useTherapySession.getState().updateSessionDuration();
      }, 1000);
    } else {
      // Stop duration tracking
      if (durationInterval) {
        clearInterval(durationInterval);
        durationInterval = null;
      }
    }
  }
);
