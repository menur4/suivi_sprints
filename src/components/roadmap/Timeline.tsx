import React from 'react';
import { Epic, Sprint } from '../../types';
import { TimelineHeader } from './TimelineHeader';
import { TimelineEpic } from './TimelineEpic';
import { useTranslation } from 'react-i18next';

interface TimelineProps {
  epics: Epic[];
  sprints: Sprint[];
}

export function Timeline({ epics, sprints }: TimelineProps) {
  const { t } = useTranslation();

  // Filter out epics with no points and sort sprints
  const epicsWithPoints = epics.filter(epic => 
    sprints.some(sprint => 
      sprint.epicPoints.some(ep => ep.epicId === epic.id && ep.points > 0)
    )
  );

  const sortedSprints = [...sprints].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  if (!sortedSprints.length || !epicsWithPoints.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('roadmap.noEpics')}
        </h3>
        <p className="text-sm text-gray-500">
          {t('roadmap.noEpicsDescription')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <TimelineHeader sprints={sortedSprints} />
      
      <div className="divide-y divide-gray-200">
        {epicsWithPoints.map(epic => (
          <TimelineEpic
            key={epic.id}
            epic={epic}
            sprints={sortedSprints}
          />
        ))}
      </div>
    </div>
  );
}