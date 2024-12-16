import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, Calendar } from 'lucide-react';
import { calculateWorkingDays, calculateHolidayDays } from '../../utils/date';
import { calculateSprintCapacity } from '../../utils/capacity';
import { useHolidayStore } from '../../store/holidayStore';
import { SprintPointsCapacity } from './SprintPointsCapacity';

interface SprintCapacityCalculatorProps {
  startDate: Date;
  endDate: Date;
  totalDevelopers: number;
  absenceDays: number;
  meetingsPercentage: number;
  bugsPercentage: number;
  tnrPercentage: number;
}

export function SprintCapacityCalculator({
  startDate,
  endDate,
  totalDevelopers,
  absenceDays,
  meetingsPercentage,
  bugsPercentage,
  tnrPercentage,
}: SprintCapacityCalculatorProps) {
  const { t } = useTranslation();
  const { holidays } = useHolidayStore();

  const workingDays = calculateWorkingDays(startDate, endDate);
  const holidayDays = calculateHolidayDays(startDate, endDate, holidays);
  const effectiveWorkingDays = workingDays - holidayDays;

  const capacity = calculateSprintCapacity({
    totalDevelopers,
    workingDays: effectiveWorkingDays,
    meetingsPercentage,
    bugsPercentage,
    tnrPercentage,
    absenceDays,
  });

  const timeAllocationPercentage = meetingsPercentage + bugsPercentage + tnrPercentage;
  const availablePercentage = 100 - timeAllocationPercentage;

  const calculateDays = (percentage: number) => {
    return ((effectiveWorkingDays * totalDevelopers - absenceDays) * percentage) / 100;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Calculator className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('sprints.capacityCalculation')}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            <h4 className="text-sm font-medium text-blue-800">
              {t('sprints.daysCalculation')}
            </h4>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-blue-600">{t('sprints.workingDays')}</p>
              <p className="text-2xl font-bold text-blue-700">{workingDays} {t('sprints.days')}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">{t('sprints.holidayDays')}</p>
              <p className="text-2xl font-bold text-blue-700">{holidayDays} {t('sprints.days')}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">{t('sprints.effectiveWorkingDays')}</p>
              <p className="text-2xl font-bold text-blue-700">{effectiveWorkingDays} {t('sprints.days')}</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Calculator className="h-5 w-5 text-indigo-500 mr-2" />
            <h4 className="text-sm font-medium text-indigo-800">
              {t('sprints.timeAllocation')}
            </h4>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-indigo-600">{t('sprints.meetings')}</p>
              <p className="text-lg font-bold text-indigo-700">
                {meetingsPercentage}% = {calculateDays(meetingsPercentage).toFixed(1)} {t('sprints.days')}
              </p>
            </div>
            <div>
              <p className="text-sm text-indigo-600">{t('sprints.bugs')}</p>
              <p className="text-lg font-bold text-indigo-700">
                {bugsPercentage}% = {calculateDays(bugsPercentage).toFixed(1)} {t('sprints.days')}
              </p>
            </div>
            <div>
              <p className="text-sm text-indigo-600">{t('sprints.tnr')}</p>
              <p className="text-lg font-bold text-indigo-700">
                {tnrPercentage}% = {calculateDays(tnrPercentage).toFixed(1)} {t('sprints.days')}
              </p>
            </div>
            <div className="pt-2 border-t border-indigo-200">
              <p className="text-sm text-indigo-600">{t('sprints.availableTime')}</p>
              <p className="text-lg font-bold text-indigo-700">
                {availablePercentage}% = {calculateDays(availablePercentage).toFixed(1)} {t('sprints.days')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Calculator className="h-5 w-5 text-purple-500 mr-2" />
          <h4 className="text-sm font-medium text-purple-800">
            {t('sprints.plannedCapacity')}
          </h4>
        </div>
        <p className="text-3xl font-bold text-purple-700">
          {Math.round(capacity)} {t('sprints.days')}
        </p>
      </div>

      <SprintPointsCapacity plannedCapacity={capacity} />
    </div>
  );
}