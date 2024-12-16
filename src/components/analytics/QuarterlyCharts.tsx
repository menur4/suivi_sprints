import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Epic, Sprint } from '../../types';
import { useTranslation } from 'react-i18next';
import { useEpicStore } from '../../store/epicStore';

ChartJS.register(ArcElement, Tooltip, Legend);

interface QuarterlyChartsProps {
  epics: Epic[];
  sprints: Sprint[];
}

export function QuarterlyCharts({ epics, sprints }: QuarterlyChartsProps) {
  const { t } = useTranslation();
  const { badges } = useEpicStore();

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  const getQuarterFromSprint = (sprint: Sprint) => {
    return sprint.name.split(' - ')[1];
  };

  const quarterlyData = quarters.map(quarter => {
    const quarterSprints = sprints.filter(sprint => 
      getQuarterFromSprint(sprint) === quarter
    );

    const badgePoints = badges.map(badge => {
      const points = epics
        .filter(epic => epic.badges.includes(badge.id))
        .reduce((sum, epic) => {
          return sum + quarterSprints.reduce((sprintSum, sprint) => {
            const epicPoint = sprint.epicPoints.find(ep => ep.epicId === epic.id);
            return sprintSum + (epicPoint?.points || 0);
          }, 0);
        }, 0);

      return {
        badge,
        points,
      };
    }).filter(bp => bp.points > 0);

    return {
      quarter,
      badgePoints,
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {quarterlyData.map(({ quarter, badgePoints }) => (
        <div key={quarter} className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
            {quarter}
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <Pie
              data={{
                labels: badgePoints.map(bp => bp.badge.name),
                datasets: [
                  {
                    data: badgePoints.map(bp => bp.points),
                    backgroundColor: badgePoints.map(bp => bp.badge.color),
                    borderColor: badgePoints.map(bp => bp.badge.color),
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
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
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}