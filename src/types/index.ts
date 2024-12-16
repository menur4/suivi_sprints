export interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  totalDevelopers: number;
  absenceDays: number;
  meetingsPercentage: number;
  bugsPercentage: number;
  tnrPercentage: number;
  plannedCapacity: number;
  actualCapacity: number;
  deliveredPoints: number;
  epicPoints: Array<{
    epicId: string;
    points: number;
  }>;
  goals: string;
}

export interface Holiday {
  id: string;
  date: Date;
  name: string;
  country: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: 'admin' | 'user';
  active?: boolean;
  createdAt: Date;
}