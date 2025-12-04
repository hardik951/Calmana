import { Scene, WebXRDefaultExperience, Vector3, Ray } from "@babylonjs/core";

export default class VRControls {
  private scene: Scene;
  private xrExperience: WebXRDefaultExperience;

  constructor(scene: Scene, xrExperience: WebXRDefaultExperience) {
    this.scene = scene;
    this.xrExperience = xrExperience;
    this.setupVRInteractions();
  }

  private setupVRInteractions() {
    // Setup hand tracking if available
    this.xrExperience.baseExperience.featuresManager.enableFeature(
      "hand-tracking", 
      "latest", 
      { 
        xrInput: this.xrExperience.input,
        jointMeshes: {
          enablePhysics: false
        }
      }
    );

    // Setup teleportation for room movement
    const teleportation = this.xrExperience.baseExperience.featuresManager.enableFeature(
      "teleportation", 
      "stable", 
      {
        xrInput: this.xrExperience.input,
        floorMeshes: [this.scene.getMeshByName("floor")],
        snapPositions: [
          new Vector3(0, 0, 2), // User chair position
          new Vector3(-2, 0, 1), // Side viewing position
          new Vector3(2, 0, 1),  // Other side viewing position
        ]
      }
    );

    // Setup pointer selection for UI interaction
    const pointerSelection = this.xrExperience.baseExperience.featuresManager.enableFeature(
      "pointer-selection",
      "stable",
      {
        xrInput: this.xrExperience.input,
        enablePointerSelectionOnAllControllers: true
      }
    );

    // Handle controller input for therapy interactions
    this.setupControllerActions();
  }

  private setupControllerActions() {
    this.xrExperience.input.onControllerAddedObservable.add((controller) => {
      controller.onMotionControllerInitObservable.add((motionController) => {
        // Handle trigger button for interactions
        const triggerButton = motionController.getComponent("xr-standard-trigger");
        if (triggerButton) {
          triggerButton.onButtonStateChangedObservable.add((component) => {
            if (component.pressed) {
              this.handleTriggerPress(controller);
            }
          });
        }

        // Handle menu button for session controls
        const menuButton = motionController.getComponent("menu");
        if (menuButton) {
          menuButton.onButtonStateChangedObservable.add((component) => {
            if (component.pressed) {
              this.handleMenuPress();
            }
          });
        }

        // Handle thumbstick for breathing control
        const thumbstick = motionController.getComponent("xr-standard-thumbstick");
        if (thumbstick) {
          thumbstick.onButtonStateChangedObservable.add((component) => {
            if (component.pressed) {
              this.handleBreathingToggle();
            }
          });
        }
      });
    });
  }

  private handleTriggerPress(controller: any) {
    // Cast ray from controller to detect interactions
    const ray = new Ray(
      controller.pointer.position,
      controller.pointer.forward
    );

    const hit = this.scene.pickWithRay(ray);
    if (hit && hit.pickedMesh) {
      const meshName = hit.pickedMesh.name;
      
      // Handle different interaction targets
      if (meshName.includes("breathingOrb")) {
        this.handleOrbInteraction();
      } else if (meshName.includes("therapist")) {
        this.handleTherapistInteraction();
      }
    }
  }

  private handleMenuPress() {
    // Toggle session menu or controls
    console.log("VR Menu button pressed");
    // Could trigger session controls, volume adjustment, etc.
  }

  private handleBreathingToggle() {
    // Toggle breathing exercise
    const breathingOrb = this.scene.getMeshByName("breathingOrb");
    if (breathingOrb) {
      console.log("Breathing exercise toggled via VR controller");
      // Trigger breathing orb start/stop
    }
  }

  private handleOrbInteraction() {
    console.log("User interacted with breathing orb in VR");
    // Could trigger guided breathing session
  }

  private handleTherapistInteraction() {
    console.log("User interacted with therapist in VR");
    // Could trigger conversation or acknowledgment
  }

  public enableHandGestures() {
    // Enable hand gesture recognition for natural interaction
    // This would integrate with hand tracking data
    console.log("Hand gestures enabled for therapy interaction");
  }

  public setupSpatialAudio() {
    // Configure spatial audio for immersive therapy experience
    // Therapist voice should come from their position
    // Breathing cues should be positioned appropriately
    console.log("Spatial audio configured for VR therapy");
  }

  public adjustSeatingPosition(position: Vector3) {
    // Allow user to adjust their virtual seating position
    if (this.xrExperience.baseExperience.camera) {
      this.xrExperience.baseExperience.camera.position = position;
    }
  }
}
