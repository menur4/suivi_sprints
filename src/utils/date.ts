import { addDays, isWeekend, isWithinInterval } from 'date-fns';
import { Holiday } from '../types';

export function calculateWorkingDays(startDate: Date, endDate: Date): number {
  let workingDays = 0;
  let currentDate = startDate;

  while (currentDate <= endDate) {
    if (!isWeekend(currentDate)) {
      workingDays++;
    }
    currentDate = addDays(currentDate, 1);
  }

  return workingDays;
}

export function calculateHolidayDays(startDate: Date, endDate: Date, holidays: Holiday[]): number {
  return holidays.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return (
      isWithinInterval(holidayDate, { start: startDate, end: endDate }) &&
      !isWeekend(holidayDate)
    );
  }).length;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}