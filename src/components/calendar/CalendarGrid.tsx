import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend, isSameMonth, isToday } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Holiday } from '../../types';
import { useTranslation } from 'react-i18next';

interface CalendarGridProps {
  currentDate: Date;
  holidays: Holiday[];
  onRemoveHoliday: (id: string) => void;
}

export function CalendarGrid({ currentDate, holidays, onRemoveHoliday }: CalendarGridProps) {
  const { t } = useTranslation();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of the week for the first day (0 = Sunday)
  const startDay = monthStart.getDay();
  
  // Calculate padding days for the start of the month
  const paddingDays = Array.from({ length: startDay }, (_, i) => {
    const day = new Date(monthStart);
    day.setDate(-startDay + i + 1);
    return day;
  });

  // Calculate padding days for the end of the month
  const endDay = 6 - monthEnd.getDay();
  const endPaddingDays = Array.from({ length: endDay }, (_, i) => {
    const day = new Date(monthEnd);
    day.setDate(monthEnd.getDate() + i + 1);
    return day;
  });

  const allDays = [...paddingDays, ...daysInMonth, ...endPaddingDays];

  const getHolidayForDate = (date: Date) => {
    return holidays.find(
      holiday => format(holiday.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-7 border-b border-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {allDays.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentDate);
          const holiday = getHolidayForDate(date);
          const isCurrentDay = isToday(date);

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border-b border-r border-gray-200 ${
                !isCurrentMonth ? 'bg-gray-50' : ''
              } ${isWeekend(date) ? 'bg-gray-50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm ${
                    isCurrentDay
                      ? 'bg-indigo-600 text-white'
                      : isCurrentMonth
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {format(date, 'd')}
                </span>
                {holiday && holiday.country === 'Custom' && (
                  <button
                    onClick={() => onRemoveHoliday(holiday.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              {holiday && (
                <div className="mt-1">
                  <span className={`text-xs font-medium ${
                    holiday.country === 'Custom' ? 'text-purple-600' : 'text-blue-600'
                  }`}>
                    {holiday.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}