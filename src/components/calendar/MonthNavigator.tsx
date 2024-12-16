import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/Button';

interface MonthNavigatorProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

export function MonthNavigator({ currentDate, onMonthChange }: MonthNavigatorProps) {
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-sm">
      <Button
        variant="secondary"
        onClick={handlePreviousMonth}
        icon={ChevronLeft}
      />
      <h2 className="text-xl font-semibold text-gray-900">
        {format(currentDate, 'MMMM yyyy')}
      </h2>
      <Button
        variant="secondary"
        onClick={handleNextMonth}
        icon={ChevronRight}
      />
    </div>
  );
}