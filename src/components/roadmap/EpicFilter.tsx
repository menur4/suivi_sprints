import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import { useEpicStore } from '../../store/epicStore';

interface EpicFilterProps {
  selectedStatus: string[];
  onStatusChange: (status: string[]) => void;
  selectedBadges: string[];
  onBadgesChange: (badges: string[]) => void;
}

export function EpicFilter({
  selectedStatus,
  onStatusChange,
  selectedBadges,
  onBadgesChange,
}: EpicFilterProps) {
  const { t } = useTranslation();
  const { epics, badges } = useEpicStore();

  // Get unique status values from epics
  const uniqueStatuses = Array.from(new Set(epics.map(epic => epic.status)));

  const toggleStatus = (status: string) => {
    if (selectedStatus.includes(status)) {
      onStatusChange(selectedStatus.filter(s => s !== status));
    } else {
      onStatusChange([...selectedStatus, status]);
    }
  };

  const toggleBadge = (badgeId: string) => {
    if (selectedBadges.includes(badgeId)) {
      onBadgesChange(selectedBadges.filter(id => id !== badgeId));
    } else {
      onBadgesChange([...selectedBadges, badgeId]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="p-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            {t('roadmap.filters')}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          {t('roadmap.status')}
        </h4>
        <div className="space-y-2">
          {uniqueStatuses.map(status => (
            <label key={status} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedStatus.includes(status)}
                onChange={() => toggleStatus(status)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">{status}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          {t('roadmap.badges')}
        </h4>
        <div className="space-y-2">
          {badges.map(badge => (
            <label key={badge.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBadges.includes(badge.id)}
                onChange={() => toggleBadge(badge.id)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span
                className="ml-2 px-2 py-0.5 rounded text-xs font-medium"
                style={{ backgroundColor: badge.color, color: 'white' }}
              >
                {badge.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}