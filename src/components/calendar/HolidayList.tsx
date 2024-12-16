import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { Holiday } from '../../types';
import { useTranslation } from 'react-i18next';

interface HolidayListProps {
  holidays: Holiday[];
  onRemoveHoliday: (id: string) => void;
}

export function HolidayList({ holidays, onRemoveHoliday }: HolidayListProps) {
  const { t } = useTranslation();
  const sortedHolidays = [...holidays].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">
          {t('calendar.holidayList')}
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {sortedHolidays.map((holiday) => (
          <li key={holiday.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {holiday.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(holiday.date, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              {holiday.country === 'Custom' && (
                <button
                  onClick={() => onRemoveHoliday(holiday.id)}
                  className="ml-4 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}