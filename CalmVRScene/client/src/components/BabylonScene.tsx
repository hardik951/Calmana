import { useEffect, useRef } from "react";
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, Color3, WebXRDefaultExperience, WebXRState } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import TherapyRoom from "./TherapyRoom";
import TherapistCharacter from "./TherapistCharacter";
import BreathingOrb from "./BreathingOrb";
import VRControls from "./VRControls";
import { useTherapySession } from "../lib/stores/useTherapySession";
import { useTherapistAnimation } from "../lib/stores/useTherapistAnimation";

interface BabylonSceneProps {
  canvas: HTMLCanvasElement | null;
  isInVR: boolean;
  onVRStateChange: (inVR: boolean) => void;
}

export default function BabylonScene({ canvas, isInVR, onVRStateChange }: BabylonSceneProps) {
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const xrExperienceRef = useRef<WebXRDefaultExperience | null>(null);
  const therapistRef = useRef<TherapistCharacter | null>(null);
  const breathingOrbRef = useRef<BreathingOrb | null>(null);
  
  const { therapistEmotion, isBreathingActive } = useTherapySession();
  const { isSpeaking, currentGesture } = useTherapistAnimation();

  useEffect(() => {
    if (!canvas) return;

    // Create Babylon.js engine and scene
    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      antialias: true,
      alpha: false,
      powerPreference: "default"
    });

    engineRef.current = engine;

    const scene = new Scene(engine);
    sceneRef.current = scene;

    // Set up camera for seated experience
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      10,
      Vector3.Zero(),
      scene
    );
    
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);
    
    // Position camera for seated therapy setup
    camera.setPosition(new Vector3(0, 1.6, 3)); // Eye level seated position
    camera.setTarget(new Vector3(0, 1.6, 0)); // Looking at therapist area

    // Lighting setup for calm therapy environment
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    light.diffuse = new Color3(1, 0.95, 0.8); // Warm lighting

    // Initialize WebXR for VR support
    const initializeXR = async () => {
      try {
        const xrExperience = await WebXRDefaultExperience.CreateAsync(scene, {
          floorMeshes: [],
          optionalFeatures: true,
        });
        
        xrExperienceRef.current = xrExperience;
        
        // Handle VR session state changes
        xrExperience.baseExperience.onStateChangedObservable.add((state: WebXRState) => {
          switch (state) {
            case WebXRState.IN_XR:
              onVRStateChange(true);
              // Adjust camera for VR seated position
              if (xrExperience.baseExperience.camera) {
                xrExperience.baseExperience.camera.position = new Vector3(0, 0, 0);
              }
              break;
            case WebXRState.NOT_IN_XR:
              onVRStateChange(false);
              break;
          }
        });

      } catch (error) {
        console.log("WebXR initialization failed:", error);
      }
    };

    initializeXR();

    // Start render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle window resize
    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (xrExperienceRef.current) {
        xrExperienceRef.current.dispose();
      }
      scene.dispose();
      engine.dispose();
    };
  }, [canvas, onVRStateChange]);

  // Render scene components
  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;
    
    // Initialize therapy room environment
    const therapyRoom = new TherapyRoom(scene);
    
    // Initialize therapist character
    const therapist = new TherapistCharacter(scene);
    therapist.position = new Vector3(0, 0, -2); // Seated across from user
    therapistRef.current = therapist;
    
    // Initialize breathing orb
    const breathingOrb = new BreathingOrb(scene);
    breathingOrb.position = new Vector3(1.5, 1.2, -1); // To the side
    breathingOrbRef.current = breathingOrb;
    
    // Initialize VR controls if in VR
    if (isInVR && xrExperienceRef.current) {
      new VRControls(scene, xrExperienceRef.current);
    }

    return () => {
      // Clean up therapist character
      if (therapistRef.current) {
        therapistRef.current.dispose();
        therapistRef.current = null;
      }
      breathingOrbRef.current = null;
    };
  }, [sceneRef.current, isInVR]);

  // Update therapist emotion when it changes
  useEffect(() => {
    if (therapistRef.current) {
      therapistRef.current.setEmotion(therapistEmotion);
    }
  }, [therapistEmotion]);

  // Update therapist speaking animation
  useEffect(() => {
    if (therapistRef.current) {
      therapistRef.current.speakAnimation(isSpeaking);
    }
  }, [isSpeaking]);

  // Perform therapist gesture
  useEffect(() => {
    if (therapistRef.current && currentGesture) {
      therapistRef.current.performGesture(currentGesture);
    }
  }, [currentGesture]);

  // Control breathing orb based on session state
  useEffect(() => {
    if (breathingOrbRef.current) {
      if (isBreathingActive) {
        breathingOrbRef.current.startBreathing();
      } else {
        breathingOrbRef.current.stopBreathing();
      }
    }
  }, [isBreathingActive]);

  return null;
}
