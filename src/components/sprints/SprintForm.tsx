import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Save } from 'lucide-react';
import { Sprint } from '../../types';
import { Button } from '../ui/Button';
import { SprintBasicInfo } from './SprintBasicInfo';
import { SprintTimeAllocation } from './SprintTimeAllocation';
import { SprintGoals } from './SprintGoals';
import { SprintCapacityCalculator } from './SprintCapacityCalculator';
import { calculateWorkingDays } from '../../utils/date';
import { calculateSprintCapacity } from '../../utils/capacity';
import { sprintSchema, type SprintFormData } from '../../schemas/sprintSchema';

interface SprintFormProps {
  onSubmit: (sprint: Sprint) => void;
  initialData?: Partial<Sprint>;
}

export function SprintForm({ onSubmit, initialData }: SprintFormProps) {
  const { t } = useTranslation();
  
  const methods = useForm<SprintFormData>({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: initialData?.name || '',
      quarter: '',
      startDate: initialData?.startDate || null,
      endDate: initialData?.endDate || null,
      totalDevelopers: initialData?.totalDevelopers || 1,
      absenceDays: initialData?.absenceDays || 0,
      meetingsPercentage: initialData?.meetingsPercentage || 0,
      bugsPercentage: initialData?.bugsPercentage || 0,
      tnrPercentage: initialData?.tnrPercentage || 0,
      goals: initialData?.goals || '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const formValues = watch();

  const handleFormSubmit = (data: SprintFormData) => {
    const workingDays = calculateWorkingDays(data.startDate, data.endDate);
    const plannedCapacity = calculateSprintCapacity({
      totalDevelopers: data.totalDevelopers,
      workingDays,
      meetingsPercentage: data.meetingsPercentage,
      bugsPercentage: data.bugsPercentage,
      tnrPercentage: data.tnrPercentage,
      absenceDays: data.absenceDays,
    });

    onSubmit({
      id: initialData?.id || crypto.randomUUID(),
      name: `${data.name} - ${data.quarter}`,
      startDate: data.startDate,
      endDate: data.endDate,
      totalDevelopers: data.totalDevelopers,
      absenceDays: data.absenceDays,
      meetingsPercentage: data.meetingsPercentage,
      bugsPercentage: data.bugsPercentage,
      tnrPercentage: data.tnrPercentage,
      plannedCapacity,
      actualCapacity: plannedCapacity,
      deliveredPoints: 0,
      epicPoints: [],
      goals: data.goals,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <SprintBasicInfo errors={errors} />

        <SprintTimeAllocation errors={errors} />

        <SprintGoals
          value={formValues.goals}
          onChange={(value) => methods.setValue('goals', value)}
        />

        {formValues.startDate && formValues.endDate && (
          <SprintCapacityCalculator
            startDate={formValues.startDate}
            endDate={formValues.endDate}
            totalDevelopers={formValues.totalDevelopers || 0}
            absenceDays={formValues.absenceDays || 0}
            meetingsPercentage={formValues.meetingsPercentage || 0}
            bugsPercentage={formValues.bugsPercentage || 0}
            tnrPercentage={formValues.tnrPercentage || 0}
          />
        )}

        <div className="flex justify-end">
          <Button type="submit" icon={Save}>
            {initialData ? t('common.update') : t('sprints.createSprint')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}