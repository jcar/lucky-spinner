import { type Participant, type InsertParticipant, type Session, type InsertSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Participant operations
  getParticipant(id: string): Promise<Participant | undefined>;
  createParticipant(participant: InsertParticipant): Promise<Participant>;
  getAllParticipants(): Promise<Participant[]>;
  deleteParticipant(id: string): Promise<void>;
  clearAllParticipants(): Promise<void>;
  
  // Session operations
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  updateSession(id: string, updates: Partial<InsertSession>): Promise<Session | undefined>;
  deleteSession(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private participants: Map<string, Participant>;
  private sessions: Map<string, Session>;

  constructor() {
    this.participants = new Map();
    this.sessions = new Map();
  }

  // Participant operations
  async getParticipant(id: string): Promise<Participant | undefined> {
    return this.participants.get(id);
  }

  async createParticipant(insertParticipant: InsertParticipant): Promise<Participant> {
    const id = randomUUID();
    const participant: Participant = { ...insertParticipant, id };
    this.participants.set(id, participant);
    return participant;
  }

  async getAllParticipants(): Promise<Participant[]> {
    return Array.from(this.participants.values());
  }

  async deleteParticipant(id: string): Promise<void> {
    this.participants.delete(id);
  }

  async clearAllParticipants(): Promise<void> {
    this.participants.clear();
  }

  // Session operations
  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = randomUUID();
    const session: Session = { ...insertSession, id };
    this.sessions.set(id, session);
    return session;
  }

  async getSession(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async updateSession(id: string, updates: Partial<InsertSession>): Promise<Session | undefined> {
    const existing = this.sessions.get(id);
    if (!existing) return undefined;
    
    const updated: Session = { ...existing, ...updates };
    this.sessions.set(id, updated);
    return updated;
  }

  async deleteSession(id: string): Promise<void> {
    this.sessions.delete(id);
  }
}

export const storage = new MemStorage();
