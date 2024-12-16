import React from 'react';
import { useEpicStore } from '../store/epicStore';
import { EpicList } from '../components/epics/EpicList';
import { CSVUploader } from '../components/epics/CSVUploader';
import { BadgeManager } from '../components/epics/BadgeManager';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function EpicsPage() {
  const { epics, badges, preferences, updateSelectedBadges } = useEpicStore();
  const [showBadgeManager, setShowBadgeManager] = React.useState(false);
  const { t } = useTranslation();

  const filteredEpics = epics.filter(epic => 
    preferences.selectedBadges.length === 0 || 
    epic.badges.some(badge => preferences.selectedBadges.includes(badge))
  );

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('epics.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('epics.description')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
          <Button
            onClick={() => setShowBadgeManager(true)}
            variant="secondary"
          >
            {t('epics.manageBadges')}
          </Button>
          <CSVUploader />
        </div>
      </div>

      {showBadgeManager && (
        <div className="mt-6">
          <BadgeManager
            onClose={() => setShowBadgeManager(false)}
          />
        </div>
      )}

      <div className="mt-8">
        <EpicList
          epics={filteredEpics}
          badges={badges}
          selectedBadges={preferences.selectedBadges}
          onBadgesChange={updateSelectedBadges}
          displayColumns={preferences.displayColumns}
        />
      </div>
    </div>
  );
}