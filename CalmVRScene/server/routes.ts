import type { Express } from "express";
import { createServer, type Server } from "http";
import therapyRoutes from "./routes/therapy";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register therapy routes
  app.use("/api/therapy", therapyRoutes);
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      services: {
        therapy: "active",
        voice: "browser-dependent",
        vr: "browser-dependent"
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
