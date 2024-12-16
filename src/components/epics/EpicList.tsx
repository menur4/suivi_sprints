import React from 'react';
import { format } from 'date-fns';
import { Epic, Badge, EpicColumnKey, EPIC_COLUMNS } from '../../types/epic';
import { useEpicStore } from '../../store/epicStore';
import { Button } from '../ui/Button';
import { Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ColumnSelector } from './ColumnSelector';

interface EpicListProps {
  epics: Epic[];
  badges: Badge[];
  selectedBadges: string[];
  onBadgesChange: (badges: string[]) => void;
  displayColumns: EpicColumnKey[];
}

export function EpicList({
  epics,
  badges,
  selectedBadges,
  onBadgesChange,
  displayColumns,
}: EpicListProps) {
  const { deleteEpic, addBadgeToEpic, removeBadgeFromEpic, updateDisplayColumns } = useEpicStore();
  const { t } = useTranslation();

  const renderCellContent = (epic: Epic, column: EpicColumnKey) => {
    const value = epic[column];
    
    if (column === 'createdAt' || column === 'updatedAt' || column === 'dueDate') {
      return value ? format(new Date(value), 'PP') : '-';
    }
    
    return value || '-';
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          {badges.map((badge) => (
            <label key={badge.id} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedBadges.includes(badge.id)}
                onChange={() => {
                  const newBadges = selectedBadges.includes(badge.id)
                    ? selectedBadges.filter(id => id !== badge.id)
                    : [...selectedBadges, badge.id];
                  onBadgesChange(newBadges);
                }}
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
        <ColumnSelector
          selectedColumns={displayColumns}
          onColumnsChange={updateDisplayColumns}
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {displayColumns.map(column => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {EPIC_COLUMNS[column]}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('epics.badges')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {epics.map((epic) => (
              <tr key={epic.id}>
                {displayColumns.map(column => (
                  <td key={column} className="px-6 py-4 text-sm text-gray-500">
                    {renderCellContent(epic, column)}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {epic.badges.map((badgeId) => {
                      const badge = badges.find((b) => b.id === badgeId);
                      if (!badge) return null;
                      return (
                        <span
                          key={badge.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: badge.color }}
                        >
                          {badge.name}
                          <button
                            onClick={() => removeBadgeFromEpic(epic.id, badge.id)}
                            className="ml-1 text-white opacity-75 hover:opacity-100"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                    <select
                      className="text-xs border-gray-300 rounded-md"
                      onChange={(e) => {
                        if (e.target.value) {
                          addBadgeToEpic(epic.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                      value=""
                    >
                      <option value="">{t('epics.addBadge')}</option>
                      {badges
                        .filter((badge) => !epic.badges.includes(badge.id))
                        .map((badge) => (
                          <option key={badge.id} value={badge.id}>
                            {badge.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="secondary"
                      icon={Edit}
                      onClick={() => {}}
                    >
                      {t('common.edit')}
                    </Button>
                    <Button
                      variant="secondary"
                      icon={Trash2}
                      onClick={() => deleteEpic(epic.id)}
                    >
                      {t('common.delete')}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}