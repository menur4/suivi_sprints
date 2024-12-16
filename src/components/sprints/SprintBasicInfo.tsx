import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Users, Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { DateRangePicker } from '../ui/DateRangePicker';

interface SprintBasicInfoProps {
  errors: any;
}

export function SprintBasicInfo({ errors }: SprintBasicInfoProps) {
  const { t } = useTranslation();
  const { register, control, setValue, watch } = useFormContext();

  const quarterOptions = [
    { value: '', label: t('sprints.selectQuarter') },
    { value: 'Q1', label: t('sprints.q1') },
    { value: 'Q2', label: t('sprints.q2') },
    { value: 'Q3', label: t('sprints.q3') },
    { value: 'Q4', label: t('sprints.q4') },
  ];

  const handleNumberChange = (field: string) => (value: number) => {
    setValue(field, value, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('sprints.sprintName')}
          error={errors.name?.message}
          value={watch('name')}
          onChange={(value) => setValue('name', value)}
        />

        <Select
          label={t('sprints.quarter')}
          error={errors.quarter?.message}
          options={quarterOptions}
          value={watch('quarter')}
          onChange={(e) => setValue('quarter', e.target.value)}
        />
      </div>

      <Controller
        control={control}
        name="startDate"
        render={({ field: { onChange: setStartDate, value: startDate } }) => (
          <Controller
            control={control}
            name="endDate"
            render={({ field: { onChange: setEndDate, value: endDate } }) => (
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                error={errors.startDate?.message || errors.endDate?.message}
              />
            )}
          />
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-400" />
          <Input
            type="number"
            min="1"
            label={t('sprints.teamSize')}
            error={errors.totalDevelopers?.message}
            value={watch('totalDevelopers')}
            onChange={handleNumberChange('totalDevelopers')}
            suffix={t('sprints.developers')}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <Input
            type="number"
            min="0"
            label={t('sprints.absenceDays')}
            error={errors.absenceDays?.message}
            value={watch('absenceDays')}
            onChange={handleNumberChange('absenceDays')}
            suffix={t('sprints.days')}
          />
        </div>
      </div>
    </div>
  );
}