import React from 'react';
import { format } from 'date-fns';
import { Epic, Sprint } from '../../types';
import { useEpicStore } from '../../store/epicStore';
import { useTranslation } from 'react-i18next';

interface TimelineEpicProps {
  epic: Epic;
  sprints: Sprint[];
}

export function TimelineEpic({ epic, sprints }: TimelineEpicProps) {
  const { t } = useTranslation();
  const { badges } = useEpicStore();
  const epicBadges = badges.filter(badge => epic.badges.includes(badge.id));

  // Calculate total points and find sprints with points
  const sprintPoints = sprints.map(sprint => {
    const epicPoint = sprint.epicPoints.find(ep => ep.epicId === epic.id);
    return {
      sprint,
      points: epicPoint?.points || 0
    };
  });

  const totalPoints = sprintPoints.reduce((sum, { points }) => sum + points, 0);

  // Find start and end indices for the timeline bar
  const startIndex = sprintPoints.findIndex(sp => sp.points > 0);
  const endIndex = sprintPoints.length - 1 - [...sprintPoints].reverse().findIndex(sp => sp.points > 0);

  if (startIndex === -1 || endIndex === -1) return null;

  return (
    <div className="grid grid-cols-[200px_1fr] hover:bg-gray-50">
      <div className="p-4 flex flex-col justify-center">
        <div className="font-medium text-gray-900">{epic.ticketKey}</div>
        <div className="text-sm text-gray-500 truncate">{epic.summary}</div>
        <div className="mt-1 flex flex-wrap gap-1">
          {epicBadges.map(badge => (
            <span
              key={badge.id}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
              style={{ backgroundColor: badge.color, color: 'white' }}
            >
              {badge.name}
            </span>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {t('sprints.totalPoints')}: {totalPoints}
        </div>
      </div>
      <div className="grid relative" style={{ gridTemplateColumns: `repeat(${sprints.length}, 1fr)` }}>
        {/* Timeline bar */}
        <div 
          className="absolute top-1/2 h-2 bg-indigo-600 rounded-full transform -translate-y-1/2"
          style={{
            left: `${(startIndex / sprints.length) * 100}%`,
            width: `${((endIndex - startIndex + 1) / sprints.length) * 100}%`
          }}
        />
        
        {/* Sprint points indicators */}
        {sprintPoints.map(({ sprint, points }, index) => (
          <div
            key={sprint.id}
            className="p-4 flex flex-col items-center justify-center gap-2 border-l border-gray-200"
          >
            {points > 0 && (
              <div className="relative group">
                <div className={`h-8 w-8 rounded-full bg-white border-2 flex items-center justify-center text-sm font-medium ${
                  points >= sprint.plannedCapacity
                    ? 'border-green-600 text-green-700'
                    : 'border-yellow-600 text-yellow-700'
                }`}>
                  {points}
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">
                  <div className="font-medium mb-1">
                    {sprint.name}
                  </div>
                  <div>
                    {format(sprint.startDate, 'MMM d')} - {format(sprint.endDate, 'MMM d, yyyy')}
                  </div>
                  <div>
                    {t('sprints.points')}: {points}
                  </div>
                  <div className="mt-1 text-gray-300">
                    {Math.round((points / totalPoints) * 100)}% {t('sprints.totalPoints')}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}