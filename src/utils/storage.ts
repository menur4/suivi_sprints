import { Sprint, Holiday, User } from '../types';
import { Epic, Badge, EpicPreferences } from '../types/epic';

const STORAGE_KEYS = {
  SPRINTS: 'clic_sprints',
  HOLIDAYS: 'clic_holidays',
  USERS: 'clic_users',
  EPICS: 'clic_epics',
  BADGES: 'clic_badges',
  EPIC_PREFERENCES: 'clic_epic_preferences',
} as const;

export function loadFromStorage<T>(key: keyof typeof STORAGE_KEYS): T | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS[key]);
    if (!data) return null;

    const parsed = JSON.parse(data);

    // Handle date conversions based on the type
    switch (key) {
      case 'SPRINTS':
        return parsed.map((sprint: any) => ({
          ...sprint,
          startDate: new Date(sprint.startDate),
          endDate: new Date(sprint.endDate),
        }));
      case 'HOLIDAYS':
        return parsed.map((holiday: any) => ({
          ...holiday,
          date: new Date(holiday.date),
        }));
      case 'USERS':
        return parsed.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
        }));
      case 'EPICS':
        return parsed.map((epic: any) => ({
          ...epic,
          createdAt: new Date(epic.createdAt),
          updatedAt: new Date(epic.updatedAt),
          dueDate: epic.dueDate ? new Date(epic.dueDate) : null,
        }));
      default:
        return parsed;
    }
  } catch (error) {
    console.error(`Error loading ${key} from storage:`, error);
    return null;
  }
}

export function saveToStorage<T>(key: keyof typeof STORAGE_KEYS, data: T): void {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
}