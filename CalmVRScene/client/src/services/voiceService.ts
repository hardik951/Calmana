export interface VoiceConfig {
  language: string;
  voice: string;
  rate: number;
  pitch: number;
  volume: number;
}

export class VoiceService {
  private synthesis: SpeechSynthesis;
  private recognition: SpeechRecognition | null = null;
  private config: VoiceConfig;
  private isListening: boolean = false;
  private onResultCallback?: (transcript: string) => void;
  private onEndCallback?: () => void;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.config = {
      language: 'en-US',
      voice: 'Microsoft Zira - English (United States)', // Calming female voice
      rate: 0.9,
      pitch: 1.0,
      volume: 0.8
    };

    this.initializeRecognition();
  }

  private initializeRecognition() {
    // Check for speech recognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.config.language;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (this.onResultCallback) {
          this.onResultCallback(finalTranscript || interimTranscript);
        }

        if (finalTranscript && this.onResultCallback) {
          this.onResultCallback(finalTranscript.trim());
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
  }

  public speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice settings for therapeutic tone
      utterance.rate = this.config.rate;
      utterance.pitch = this.config.pitch;
      utterance.volume = this.config.volume;
      utterance.lang = this.config.language;

      // Try to use preferred therapeutic voice
      const voices = this.synthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Zira') || 
        voice.name.includes('Karen') || 
        voice.name.includes('female')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Speech error: ${event.error}`));

      this.synthesis.speak(utterance);
    });
  }

  public stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  public isSpeaking(): boolean {
    return this.synthesis?.speaking || false;
  }

  public startListening(onResult: (transcript: string) => void, onEnd?: () => void): boolean {
    if (!this.recognition || this.isListening) {
      return false;
    }

    this.onResultCallback = onResult;
    this.onEndCallback = onEnd;
    this.isListening = true;

    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Failed to start listening:', error);
      this.isListening = false;
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public isCurrentlyListening(): boolean {
    return this.isListening;
  }

  public updateConfig(newConfig: Partial<VoiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (this.recognition) {
      this.recognition.lang = this.config.language;
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synthesis?.getVoices() || [];
  }

  public isSupported(): boolean {
    return !!(this.synthesis && this.recognition);
  }

  // Therapeutic-specific voice commands
  public async speakTherapeuticResponse(text: string, emotion: string = 'neutral'): Promise<void> {
    // Adjust voice parameters based on emotion
    const originalRate = this.config.rate;
    const originalPitch = this.config.pitch;

    switch (emotion) {
      case 'empathetic':
        this.config.rate = 0.8;  // Slower, more caring
        this.config.pitch = 0.9; // Slightly lower pitch
        break;
      case 'encouraging':
        this.config.rate = 1.0;  // Normal pace
        this.config.pitch = 1.1; // Slightly higher pitch
        break;
      case 'concerned':
        this.config.rate = 0.7;  // Slower, more serious
        this.config.pitch = 0.8; // Lower pitch
        break;
    }

    try {
      await this.speak(text);
    } finally {
      // Restore original settings
      this.config.rate = originalRate;
      this.config.pitch = originalPitch;
    }
  }
}

export const voiceService = new VoiceService();
