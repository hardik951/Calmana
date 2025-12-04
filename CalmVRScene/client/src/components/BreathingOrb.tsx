import { Scene, MeshBuilder, StandardMaterial, Color3, Vector3, Animation } from "@babylonjs/core";

export default class BreathingOrb {
  private scene: Scene;
  private orbMesh: any;
  private glowMesh: any;
  private isBreathingActive: boolean = false;
  private breathingPhase: 'inhale' | 'hold_in' | 'exhale' | 'hold_out' = 'inhale';
  public position: Vector3;

  constructor(scene: Scene) {
    this.scene = scene;
    this.position = new Vector3(1.5, 1.2, -1);
    this.createOrb();
    this.setupBoxBreathing();
  }

  private createOrb() {
    // Main breathing orb
    this.orbMesh = MeshBuilder.CreateSphere("breathingOrb", {
      diameter: 0.4
    }, this.scene);
    
    this.orbMesh.position = this.position;

    // Orb material with emission for glow effect
    const orbMaterial = new StandardMaterial("orbMaterial", this.scene);
    orbMaterial.diffuseColor = new Color3(0.3, 0.7, 1.0); // Calm blue
    orbMaterial.emissiveColor = new Color3(0.1, 0.3, 0.5); // Subtle glow
    orbMaterial.alpha = 0.8;
    this.orbMesh.material = orbMaterial;

    // Outer glow sphere
    this.glowMesh = MeshBuilder.CreateSphere("breathingOrbGlow", {
      diameter: 0.8
    }, this.scene);
    
    this.glowMesh.position = this.position;

    const glowMaterial = new StandardMaterial("glowMaterial", this.scene);
    glowMaterial.diffuseColor = new Color3(0.2, 0.5, 0.8);
    glowMaterial.emissiveColor = new Color3(0.05, 0.15, 0.3);
    glowMaterial.alpha = 0.3;
    this.glowMesh.material = glowMaterial;
  }

  private setupBoxBreathing() {
    // Box breathing: 4 seconds inhale, 4 seconds hold, 4 seconds exhale, 4 seconds hold
    const breathingCycle = 16 * 30; // 16 seconds at 30fps
    const phaseFrames = breathingCycle / 4; // 4 seconds per phase

    // Create scaling animation for the orb
    const breathingKeys = [];
    
    // Inhale (0-4 seconds) - grow
    breathingKeys.push({ frame: 0, value: new Vector3(1, 1, 1) });
    breathingKeys.push({ frame: phaseFrames, value: new Vector3(1.5, 1.5, 1.5) });
    
    // Hold inhale (4-8 seconds) - stay large
    breathingKeys.push({ frame: phaseFrames * 2, value: new Vector3(1.5, 1.5, 1.5) });
    
    // Exhale (8-12 seconds) - shrink
    breathingKeys.push({ frame: phaseFrames * 3, value: new Vector3(1, 1, 1) });
    
    // Hold exhale (12-16 seconds) - stay small
    breathingKeys.push({ frame: phaseFrames * 4, value: new Vector3(1, 1, 1) });

    const breathingAnimation = new Animation(
      "breathingAnimation",
      "scaling",
      30, // 30 fps
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    breathingAnimation.setKeys(breathingKeys);
    this.orbMesh.animations = [breathingAnimation];

    // Create color animation for visual feedback
    const colorKeys = [];
    colorKeys.push({ frame: 0, value: new Color3(0.3, 0.7, 1.0) }); // Blue - inhale
    colorKeys.push({ frame: phaseFrames, value: new Color3(0.5, 0.8, 0.3) }); // Green - hold in
    colorKeys.push({ frame: phaseFrames * 2, value: new Color3(0.5, 0.8, 0.3) }); // Green - hold in
    colorKeys.push({ frame: phaseFrames * 3, value: new Color3(0.8, 0.5, 0.3) }); // Orange - exhale
    colorKeys.push({ frame: phaseFrames * 4, value: new Color3(0.3, 0.7, 1.0) }); // Blue - hold out

    const colorAnimation = new Animation(
      "colorAnimation",
      "material.diffuseColor",
      30,
      Animation.ANIMATIONTYPE_COLOR3,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    colorAnimation.setKeys(colorKeys);
    this.orbMesh.animations.push(colorAnimation);

    // Glow animation
    const glowKeys = [];
    glowKeys.push({ frame: 0, value: 0.3 });
    glowKeys.push({ frame: phaseFrames, value: 0.6 });
    glowKeys.push({ frame: phaseFrames * 2, value: 0.6 });
    glowKeys.push({ frame: phaseFrames * 3, value: 0.3 });
    glowKeys.push({ frame: phaseFrames * 4, value: 0.3 });

    const glowAnimation = new Animation(
      "glowAnimation",
      "material.alpha",
      30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    glowAnimation.setKeys(glowKeys);
    this.glowMesh.animations = [glowAnimation];
  }

  public startBreathing() {
    if (!this.isBreathingActive) {
      this.isBreathingActive = true;
      
      // Start all animations
      this.scene.beginAnimation(this.orbMesh, 0, 480, true); // 16 seconds * 30fps
      this.scene.beginAnimation(this.glowMesh, 0, 480, true);
      
      console.log("Breathing exercise started");
    }
  }

  public stopBreathing() {
    if (this.isBreathingActive) {
      this.isBreathingActive = false;
      
      // Stop animations
      this.scene.stopAnimation(this.orbMesh);
      this.scene.stopAnimation(this.glowMesh);
      
      // Reset to default state
      this.orbMesh.scaling = new Vector3(1, 1, 1);
      if (this.orbMesh.material) {
        this.orbMesh.material.diffuseColor = new Color3(0.3, 0.7, 1.0);
      }
      if (this.glowMesh.material) {
        this.glowMesh.material.alpha = 0.3;
      }
      
      console.log("Breathing exercise stopped");
    }
  }

  public getCurrentPhase(): string {
    if (!this.isBreathingActive) return 'inactive';
    
    // Simple phase tracking - could be enhanced with precise timing
    const currentFrame = this.scene.getAnimationRatio() * 480;
    const phaseFrames = 120; // 4 seconds * 30fps
    
    if (currentFrame < phaseFrames) return 'inhale';
    else if (currentFrame < phaseFrames * 2) return 'hold_in';
    else if (currentFrame < phaseFrames * 3) return 'exhale';
    else return 'hold_out';
  }

  public getBreathingInstructions(): string {
    const phase = this.getCurrentPhase();
    
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly through your nose...';
      case 'hold_in':
        return 'Hold your breath...';
      case 'exhale':
        return 'Breathe out slowly through your mouth...';
      case 'hold_out':
        return 'Hold your breath...';
      default:
        return 'Focus on the breathing orb when ready';
    }
  }

  public isActive(): boolean {
    return this.isBreathingActive;
  }
}
