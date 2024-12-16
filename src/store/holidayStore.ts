import { create } from 'zustand';
import { Holiday } from '../types';
import { getMoroccanHolidays } from '../utils/moroccanHolidays';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface HolidayState {
  holidays: Holiday[];
  addHoliday: (holiday: Holiday) => void;
  removeHoliday: (id: string) => void;
  initializeHolidays: (year: number) => void;
}

export const useHolidayStore = create<HolidayState>((set) => ({
  holidays: (loadFromStorage('HOLIDAYS') || []).map(holiday => ({
    ...holiday,
    date: new Date(holiday.date)
  })),
  addHoliday: (holiday) =>
    set((state) => {
      const newHolidays = [...state.holidays, holiday];
      saveToStorage('HOLIDAYS', newHolidays);
      return { holidays: newHolidays };
    }),
  removeHoliday: (id) =>
    set((state) => {
      const newHolidays = state.holidays.filter((holiday) => holiday.id !== id);
      saveToStorage('HOLIDAYS', newHolidays);
      return { holidays: newHolidays };
    }),
  initializeHolidays: (year) =>
    set((state) => {
      const existingHolidays = state.holidays.filter(
        (holiday) => holiday.country === 'Custom'
      );
      const newHolidays = [...getMoroccanHolidays(year), ...existingHolidays];
      saveToStorage('HOLIDAYS', newHolidays);
      return { holidays: newHolidays };
    }),
}));