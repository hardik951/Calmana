import { create } from "zustand";

interface TherapistAnimationState {
  isSpeaking: boolean;
  currentGesture: string | null;
  
  setSpeaking: (speaking: boolean) => void;
  performGesture: (gesture: string) => void;
  clearGesture: () => void;
}

export const useTherapistAnimation = create<TherapistAnimationState>((set) => ({
  isSpeaking: false,
  currentGesture: null,
  
  setSpeaking: (speaking: boolean) => {
    set({ isSpeaking: speaking });
  },
  
  performGesture: (gesture: string) => {
    set({ currentGesture: gesture });
  },
  
  clearGesture: () => {
    set({ currentGesture: null });
  },
}));
