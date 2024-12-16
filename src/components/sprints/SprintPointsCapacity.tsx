import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp } from 'lucide-react';
import { useSprintStore } from '../../store/sprintStore';
import { calculateAverageVelocity, calculatePointsCapacity } from '../../utils/velocity';

interface SprintPointsCapacityProps {
  plannedCapacity: number;
}

export function SprintPointsCapacity({ plannedCapacity }: SprintPointsCapacityProps) {
  const { t } = useTranslation();
  const { sprints } = useSprintStore();

  const averageVelocity = calculateAverageVelocity(sprints);
  const pointsCapacity = calculatePointsCapacity(plannedCapacity, averageVelocity);

  if (averageVelocity === 0) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 text-yellow-400 mr-2" />
          <h4 className="text-sm font-medium text-yellow-800">
            {t('sprints.noVelocityData')}
          </h4>
        </div>
        <p className="mt-2 text-sm text-yellow-700">
          {t('sprints.completeSprintsNeeded')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
        <h4 className="text-sm font-medium text-green-800">
          {t('sprints.estimatedCapacity')}
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-green-600">
            {t('sprints.averageVelocity')}
          </p>
          <p className="text-2xl font-bold text-green-700">
            {averageVelocity.toFixed(1)} {t('sprints.pointsPerDay')}
          </p>
        </div>
        <div>
          <p className="text-sm text-green-600">
            {t('sprints.estimatedPoints')}
          </p>
          <p className="text-2xl font-bold text-green-700">
            {Math.round(pointsCapacity)} {t('sprints.points')}
          </p>
        </div>
      </div>
    </div>
  );
}