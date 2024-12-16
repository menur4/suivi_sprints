import { create } from 'zustand';
import { Epic, Badge, EpicColumnKey, EpicPreferences } from '../types/epic';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface EpicState {
  epics: Epic[];
  badges: Badge[];
  preferences: EpicPreferences;
  addEpic: (epic: Epic) => void;
  addEpics: (epics: Epic[]) => void;
  updateEpic: (id: string, epic: Partial<Epic>) => void;
  deleteEpic: (id: string) => void;
  addBadge: (badge: Badge) => void;
  deleteBadge: (id: string) => void;
  addBadgeToEpic: (epicId: string, badgeId: string) => void;
  removeBadgeFromEpic: (epicId: string, badgeId: string) => void;
  updateDisplayColumns: (columns: EpicColumnKey[]) => void;
  updateSelectedBadges: (badges: string[]) => void;
}

const DEFAULT_COLUMNS: EpicColumnKey[] = ['ticketKey', 'summary', 'status', 'priority'];

const defaultPreferences: EpicPreferences = {
  displayColumns: DEFAULT_COLUMNS,
  selectedBadges: [],
};

export const useEpicStore = create<EpicState>((set) => ({
  epics: loadFromStorage('EPICS') || [],
  badges: loadFromStorage('BADGES') || [],
  preferences: loadFromStorage('EPIC_PREFERENCES') || defaultPreferences,
  
  addEpic: (epic) =>
    set((state) => {
      const newEpics = [...state.epics, epic];
      saveToStorage('EPICS', newEpics);
      return { epics: newEpics };
    }),
    
  addEpics: (newEpics) =>
    set((state) => {
      const epics = [...state.epics, ...newEpics];
      saveToStorage('EPICS', epics);
      return { epics };
    }),
    
  updateEpic: (id, updatedEpic) =>
    set((state) => {
      const newEpics = state.epics.map((epic) =>
        epic.id === id ? { ...epic, ...updatedEpic } : epic
      );
      saveToStorage('EPICS', newEpics);
      return { epics: newEpics };
    }),
    
  deleteEpic: (id) =>
    set((state) => {
      const newEpics = state.epics.filter((epic) => epic.id !== id);
      saveToStorage('EPICS', newEpics);
      return { epics: newEpics };
    }),
    
  addBadge: (badge) =>
    set((state) => {
      const newBadges = [...state.badges, badge];
      saveToStorage('BADGES', newBadges);
      return { badges: newBadges };
    }),
    
  deleteBadge: (id) =>
    set((state) => {
      const newBadges = state.badges.filter((badge) => badge.id !== id);
      saveToStorage('BADGES', newBadges);
      return { badges: newBadges };
    }),
    
  addBadgeToEpic: (epicId, badgeId) =>
    set((state) => {
      const newEpics = state.epics.map((epic) =>
        epic.id === epicId && !epic.badges.includes(badgeId)
          ? { ...epic, badges: [...epic.badges, badgeId] }
          : epic
      );
      saveToStorage('EPICS', newEpics);
      return { epics: newEpics };
    }),
    
  removeBadgeFromEpic: (epicId, badgeId) =>
    set((state) => {
      const newEpics = state.epics.map((epic) =>
        epic.id === epicId
          ? { ...epic, badges: epic.badges.filter((id) => id !== badgeId) }
          : epic
      );
      saveToStorage('EPICS', newEpics);
      return { epics: newEpics };
    }),
    
  updateDisplayColumns: (columns) =>
    set((state) => {
      const newPreferences = {
        ...state.preferences,
        displayColumns: columns,
      };
      saveToStorage('EPIC_PREFERENCES', newPreferences);
      return { preferences: newPreferences };
    }),
    
  updateSelectedBadges: (badges) =>
    set((state) => {
      const newPreferences = {
        ...state.preferences,
        selectedBadges: badges,
      };
      saveToStorage('EPIC_PREFERENCES', newPreferences);
      return { preferences: newPreferences };
    }),
}));