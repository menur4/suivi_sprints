import { z } from 'zod';

export const epicSchema = z.object({
  id: z.string(),
  ticketType: z.string(),
  ticketKey: z.string(),
  ticketId: z.string(),
  summary: z.string(),
  assignee: z.string(),
  assigneeId: z.string(),
  reporter: z.string(),
  reporterId: z.string(),
  priority: z.string(),
  status: z.string(),
  resolution: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  dueDate: z.date().nullable(),
  badges: z.array(z.string()),
  displayColumns: z.array(z.string()).optional(),
});

export type Epic = z.infer<typeof epicSchema>;

export const badgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export type Badge = z.infer<typeof badgeSchema>;

export const epicPreferencesSchema = z.object({
  displayColumns: z.array(z.string()),
  selectedBadges: z.array(z.string()),
});

export type EpicPreferences = z.infer<typeof epicPreferencesSchema>;

export const EPIC_COLUMNS = {
  ticketType: 'Type de ticket',
  ticketKey: 'Clé de ticket',
  ticketId: 'ID de ticket',
  summary: 'Résumé',
  assignee: 'Personne assignée',
  assigneeId: 'ID de la personne assignée',
  reporter: 'Rapporteur',
  reporterId: 'ID de rapporteur',
  priority: 'Priorité',
  status: 'État',
  resolution: 'Résolution',
  createdAt: 'Création',
  updatedAt: 'Mise à jour',
  dueDate: "Date d'échéance",
} as const;

export type EpicColumnKey = keyof typeof EPIC_COLUMNS;