import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Epic, Sprint } from '../../types';
import { useTranslation } from 'react-i18next';
import { useEpicStore } from '../../store/epicStore';

ChartJS.register(ArcElement, Tooltip, Legend);

interface YearlyChartProps {
  epics: Epic[];
  sprints: Sprint[];
}

export function YearlyChart({ epics, sprints }: YearlyChartProps) {
  const { t } = useTranslation();
  const { badges } = useEpicStore();

  const epicPoints = epics.map(epic => {
    const totalPoints = sprints.reduce((sum, sprint) => {
      const epicPoint = sprint.epicPoints.find(ep => ep.epicId === epic.id);
      return sum + (epicPoint?.points || 0);
    }, 0);

    return {
      epicId: epic.id,
      points: totalPoints,
      badges: epic.badges,
    };
  });

  const badgePoints = badges.map(badge => {
    const points = epicPoints
      .filter(ep => ep.badges.includes(badge.id))
      .reduce((sum, ep) => sum + ep.points, 0);

    return {
      badge,
      points,
    };
  }).filter(bp => bp.points > 0);

  const data = {
    labels: badgePoints.map(bp => bp.badge.name),
    datasets: [
      {
        data: badgePoints.map(bp => bp.points),
        backgroundColor: badgePoints.map(bp => bp.badge.color),
        borderColor: badgePoints.map(bp => bp.badge.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const total = badgePoints.reduce((sum, bp) => sum + bp.points, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} points (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="h-[400px] flex items-center justify-center">
      <Pie data={data} options={options} />
    </div>
  );
}