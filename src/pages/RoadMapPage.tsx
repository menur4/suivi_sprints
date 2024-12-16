import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEpicStore } from '../store/epicStore';
import { useSprintStore } from '../store/sprintStore';
import { Timeline } from '../components/roadmap/Timeline';
import { BadgeFilter } from '../components/roadmap/BadgeFilter';

export function RoadMapPage() {
  const { t } = useTranslation();
  const { epics } = useEpicStore();
  const { sprints } = useSprintStore();
  const [selectedBadges, setSelectedBadges] = React.useState<string[]>([]);

  const filteredEpics = epics.filter(epic => 
    selectedBadges.length === 0 || 
    epic.badges.some(badge => selectedBadges.includes(badge))
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('roadmap.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('roadmap.description')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <BadgeFilter
            selectedBadges={selectedBadges}
            onBadgesChange={setSelectedBadges}
          />
        </div>
        
        <div className="lg:col-span-3">
          <Timeline 
            epics={filteredEpics}
            sprints={sprints}
          />
        </div>
      </div>
    </div>
  );
}