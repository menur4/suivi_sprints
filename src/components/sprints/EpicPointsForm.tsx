import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEpicStore } from '../../store/epicStore';
import { Plus, X, Search } from 'lucide-react';
import { Input } from '../ui/Input';

interface EpicPoint {
  epicId: string;
  points: number;
}

interface EpicPointsFormProps {
  value: EpicPoint[];
  onChange: (value: EpicPoint[]) => void;
}

export function EpicPointsForm({ value, onChange }: EpicPointsFormProps) {
  const { t } = useTranslation();
  const { epics } = useEpicStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handlePointsChange = (epicId: string) => (points: number) => {
    onChange(
      value.map((item) =>
        item.epicId === epicId ? { ...item, points } : item
      )
    );
  };

  const handleRemoveEpic = (epicId: string) => {
    onChange(value.filter((item) => item.epicId !== epicId));
  };

  const handleAddEpic = (epicId: string) => {
    if (!value.some((item) => item.epicId === epicId)) {
      onChange([...value, { epicId, points: 0 }]);
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const filteredEpics = epics
    .filter(
      (epic) =>
        !value.some((item) => item.epicId === epic.id) &&
        (epic.ticketKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
          epic.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .slice(0, 5);

  const totalPoints = value.reduce((sum, { points }) => sum + points, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        {t('sprints.deliveredPoints')}
      </h3>

      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setShowSuggestions(true);
            }}
            placeholder={t('sprints.searchEpics')}
            className="w-full pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && searchQuery && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
            {filteredEpics.length > 0 ? (
              filteredEpics.map((epic) => (
                <button
                  key={epic.id}
                  onClick={() => handleAddEpic(epic.id)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">
                    {epic.ticketKey}
                  </span>
                  <span className="ml-2 text-gray-500 truncate">
                    {epic.summary}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                {t('sprints.noEpicsFound')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Epics */}
      <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
        {value.map(({ epicId, points }) => {
          const epic = epics.find((e) => e.id === epicId);
          if (!epic) return null;

          return (
            <div
              key={epicId}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg w-full"
            >
              <div className="flex-grow min-w-0 mr-4">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 mr-2 whitespace-nowrap">
                    {epic.ticketKey}
                  </span>
                  <span className="text-gray-500 truncate">
                    {epic.summary}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <Input
                  type="number"
                  min="0"
                  value={points}
                  onChange={handlePointsChange(epicId)}
                  className="w-20"
                  placeholder={t('sprints.points')}
                />
                <button
                  onClick={() => handleRemoveEpic(epicId)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Points */}
      {value.length > 0 && (
        <div className="flex justify-end items-center pt-4 border-t border-gray-200">
          <span className="font-medium text-gray-900 mr-4">
            {t('sprints.totalPoints')}:
          </span>
          <span className="text-2xl font-bold text-indigo-600">
            {totalPoints}
          </span>
        </div>
      )}
    </div>
  );
}