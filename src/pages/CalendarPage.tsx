import React from 'react';
import { Plus } from 'lucide-react';
import { useHolidayStore } from '../store/holidayStore';
import { Button } from '../components/ui/Button';
import { MonthNavigator } from '../components/calendar/MonthNavigator';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { HolidayList } from '../components/calendar/HolidayList';
import { useTranslation } from 'react-i18next';

export function CalendarPage() {
  const { holidays, addHoliday, removeHoliday, initializeHolidays } = useHolidayStore();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newHolidayName, setNewHolidayName] = React.useState('');
  const { t } = useTranslation();

  React.useEffect(() => {
    initializeHolidays(new Date().getFullYear());
  }, []);

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHolidayName.trim()) {
      const holiday = {
        id: crypto.randomUUID(),
        date: currentDate,
        name: newHolidayName.trim(),
        country: 'Custom'
      };
      addHoliday(holiday);
      setNewHolidayName('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('calendar.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('calendar.description')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            onClick={() => setShowAddForm(true)}
            icon={Plus}
          >
            {t('calendar.addHoliday')}
          </Button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t('calendar.addHoliday')}
            </h3>
            <form onSubmit={handleAddHoliday} className="mt-5 sm:flex sm:items-center">
              <div className="w-full sm:max-w-xs">
                <label htmlFor="holiday-name" className="sr-only">
                  {t('calendar.holidayName')}
                </label>
                <input
                  type="text"
                  id="holiday-name"
                  value={newHolidayName}
                  onChange={(e) => setNewHolidayName(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={t('calendar.holidayName')}
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                <Button type="submit">
                  {t('common.save')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MonthNavigator
        currentDate={currentDate}
        onMonthChange={setCurrentDate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CalendarGrid
            currentDate={currentDate}
            holidays={holidays}
            onRemoveHoliday={removeHoliday}
          />
        </div>
        <div>
          <HolidayList
            holidays={holidays}
            onRemoveHoliday={removeHoliday}
          />
        </div>
      </div>
    </div>
  );
}