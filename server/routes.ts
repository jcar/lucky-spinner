import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertParticipantSchema, insertSessionSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import * as XLSX from "xlsx";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload Excel file and extract participants
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (!data || data.length < 2) {
        return res.status(400).json({ message: "Invalid file format. Expected at least 2 rows (header + data)" });
      }

      // Clear existing participants
      await storage.clearAllParticipants();

      const participants = [];
      // Skip header row, process data rows
      for (let i = 1; i < data.length; i++) {
        const row = data[i] as any[];
        if (row[0] && row[1]) {
          const name = String(row[0]).trim();
          const occurrence = parseInt(String(row[1])) || 1;
          
          if (name) {
            const participant = await storage.createParticipant({ name, occurrence });
            participants.push(participant);
          }
        }
      }

      res.json({ participants });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Failed to process file" });
    }
  });

  // Get all participants
  app.get("/api/participants", async (req, res) => {
    try {
      const participants = await storage.getAllParticipants();
      res.json(participants);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch participants" });
    }
  });

  // Create a new session
  app.post("/api/sessions", async (req, res) => {
    try {
      const participants = await storage.getAllParticipants();
      const sessionData = {
        originalData: JSON.stringify(participants),
        currentData: JSON.stringify(participants),
        selectedWinners: "[]"
      };
      
      const result = insertSessionSchema.safeParse(sessionData);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid session data" });
      }

      const session = await storage.createSession(result.data);
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to create session" });
    }
  });

  // Get session
  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch session" });
    }
  });

  // Select winner and update session
  app.post("/api/sessions/:id/select-winner", async (req, res) => {
    try {
      const { winner } = req.body;
      if (!winner || typeof winner !== "string") {
        return res.status(400).json({ message: "Winner name is required" });
      }

      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      const currentData = JSON.parse(session.currentData);
      const selectedWinners = JSON.parse(session.selectedWinners);

      // Remove winner from current data
      const updatedCurrentData = currentData.filter((p: any) => p.name !== winner);
      
      // Add to selected winners
      const winnerData = currentData.find((p: any) => p.name === winner);
      if (winnerData) {
        selectedWinners.push({
          ...winnerData,
          selectedAt: new Date().toISOString()
        });
      }

      const updatedSession = await storage.updateSession(req.params.id, {
        currentData: JSON.stringify(updatedCurrentData),
        selectedWinners: JSON.stringify(selectedWinners)
      });

      res.json(updatedSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to select winner" });
    }
  });

  // Reset session
  app.post("/api/sessions/:id/reset", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      const updatedSession = await storage.updateSession(req.params.id, {
        currentData: session.originalData,
        selectedWinners: "[]"
      });

      res.json(updatedSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to reset session" });
    }
  });

  // Clear all data
  app.delete("/api/participants", async (req, res) => {
    try {
      await storage.clearAllParticipants();
      res.json({ message: "All participants cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear participants" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
