import React from 'react';
import { useTranslation } from 'react-i18next';
import { EPIC_COLUMNS, EpicColumnKey } from '../../types/epic';
import { Button } from '../ui/Button';
import { Settings } from 'lucide-react';

interface ColumnSelectorProps {
  selectedColumns: EpicColumnKey[];
  onColumnsChange: (columns: EpicColumnKey[]) => void;
}

export function ColumnSelector({ selectedColumns, onColumnsChange }: ColumnSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleColumnToggle = (column: EpicColumnKey) => {
    if (selectedColumns.includes(column)) {
      onColumnsChange(selectedColumns.filter(c => c !== column));
    } else {
      onColumnsChange([...selectedColumns, column]);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="secondary"
        icon={Settings}
        onClick={() => setIsOpen(!isOpen)}
      >
        {t('epics.configureColumns')}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              {t('epics.selectColumns')}
            </h3>
            <div className="space-y-2">
              {(Object.entries(EPIC_COLUMNS) as [EpicColumnKey, string][]).map(([key, label]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(key)}
                    onChange={() => handleColumnToggle(key)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}