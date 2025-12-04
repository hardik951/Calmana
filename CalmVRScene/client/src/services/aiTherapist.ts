import OpenAI from "openai";

// Get API key from environment (Vite exposes these as import.meta.env.VITE_*)
const getApiKey = () => {
  if (typeof window !== 'undefined') {
    // Client-side: try to get from window or import.meta.env
    return (import.meta.env?.VITE_OPENAI_API_KEY as string) || '';
  }
  return '';
};

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: getApiKey(),
  dangerouslyAllowBrowser: true 
});

export interface TherapyResponse {
  message: string;
  emotion: 'empathetic' | 'encouraging' | 'neutral' | 'concerned';
  gesture?: 'nod' | 'lean_forward' | 'open_hands';
  suggestedAction?: 'breathing' | 'reflection' | 'continue';
}

export class AITherapist {
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = [];
  private sessionContext: {
    sessionNumber: number;
    userGoals: string[];
    currentMood: string;
    sessionDuration: number;
  };

  constructor() {
    this.sessionContext = {
      sessionNumber: 1,
      userGoals: [],
      currentMood: 'neutral',
      sessionDuration: 0
    };

    // Initialize with therapist introduction
    this.conversationHistory.push({
      role: 'assistant',
      content: 'Hello, I\'m glad you\'re here today. I\'m your AI therapist, and this is a safe space where you can share whatever is on your mind. How are you feeling right now?'
    });
  }

  public async processUserInput(userInput: string): Promise<TherapyResponse> {
    try {
      // Add user input to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userInput
      });

      // Create therapeutic response using GPT-5
      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `You are a compassionate, professional AI therapist conducting a VR therapy session. Your responses should be:

1. Empathetic and validating
2. Use active listening techniques
3. Ask open-ended questions to encourage exploration
4. Provide gentle guidance and coping strategies
5. Maintain professional boundaries
6. Be supportive but not give medical advice
7. Encourage self-reflection and emotional awareness

Session Context:
- Session #${this.sessionContext.sessionNumber}
- Current mood: ${this.sessionContext.currentMood}
- Duration: ${Math.floor(this.sessionContext.sessionDuration / 60)} minutes

Respond with JSON format:
{
  "message": "Your therapeutic response",
  "emotion": "empathetic|encouraging|neutral|concerned",
  "gesture": "nod|lean_forward|open_hands|null",
  "suggestedAction": "breathing|reflection|continue|null"
}

Keep responses conversational, warm, and under 100 words.`
          },
          ...this.conversationHistory.slice(-10) // Keep last 10 messages for context
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 300
      });

      const therapyResponse = JSON.parse(response.choices[0].message.content || '{}') as TherapyResponse;

      // Add therapist response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: therapyResponse.message
      });

      // Update session context based on user input
      this.updateSessionContext(userInput);

      return therapyResponse;

    } catch (error) {
      console.error('Error processing user input:', error);
      
      // Fallback response
      return {
        message: "I understand this might be difficult to talk about. Would you like to take a moment to breathe together, or would you prefer to continue sharing?",
        emotion: 'empathetic',
        gesture: 'nod',
        suggestedAction: 'breathing'
      };
    }
  }

  public async generateOpeningPrompt(): Promise<TherapyResponse> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `Generate a warm, welcoming opening prompt for a VR therapy session. The user has just entered the virtual therapy room and is seated. Make them feel comfortable and safe.

Respond with JSON format:
{
  "message": "Opening greeting and question",
  "emotion": "empathetic",
  "gesture": "nod|open_hands",
  "suggestedAction": null
}`
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 200
      });

      return JSON.parse(response.choices[0].message.content || '{}') as TherapyResponse;

    } catch (error) {
      console.error('Error generating opening prompt:', error);
      
      return {
        message: "Welcome to our session. I'm here to listen and support you. Take your time getting comfortable, and when you're ready, tell me what brings you here today.",
        emotion: 'empathetic',
        gesture: 'nod'
      };
    }
  }

  public async generateBreathingGuidance(): Promise<TherapyResponse> {
    const guidanceOptions = [
      "Let's take a moment to breathe together. Watch the breathing orb and follow its rhythm. Breathe in as it expands, hold when it pauses, then breathe out as it contracts.",
      "I notice you might benefit from some grounding. Let's do a breathing exercise. Focus on the blue orb and let it guide your breathing pattern.",
      "Sometimes our breath can help center us. Would you like to try a few minutes of guided breathing with the orb?",
    ];

    const randomGuidance = guidanceOptions[Math.floor(Math.random() * guidanceOptions.length)];

    return {
      message: randomGuidance,
      emotion: 'encouraging',
      gesture: 'open_hands',
      suggestedAction: 'breathing'
    };
  }

  private updateSessionContext(userInput: string) {
    // Simple mood analysis based on keywords
    const positiveWords = ['good', 'happy', 'better', 'calm', 'peaceful', 'grateful'];
    const negativeWords = ['sad', 'anxious', 'worried', 'upset', 'angry', 'frustrated', 'depressed'];
    
    const inputLower = userInput.toLowerCase();
    
    if (positiveWords.some(word => inputLower.includes(word))) {
      this.sessionContext.currentMood = 'positive';
    } else if (negativeWords.some(word => inputLower.includes(word))) {
      this.sessionContext.currentMood = 'negative';
    } else {
      this.sessionContext.currentMood = 'neutral';
    }
  }

  public updateSessionDuration(duration: number) {
    this.sessionContext.sessionDuration = duration;
  }

  public getConversationHistory() {
    return this.conversationHistory;
  }

  public resetSession() {
    this.conversationHistory = [];
    this.sessionContext = {
      sessionNumber: this.sessionContext.sessionNumber + 1,
      userGoals: [],
      currentMood: 'neutral',
      sessionDuration: 0
    };
  }

  public async generateSessionSummary(): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "Provide a brief, compassionate session summary highlighting key themes discussed and any progress made. Keep it under 100 words and focus on positive reinforcement."
          },
          {
            role: "user",
            content: `Please summarize this therapy session: ${this.conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}`
          }
        ],
        max_completion_tokens: 200
      });

      return response.choices[0].message.content || "Thank you for sharing in today's session. Remember to be patient and kind with yourself.";

    } catch (error) {
      console.error('Error generating session summary:', error);
      return "Thank you for participating in today's session. Take care of yourself, and remember that healing is a journey.";
    }
  }
}
