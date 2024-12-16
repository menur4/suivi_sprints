import React from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Sprint } from '../../types';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface VelocityChartProps {
  sprints: Sprint[];
}

export function VelocityChart({ sprints }: VelocityChartProps) {
  const { t } = useTranslation();

  // Sort sprints by start date
  const sortedSprints = [...sprints].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  // Calculate velocity for each sprint
  const velocities = sortedSprints.map(sprint => ({
    name: sprint.name,
    date: sprint.startDate,
    velocity: sprint.deliveredPoints / sprint.actualCapacity,
    deliveredPoints: sprint.deliveredPoints,
    capacity: sprint.actualCapacity,
  }));

  const data = {
    labels: velocities.map(v => v.name),
    datasets: [
      {
        label: t('analytics.velocity'),
        data: velocities.map(v => v.velocity.toFixed(2)),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
      {
        label: t('analytics.deliveredPoints'),
        data: velocities.map(v => v.deliveredPoints),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.3,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const velocity = velocities[context.dataIndex];
            if (context.dataset.label === t('analytics.velocity')) {
              return `${t('analytics.velocity')}: ${velocity.velocity.toFixed(2)} ${t('sprints.pointsPerDay')}`;
            } else {
              return `${t('analytics.deliveredPoints')}: ${velocity.deliveredPoints} ${t('sprints.points')}`;
            }
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: t('analytics.velocityAxis'),
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: t('analytics.pointsAxis'),
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}