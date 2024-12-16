import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tag } from 'lucide-react';
import { useEpicStore } from '../../store/epicStore';

interface BadgeFilterProps {
  selectedBadges: string[];
  onBadgesChange: (badges: string[]) => void;
}

export function BadgeFilter({
  selectedBadges,
  onBadgesChange,
}: BadgeFilterProps) {
  const { t } = useTranslation();
  const { badges } = useEpicStore();

  const toggleBadge = (badgeId: string) => {
    if (selectedBadges.includes(badgeId)) {
      onBadgesChange(selectedBadges.filter(id => id !== badgeId));
    } else {
      onBadgesChange([...selectedBadges, badgeId]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <div className="flex items-center">
          <Tag className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            {t('roadmap.badges')}
          </h3>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
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