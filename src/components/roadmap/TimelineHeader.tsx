import React from 'react';
import { format, isSameMonth } from 'date-fns';
import { Sprint } from '../../types';
import { useTranslation } from 'react-i18next';

interface TimelineHeaderProps {
  sprints: Sprint[];
}

export function TimelineHeader({ sprints }: TimelineHeaderProps) {
  const { t } = useTranslation();

  // Group sprints by month
  const monthGroups = sprints.reduce((groups, sprint, index) => {
    const month = format(sprint.startDate, 'MMM yyyy');
    if (!groups[month]) {
      groups[month] = {
        month,
        startIndex: index,
        count: 1,
      };
    } else {
      groups[month].count++;
    }
    return groups;
  }, {} as Record<string, { month: string; startIndex: number; count: number }>);

  return (
    <div className="border-b border-gray-200">
      {/* Month Headers */}
      <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
        <div className="p-4 font-medium text-gray-700 bg-gray-50">
          {t('calendar.title')}
        </div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${sprints.length}, 1fr)` }}>
          {Object.values(monthGroups).map(({ month, startIndex, count }) => (
            <div
              key={month}
              className="border-l border-gray-200 bg-gray-50 p-2 text-center font-medium text-gray-700"
              style={{
                gridColumn: `${startIndex + 1} / span ${count}`,
              }}
            >
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Sprint Headers */}
      <div className="grid grid-cols-[200px_1fr]">
        <div className="p-4 font-medium text-gray-700 bg-gray-50">
          {t('epics.title')}
        </div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${sprints.length}, 1fr)` }}>
          {sprints.map((sprint) => (
            <div
              key={sprint.id}
              className="p-4 text-sm font-medium text-gray-700 bg-gray-50 border-l border-gray-200"
            >
              <div className="text-center space-y-2">
                <div className="font-medium text-indigo-600">
                  {sprint.name}
                </div>
                <div className="text-xs text-gray-500">
                  {format(sprint.startDate, 'MMM d')} - {format(sprint.endDate, 'MMM d, yyyy')}
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                    {t('sprints.deliveredPoints')}: {sprint.deliveredPoints}
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
                    {t('sprints.plannedCapacity')}: {Math.round(sprint.plannedCapacity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}