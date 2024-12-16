import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';
import { Clock } from 'lucide-react';

interface TimeAllocationInputProps {
  meetingsPercentage: number;
  bugsPercentage: number;
  tnrPercentage: number;
  onChange: (data: {
    meetingsPercentage: number;
    bugsPercentage: number;
    tnrPercentage: number;
  }) => void;
}

export function TimeAllocationInput({
  meetingsPercentage,
  bugsPercentage,
  tnrPercentage,
  onChange,
}: TimeAllocationInputProps) {
  const { t } = useTranslation();

  const handleChange = (field: string, value: number) => {
    onChange({
      meetingsPercentage: field === 'meetings' ? value : meetingsPercentage,
      bugsPercentage: field === 'bugs' ? value : bugsPercentage,
      tnrPercentage: field === 'tnr' ? value : tnrPercentage,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Clock className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('sprints.timeAllocation')}
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TimeAllocationField
          icon="🧑‍🏫"
          label={t('sprints.metrics.actualMeetings')}
          value={meetingsPercentage}
          onChange={(value) => handleChange('meetings', value)}
        />

        <TimeAllocationField
          icon="🐞"
          label={t('sprints.metrics.actualBugs')}
          value={bugsPercentage}
          onChange={(value) => handleChange('bugs', value)}
        />

        <TimeAllocationField
          icon="🕵🏻"
          label={t('sprints.metrics.actualTNR')}
          value={tnrPercentage}
          onChange={(value) => handleChange('tnr', value)}
        />
      </div>
    </div>
  );
}

interface TimeAllocationFieldProps {
  icon: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function TimeAllocationField({ icon, label, value, onChange }: TimeAllocationFieldProps) {
  return (
    <div className="bg-gray-50 px-4 py-3 rounded-lg">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{icon}</span>
          <span className="font-medium text-gray-900">{label}</span>
        </div>
        <Input
          type="number"
          min="0"
          max="100"
          value={value}
          onChange={onChange}
          className="w-20"
          suffix="%"
        />
      </div>
    </div>
  );
}