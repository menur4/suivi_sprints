import { z } from 'zod';

export const sprintSchema = z.object({
  name: z.string().min(1, 'Sprint name is required'),
  quarter: z.string().min(1, 'Quarter is required'),
  startDate: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date must be a valid date',
  }),
  endDate: z.date({
    required_error: 'End date is required',
    invalid_type_error: 'End date must be a valid date',
  }),
  totalDevelopers: z.number().min(1, 'At least one developer is required'),
  absenceDays: z.number().min(0, 'Absence days cannot be negative'),
  meetingsPercentage: z.number().min(0).max(100).default(0),
  bugsPercentage: z.number().min(0).max(100).default(0),
  tnrPercentage: z.number().min(0).max(100).default(0),
  goals: z.string().default(''),
});

export type SprintFormData = z.infer<typeof sprintSchema>;