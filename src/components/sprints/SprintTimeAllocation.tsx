import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { Input } from '../ui/Input';
import { useFormContext } from 'react-hook-form';

interface SprintTimeAllocationProps {
  register: any;
  errors: any;
}

export function SprintTimeAllocation({ register, errors }: SprintTimeAllocationProps) {
  const { t } = useTranslation();
  const { setValue, watch } = useFormContext();

  const meetingsPercentage = watch('meetingsPercentage') || 0;
  const bugsPercentage = watch('bugsPercentage') || 0;
  const tnrPercentage = watch('tnrPercentage') || 0;

  const handleValueChange = (field: string) => (value: number) => {
    setValue(field, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
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
          onChange={handleValueChange('meetingsPercentage')}
          error={errors.meetingsPercentage?.message}
        />

        <TimeAllocationField
          icon="🐞"
          label={t('sprints.metrics.actualBugs')}
          value={bugsPercentage}
          onChange={handleValueChange('bugsPercentage')}
          error={errors.bugsPercentage?.message}
        />

        <TimeAllocationField
          icon="🕵🏻"
          label={t('sprints.metrics.actualTNR')}
          value={tnrPercentage}
          onChange={handleValueChange('tnrPercentage')}
          error={errors.tnrPercentage?.message}
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
  error?: string;
}

function TimeAllocationField({ icon, label, value, onChange, error }: TimeAllocationFieldProps) {
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
          error={error}
          className="w-20"
          suffix="%"
        />
      </div>
    </div>
  );
}