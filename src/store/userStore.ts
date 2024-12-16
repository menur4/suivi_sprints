import { create } from 'zustand';
import { User } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface UserState {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
}

const defaultAdmin = {
  id: '1',
  username: 'admin',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin' as const,
  active: true,
  createdAt: new Date(),
};

export const useUserStore = create<UserState>((set) => ({
  users: loadFromStorage('USERS') || [defaultAdmin],
  addUser: (user) =>
    set((state) => {
      const newUsers = [...state.users, user];
      saveToStorage('USERS', newUsers);
      return { users: newUsers };
    }),
  updateUser: (id, updatedUser) =>
    set((state) => {
      const newUsers = state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      );
      saveToStorage('USERS', newUsers);
      return { users: newUsers };
    }),
  deleteUser: (id) =>
    set((state) => {
      const newUsers = state.users.filter((user) => user.id !== id);
      saveToStorage('USERS', newUsers);
      return { users: newUsers };
    }),
  toggleUserStatus: (id) =>
    set((state) => {
      const newUsers = state.users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      );
      saveToStorage('USERS', newUsers);
      return { users: newUsers };
    }),
}));