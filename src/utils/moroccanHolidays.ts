import { Holiday } from '../types';

export const getMoroccanHolidays = (year: number): Holiday[] => {
  return [
    {
      id: `new-year-${year}`,
      date: new Date(year, 0, 1),
      name: "New Year's Day",
      country: 'MA'
    },
    {
      id: `independence-${year}`,
      date: new Date(year, 0, 11),
      name: 'Independence Manifesto Day',
      country: 'MA'
    },
    {
      id: `labor-day-${year}`,
      date: new Date(year, 4, 1),
      name: 'Labor Day',
      country: 'MA'
    },
    {
      id: `throne-day-${year}`,
      date: new Date(year, 6, 30),
      name: 'Throne Day',
      country: 'MA'
    },
    {
      id: `revolution-day-${year}`,
      date: new Date(year, 7, 20),
      name: "Revolution Day",
      country: 'MA'
    },
    {
      id: `youth-day-${year}`,
      date: new Date(year, 7, 21),
      name: "Youth Day",
      country: 'MA'
    },
    {
      id: `green-march-${year}`,
      date: new Date(year, 10, 6),
      name: "Green March Day",
      country: 'MA'
    },
    {
      id: `independence-day-${year}`,
      date: new Date(year, 10, 18),
      name: "Independence Day",
      country: 'MA'
    }
  ];
};