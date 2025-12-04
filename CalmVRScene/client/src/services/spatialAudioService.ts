import { Vector3 } from "@babylonjs/core";

export class SpatialAudioService {
  private audioContext: AudioContext | null = null;
  private pannerNode: PannerNode | null = null;
  private gainNode: GainNode | null = null;
  private listenerPosition: Vector3 = Vector3.Zero();
  private initialized: boolean = false;
  
  constructor() {
    // Do not initialize audio context in constructor
    // Wait for user gesture to comply with browser autoplay policy
  }

  public initialize() {
    if (this.initialized) return;
    this.initializeAudioContext();
    this.initialized = true;
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create panner node for 3D positioning
      this.pannerNode = this.audioContext.createPanner();
      this.pannerNode.panningModel = 'HRTF'; // Head-Related Transfer Function for realistic spatial audio
      this.pannerNode.distanceModel = 'inverse';
      this.pannerNode.refDistance = 1;
      this.pannerNode.maxDistance = 10;
      this.pannerNode.rolloffFactor = 1;
      this.pannerNode.coneInnerAngle = 360;
      this.pannerNode.coneOuterAngle = 0;
      this.pannerNode.coneOuterGain = 0;

      // Create gain node for volume control
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0.8;

      // Connect nodes
      this.pannerNode.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);

      console.log('Spatial audio initialized with HRTF');
    } catch (error) {
      console.error('Failed to initialize spatial audio:', error);
    }
  }

  public setSourcePosition(position: Vector3) {
    // Initialize on first use
    if (!this.initialized) {
      this.initialize();
    }

    if (this.pannerNode && this.audioContext) {
      // Babylon.js uses Y-up, Web Audio API also uses Y-up
      this.pannerNode.positionX.setValueAtTime(position.x, this.audioContext.currentTime);
      this.pannerNode.positionY.setValueAtTime(position.y, this.audioContext.currentTime);
      this.pannerNode.positionZ.setValueAtTime(position.z, this.audioContext.currentTime);
    }
  }

  public setListenerPosition(position: Vector3, forward: Vector3, up: Vector3) {
    if (this.audioContext && this.audioContext.listener) {
      const listener = this.audioContext.listener;
      const currentTime = this.audioContext.currentTime;

      // Set listener position
      if (listener.positionX) {
        listener.positionX.setValueAtTime(position.x, currentTime);
        listener.positionY.setValueAtTime(position.y, currentTime);
        listener.positionZ.setValueAtTime(position.z, currentTime);
      }

      // Set listener orientation
      if (listener.forwardX) {
        listener.forwardX.setValueAtTime(forward.x, currentTime);
        listener.forwardY.setValueAtTime(forward.y, currentTime);
        listener.forwardZ.setValueAtTime(forward.z, currentTime);
        
        listener.upX.setValueAtTime(up.x, currentTime);
        listener.upY.setValueAtTime(up.y, currentTime);
        listener.upZ.setValueAtTime(up.z, currentTime);
      }

      this.listenerPosition = position;
    }
  }

  public async playAudio(audioBuffer: AudioBuffer) {
    // Initialize on first use (after user gesture)
    if (!this.initialized) {
      this.initialize();
    }

    if (!this.audioContext || !this.pannerNode) {
      console.error('Audio context not initialized');
      return;
    }

    // Resume audio context if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.pannerNode);
    source.start(0);

    return source;
  }

  public setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  public getAudioContext(): AudioContext | null {
    return this.audioContext;
  }

  public getPannerNode(): PannerNode | null {
    return this.pannerNode;
  }

  public isAvailable(): boolean {
    return !!(this.audioContext && this.pannerNode);
  }

  public dispose() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.pannerNode = null;
    this.gainNode = null;
  }
}

// Create instance but do not initialize until user interaction
export const spatialAudioService = new SpatialAudioService();
