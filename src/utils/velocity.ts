import { Sprint } from '../types';

export function calculateAverageVelocity(sprints: Sprint[], count: number = 3): number {
  // Sort sprints by end date in descending order
  const sortedSprints = [...sprints].sort(
    (a, b) => b.endDate.getTime() - a.endDate.getTime()
  );

  // Take the last 'count' completed sprints
  const recentSprints = sortedSprints
    .filter(sprint => sprint.deliveredPoints > 0)
    .slice(0, count);

  if (recentSprints.length === 0) return 0;

  // Calculate average velocity (points per day)
  const totalVelocity = recentSprints.reduce(
    (sum, sprint) => sum + (sprint.deliveredPoints / sprint.actualCapacity),
    0
  );

  return totalVelocity / recentSprints.length;
}

export function calculatePointsCapacity(plannedCapacity: number, averageVelocity: number): number {
  return plannedCapacity * averageVelocity;
}