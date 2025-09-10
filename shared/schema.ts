import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const participants = pgTable("participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  occurrence: integer("occurrence").notNull().default(1),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalData: text("original_data").notNull(), // JSON string of original participants
  currentData: text("current_data").notNull(), // JSON string of current participants
  selectedWinners: text("selected_winners").notNull().default("[]"), // JSON string of selected winners
});

export const insertParticipantSchema = createInsertSchema(participants).omit({
  id: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
});

export type InsertParticipant = z.infer<typeof insertParticipantSchema>;
export type Participant = typeof participants.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// Client-side types for the wheel
export interface WheelParticipant {
  name: string;
  occurrence: number;
  color: string;
}

export interface SpinResult {
  winner: string;
  angle: number;
}
