import React from 'react';
import { BarChart2 } from 'lucide-react';

interface SprintMetricsProps {
  actualCapacity: number;
  capacityUtilization: number;
  velocityPerDay: number;
  workingDays: number;
}

export function SprintMetrics({
  actualCapacity,
  capacityUtilization,
  velocityPerDay,
  workingDays,
}: SprintMetricsProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <BarChart2 className="h-5 w-5 mr-2" />
        Sprint Metrics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <MetricItem
          label="Actual Capacity"
          value={`${actualCapacity.toFixed(1)} man-days`}
        />
        <MetricItem
          label="Capacity Utilization"
          value={`${capacityUtilization.toFixed(1)}%`}
        />
        <MetricItem
          label="Velocity per Day"
          value={`${velocityPerDay.toFixed(1)} points/day`}
        />
        <MetricItem
          label="Total Working Days"
          value={`${workingDays} days`}
        />
      </div>
    </div>
  );
}

interface MetricItemProps {
  label: string;
  value: string;
}

function MetricItem({ label, value }: MetricItemProps) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}