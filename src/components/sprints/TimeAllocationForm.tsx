import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';

interface TimeAllocationFormProps {
  meetingsPercentage: number;
  bugsPercentage: number;
  tnrPercentage: number;
  onChange: (data: {
    meetingsPercentage: number;
    bugsPercentage: number;
    tnrPercentage: number;
  }) => void;
}

export function TimeAllocationForm({
  meetingsPercentage,
  bugsPercentage,
  tnrPercentage,
  onChange,
}: TimeAllocationFormProps) {
  const { t } = useTranslation();

  const handleChange = (field: string) => (value: number) => {
    onChange({
      meetingsPercentage: field === 'meetings' ? value : meetingsPercentage,
      bugsPercentage: field === 'bugs' ? value : bugsPercentage,
      tnrPercentage: field === 'tnr' ? value : tnrPercentage,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        {t('sprints.timeAllocation')}
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🧑‍🏫</span>
            <span className="font-medium text-gray-900">
              {t('sprints.metrics.actualMeetings')}
            </span>
          </div>
          <Input
            type="number"
            min="0"
            max="100"
            value={meetingsPercentage}
            onChange={handleChange('meetings')}
            className="w-20"
            suffix="%"
          />
        </div>

        <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🐞</span>
            <span className="font-medium text-gray-900">
              {t('sprints.metrics.actualBugs')}
            </span>
          </div>
          <Input
            type="number"
            min="0"
            max="100"
            value={bugsPercentage}
            onChange={handleChange('bugs')}
            className="w-20"
            suffix="%"
          />
        </div>

        <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🕵🏻</span>
            <span className="font-medium text-gray-900">
              {t('sprints.metrics.actualTNR')}
            </span>
          </div>
          <Input
            type="number"
            min="0"
            max="100"
            value={tnrPercentage}
            onChange={handleChange('tnr')}
            className="w-20"
            suffix="%"
          />
        </div>
      </div>
    </div>
  );
}