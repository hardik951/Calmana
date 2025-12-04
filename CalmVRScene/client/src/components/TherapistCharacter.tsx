import { Scene, MeshBuilder, StandardMaterial, Color3, Vector3, Animation, AnimationGroup, TransformNode } from "@babylonjs/core";

export default class TherapistCharacter extends TransformNode {
  private scene: Scene;
  private bodyMesh: any;
  private headMesh: any;
  private leftEyeMesh: any;
  private rightEyeMesh: any;
  private mouthMesh: any;
  private animationGroups: AnimationGroup[] = [];
  private currentEmotion: string = "neutral";
  private blinkInterval: any = null;

  constructor(scene: Scene) {
    super("therapist", scene);
    this.scene = scene;
    this.createCharacter();
    this.setupAnimations();
    this.startBlinking();
  }

  private createCharacter() {
    // Create therapist body (seated)
    this.bodyMesh = MeshBuilder.CreateBox("therapistBody", {
      width: 1.2,
      height: 1.6,
      depth: 0.8
    }, this.scene);
    
    this.bodyMesh.position = new Vector3(0, 0.8, 0);
    this.bodyMesh.parent = this;

    // Body material - professional attire
    const bodyMaterial = new StandardMaterial("therapistBodyMaterial", this.scene);
    bodyMaterial.diffuseColor = new Color3(0.2, 0.3, 0.5); // Professional blue
    this.bodyMesh.material = bodyMaterial;

    // Create therapist head
    this.headMesh = MeshBuilder.CreateSphere("therapistHead", {
      diameter: 0.8
    }, this.scene);
    
    this.headMesh.position = new Vector3(0, 2.2, 0);
    this.headMesh.parent = this;

    // Head material - skin tone
    const headMaterial = new StandardMaterial("therapistHeadMaterial", this.scene);
    headMaterial.diffuseColor = new Color3(0.92, 0.8, 0.7); // Skin tone
    this.headMesh.material = headMaterial;

    // Add simple facial features
    this.createFacialFeatures();
    
    // Create chair for therapist
    this.createTherapistChair();
  }

  private createFacialFeatures() {
    // Create eyes
    this.leftEyeMesh = MeshBuilder.CreateSphere("leftEye", { diameter: 0.1 }, this.scene);
    this.leftEyeMesh.position = new Vector3(-0.15, 2.25, 0.35);
    this.leftEyeMesh.parent = this;

    this.rightEyeMesh = MeshBuilder.CreateSphere("rightEye", { diameter: 0.1 }, this.scene);
    this.rightEyeMesh.position = new Vector3(0.15, 2.25, 0.35);
    this.rightEyeMesh.parent = this;

    const eyeMaterial = new StandardMaterial("eyeMaterial", this.scene);
    eyeMaterial.diffuseColor = new Color3(0.1, 0.1, 0.1);
    this.leftEyeMesh.material = eyeMaterial;
    this.rightEyeMesh.material = eyeMaterial;

    // Create mouth
    this.mouthMesh = MeshBuilder.CreateSphere("mouth", { 
      diameter: 0.15,
      diameterX: 0.25,
      diameterY: 0.05
    }, this.scene);
    this.mouthMesh.position = new Vector3(0, 2.05, 0.38);
    this.mouthMesh.parent = this;

    const mouthMaterial = new StandardMaterial("mouthMaterial", this.scene);
    mouthMaterial.diffuseColor = new Color3(0.8, 0.4, 0.4);
    this.mouthMesh.material = mouthMaterial;
  }

  private createTherapistChair() {
    // Chair seat
    const chairSeat = MeshBuilder.CreateBox("chairSeat", {
      width: 1.5,
      height: 0.1,
      depth: 1.5
    }, this.scene);
    chairSeat.position = new Vector3(0, 0.5, 0);
    chairSeat.parent = this;

    // Chair back
    const chairBack = MeshBuilder.CreateBox("chairBack", {
      width: 1.5,
      height: 1.2,
      depth: 0.1
    }, this.scene);
    chairBack.position = new Vector3(0, 1.1, -0.7);
    chairBack.parent = this;

    // Chair material
    const chairMaterial = new StandardMaterial("chairMaterial", this.scene);
    chairMaterial.diffuseColor = new Color3(0.4, 0.3, 0.2); // Brown leather
    chairSeat.material = chairMaterial;
    chairBack.material = chairMaterial;
  }

  private setupAnimations() {
    // Create breathing animation
    this.createBreathingAnimation();
    
    // Create nodding animation
    this.createNoddingAnimation();
    
    // Create gesture animations
    this.createGestureAnimations();
  }

  private createBreathingAnimation() {
    const breathingKeys = [];
    breathingKeys.push({ frame: 0, value: new Vector3(1, 1, 1) });
    breathingKeys.push({ frame: 30, value: new Vector3(1.02, 1.01, 1.02) });
    breathingKeys.push({ frame: 60, value: new Vector3(1, 1, 1) });

    const breathingAnimation = new Animation(
      "breathingAnimation",
      "scaling",
      30,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    breathingAnimation.setKeys(breathingKeys);
    this.bodyMesh.animations = [breathingAnimation];
    
    // Start breathing animation
    this.scene.beginAnimation(this.bodyMesh, 0, 60, true);
  }

  private createNoddingAnimation() {
    const noddingKeys = [];
    noddingKeys.push({ frame: 0, value: 0 });
    noddingKeys.push({ frame: 15, value: -0.1 });
    noddingKeys.push({ frame: 30, value: 0 });

    const noddingAnimation = new Animation(
      "noddingAnimation",
      "rotation.x",
      30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    
    noddingAnimation.setKeys(noddingKeys);
    this.headMesh.animations.push(noddingAnimation);
  }

  private createGestureAnimations() {
    // Create subtle hand gesture animations
    // For now, just subtle body movements to simulate engagement
    const engagementKeys = [];
    engagementKeys.push({ frame: 0, value: 0 });
    engagementKeys.push({ frame: 60, value: 0.05 });
    engagementKeys.push({ frame: 120, value: 0 });
    engagementKeys.push({ frame: 180, value: -0.05 });
    engagementKeys.push({ frame: 240, value: 0 });

    const engagementAnimation = new Animation(
      "engagementAnimation",
      "rotation.y",
      30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    engagementAnimation.setKeys(engagementKeys);
    this.bodyMesh.animations.push(engagementAnimation);
    
    // Start subtle engagement animation
    this.scene.beginAnimation(this.bodyMesh, 0, 240, true);
  }

  public performGesture(gestureType: string) {
    switch (gestureType) {
      case "nod":
        this.scene.beginAnimation(this.headMesh, 0, 30, false);
        break;
      case "lean_forward":
        // Simulate leaning forward with interest
        const leanAnimation = Animation.CreateAndStartAnimation(
          "leanForward",
          this.bodyMesh,
          "position.z",
          30,
          30,
          this.bodyMesh.position.z,
          this.bodyMesh.position.z + 0.3,
          Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        
        // Lean back after 2 seconds
        setTimeout(() => {
          Animation.CreateAndStartAnimation(
            "leanBack",
            this.bodyMesh,
            "position.z",
            30,
            30,
            this.bodyMesh.position.z,
            0,
            Animation.ANIMATIONLOOPMODE_CONSTANT
          );
        }, 2000);
        break;
    }
  }

  public setEmotion(emotion: string) {
    this.currentEmotion = emotion;
    // You could modify materials, expressions, or posture based on emotion
    console.log(`Therapist emotion set to: ${emotion}`);
  }

  private startBlinking() {
    // Natural eye blinking animation
    this.blinkInterval = setInterval(() => {
      if (this.leftEyeMesh && this.rightEyeMesh) {
        // Blink animation
        const blinkDuration = 150; // ms
        
        // Close eyes
        Animation.CreateAndStartAnimation(
          "blinkClose",
          this.leftEyeMesh,
          "scaling.y",
          60,
          5,
          1,
          0.1,
          Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        
        Animation.CreateAndStartAnimation(
          "blinkClose",
          this.rightEyeMesh,
          "scaling.y",
          60,
          5,
          1,
          0.1,
          Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        
        // Open eyes
        setTimeout(() => {
          Animation.CreateAndStartAnimation(
            "blinkOpen",
            this.leftEyeMesh,
            "scaling.y",
            60,
            5,
            0.1,
            1,
            Animation.ANIMATIONLOOPMODE_CONSTANT
          );
          
          Animation.CreateAndStartAnimation(
            "blinkOpen",
            this.rightEyeMesh,
            "scaling.y",
            60,
            5,
            0.1,
            1,
            Animation.ANIMATIONLOOPMODE_CONSTANT
          );
        }, blinkDuration);
      }
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
  }

  public speakAnimation(isActive: boolean) {
    if (isActive) {
      // Simple mouth animation for speaking
      const speakKeys = [];
      speakKeys.push({ frame: 0, value: new Vector3(1, 1, 1) });
      speakKeys.push({ frame: 5, value: new Vector3(1.1, 0.8, 1) });
      speakKeys.push({ frame: 10, value: new Vector3(1, 1, 1) });

      const speakAnimation = new Animation(
        "speakAnimation",
        "scaling",
        30,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CYCLE
      );
      
      speakAnimation.setKeys(speakKeys);
      
      if (this.mouthMesh) {
        this.mouthMesh.animations = [speakAnimation];
        this.scene.beginAnimation(this.mouthMesh, 0, 10, true);
      }
    } else {
      // Stop speaking animation and reset mouth
      if (this.mouthMesh) {
        this.scene.stopAnimation(this.mouthMesh);
        this.mouthMesh.scaling = new Vector3(1, 1, 1);
      }
    }
  }

  public dispose() {
    if (this.blinkInterval) {
      clearInterval(this.blinkInterval);
    }
    super.dispose();
  }
}
