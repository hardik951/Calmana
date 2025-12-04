import { useEffect, useRef, useState } from "react";
import BabylonScene from "./BabylonScene";
import SessionUI from "./SessionUI";
import TherapyController from "./TherapyController";
import { useTherapySession } from "../lib/stores/useTherapySession";
import { useAudio } from "../lib/stores/useAudio";

export default function TherapySession() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isXRSupported, setIsXRSupported] = useState(false);
  const [isInVR, setIsInVR] = useState(false);
  const { sessionPhase, startSession } = useTherapySession();
  const { backgroundMusic, isMuted } = useAudio();

  useEffect(() => {
    // Check for WebXR support
    const checkXRSupport = async () => {
      if ('xr' in navigator) {
        try {
          const supported = await (navigator as any).xr?.isSessionSupported?.('immersive-vr');
          setIsXRSupported(supported);
        } catch (error) {
          console.log('WebXR not supported:', error);
          setIsXRSupported(false);
        }
      }
    };

    checkXRSupport();
  }, []);

  useEffect(() => {
    // Start background music when session begins
    if (backgroundMusic && sessionPhase === 'active' && !isMuted) {
      backgroundMusic.play().catch(error => {
        console.log('Background music play prevented:', error);
      });
    }

    return () => {
      if (backgroundMusic) {
        backgroundMusic.pause();
      }
    };
  }, [backgroundMusic, sessionPhase, isMuted]);

  const enterVR = async () => {
    if (canvasRef.current && isXRSupported) {
      try {
        setIsInVR(true);
        // VR session will be handled by Babylon.js scene
      } catch (error) {
        console.error('Failed to enter VR:', error);
        setIsInVR(false);
      }
    }
  };

  const exitVR = () => {
    setIsInVR(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* Babylon.js Canvas */}
      <canvas 
        ref={canvasRef}
        className="w-full h-full touch-action-none"
        style={{ display: 'block' }}
      />
      
      {/* Babylon Scene Component */}
      <BabylonScene 
        canvas={canvasRef.current}
        isInVR={isInVR}
        onVRStateChange={setIsInVR}
      />

      {/* Therapy AI Controller */}
      <TherapyController />

      {/* Session UI Overlay */}
      <SessionUI 
        isXRSupported={isXRSupported}
        isInVR={isInVR}
        onEnterVR={enterVR}
        onExitVR={exitVR}
        onStartSession={startSession}
      />
    </div>
  );
}
