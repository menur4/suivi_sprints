interface CapacityParams {
  totalDevelopers: number;
  workingDays: number;
  meetingsPercentage: number;
  bugsPercentage: number;
  tnrPercentage: number;
  absenceDays: number;
}

export function calculateSprintCapacity({
  totalDevelopers,
  workingDays,
  meetingsPercentage,
  bugsPercentage,
  tnrPercentage,
  absenceDays,
}: CapacityParams): number {
  const totalDays = workingDays * totalDevelopers - absenceDays;
  const availablePercentage =
    100 - (meetingsPercentage + bugsPercentage + tnrPercentage);
  return (totalDays * availablePercentage) / 100;
}