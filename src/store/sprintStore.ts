import { create } from 'zustand';
import { Sprint } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface SprintState {
  sprints: Sprint[];
  currentSprint: Sprint | null;
  addSprint: (sprint: Sprint) => void;
  updateSprint: (id: string, sprint: Partial<Sprint>) => void;
  deleteSprint: (id: string) => void;
  setCurrentSprint: (sprint: Sprint) => void;
}

export const useSprintStore = create<SprintState>((set) => ({
  sprints: loadFromStorage('SPRINTS') || [],
  currentSprint: null,
  addSprint: (sprint) =>
    set((state) => {
      const newSprints = [...state.sprints, sprint];
      saveToStorage('SPRINTS', newSprints);
      return { sprints: newSprints };
    }),
  updateSprint: (id, updatedSprint) =>
    set((state) => {
      const newSprints = state.sprints.map((sprint) =>
        sprint.id === id ? { ...sprint, ...updatedSprint } : sprint
      );
      saveToStorage('SPRINTS', newSprints);
      return { sprints: newSprints };
    }),
  deleteSprint: (id) =>
    set((state) => {
      const newSprints = state.sprints.filter((sprint) => sprint.id !== id);
      saveToStorage('SPRINTS', newSprints);
      return { sprints: newSprints };
    }),
  setCurrentSprint: (sprint) => set({ currentSprint: sprint }),
}));