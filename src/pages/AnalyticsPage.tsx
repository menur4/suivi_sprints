import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEpicStore } from '../store/epicStore';
import { useSprintStore } from '../store/sprintStore';
import { YearlyChart } from '../components/analytics/YearlyChart';
import { QuarterlyCharts } from '../components/analytics/QuarterlyCharts';
import { VelocityChart } from '../components/analytics/VelocityChart';
import { BadgeFilter } from '../components/roadmap/BadgeFilter';

export function AnalyticsPage() {
  const { t } = useTranslation();
  const [selectedBadges, setSelectedBadges] = React.useState<string[]>([]);
  const { epics } = useEpicStore();
  const { sprints } = useSprintStore();

  const filteredEpics = epics.filter(epic => 
    selectedBadges.length === 0 || 
    epic.badges.some(badge => selectedBadges.includes(badge))
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('analytics.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('analytics.description')}
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

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t('analytics.teamVelocity')}
            </h2>
            <VelocityChart sprints={sprints} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t('analytics.yearlyDelivery')}
            </h2>
            <YearlyChart
              epics={filteredEpics}
              sprints={sprints}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t('analytics.quarterlyDelivery')}
            </h2>
            <QuarterlyCharts
              epics={filteredEpics}
              sprints={sprints}
            />
          </div>
        </div>
      </div>
    </div>
  );
}