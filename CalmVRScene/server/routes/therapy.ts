import { Router } from "express";
import { AITherapist } from "../../client/src/services/aiTherapist";

const router = Router();

// Store therapy sessions in memory (in production, use a proper database)
const therapySessions = new Map<string, AITherapist>();

// Initialize a new therapy session
router.post("/session/start", async (req, res) => {
  try {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const aiTherapist = new AITherapist();
    
    therapySessions.set(sessionId, aiTherapist);
    
    // Generate opening prompt
    const openingResponse = await aiTherapist.generateOpeningPrompt();
    
    res.json({
      sessionId,
      message: openingResponse.message,
      emotion: openingResponse.emotion,
      gesture: openingResponse.gesture
    });
    
  } catch (error) {
    console.error("Error starting therapy session:", error);
    res.status(500).json({ 
      error: "Failed to start therapy session",
      fallback: {
        message: "Welcome to your therapy session. I'm here to listen and support you. How are you feeling today?",
        emotion: "empathetic",
        gesture: "nod"
      }
    });
  }
});

// Process user input and get AI response
router.post("/session/:sessionId/message", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message, duration } = req.body;
    
    const aiTherapist = therapySessions.get(sessionId);
    if (!aiTherapist) {
      return res.status(404).json({ error: "Session not found" });
    }
    
    // Update session duration
    aiTherapist.updateSessionDuration(duration || 0);
    
    // Process user input
    const response = await aiTherapist.processUserInput(message);
    
    res.json(response);
    
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({
      error: "Failed to process message",
      fallback: {
        message: "I understand that can be difficult to talk about. Take your time, and remember this is a safe space.",
        emotion: "empathetic",
        gesture: "nod"
      }
    });
  }
});

// Get breathing guidance
router.get("/session/:sessionId/breathing", async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const aiTherapist = therapySessions.get(sessionId);
    if (!aiTherapist) {
      return res.status(404).json({ error: "Session not found" });
    }
    
    const breathingResponse = await aiTherapist.generateBreathingGuidance();
    res.json(breathingResponse);
    
  } catch (error) {
    console.error("Error getting breathing guidance:", error);
    res.status(500).json({
      error: "Failed to get breathing guidance",
      fallback: {
        message: "Let's take a moment to breathe together. Focus on the breathing orb and follow its gentle rhythm.",
        emotion: "encouraging",
        gesture: "open_hands",
        suggestedAction: "breathing"
      }
    });
  }
});

// End therapy session and get summary
router.post("/session/:sessionId/end", async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const aiTherapist = therapySessions.get(sessionId);
    if (!aiTherapist) {
      return res.status(404).json({ error: "Session not found" });
    }
    
    // Generate session summary
    const summary = await aiTherapist.generateSessionSummary();
    
    // Clean up session
    therapySessions.delete(sessionId);
    
    res.json({
      message: "Thank you for sharing in today's session. Take care of yourself.",
      summary,
      emotion: "empathetic"
    });
    
  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).json({
      error: "Failed to end session",
      fallback: {
        message: "Thank you for participating in today's session. Remember to be kind to yourself.",
        summary: "You took an important step by engaging in therapy today.",
        emotion: "empathetic"
      }
    });
  }
});

// Get conversation history
router.get("/session/:sessionId/history", async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const aiTherapist = therapySessions.get(sessionId);
    if (!aiTherapist) {
      return res.status(404).json({ error: "Session not found" });
    }
    
    const history = aiTherapist.getConversationHistory();
    res.json({ history });
    
  } catch (error) {
    console.error("Error getting conversation history:", error);
    res.status(500).json({ error: "Failed to get conversation history" });
  }
});

export default router;
