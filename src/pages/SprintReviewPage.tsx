import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSprintStore } from '../store/sprintStore';
import { Alert } from '../components/ui/Alert';
import { calculateSprintCapacity } from '../utils/capacity';
import { calculateWorkingDays } from '../utils/date';
import { SprintMetrics } from '../components/sprints/SprintMetrics';
import { SprintReviewForm } from '../components/sprints/SprintReviewForm';
import { SprintEditForm } from '../components/sprints/SprintEditForm';
import { Button } from '../components/ui/Button';
import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SprintReviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sprints, updateSprint } = useSprintStore();
  const [error, setError] = React.useState<string | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const { t } = useTranslation();

  const sprint = sprints.find((s) => s.id === id);

  if (!sprint) {
    return (
      <Alert
        variant="error"
        message={t('sprints.notFound')}
      />
    );
  }

  const workingDays = calculateWorkingDays(sprint.startDate, sprint.endDate);
  
  const handleReviewSubmit = (formData: {
    epicPoints: Array<{ epicId: string; points: number }>;
    meetingsPercentage: number;
    bugsPercentage: number;
    tnrPercentage: number;
  }) => {
    try {
      const actualCapacity = calculateSprintCapacity({
        totalDevelopers: sprint.totalDevelopers,
        workingDays,
        meetingsPercentage: formData.meetingsPercentage,
        bugsPercentage: formData.bugsPercentage,
        tnrPercentage: formData.tnrPercentage,
        absenceDays: sprint.absenceDays,
      });

      const deliveredPoints = formData.epicPoints.reduce((sum, { points }) => sum + points, 0);

      updateSprint(sprint.id, {
        ...sprint,
        meetingsPercentage: formData.meetingsPercentage,
        bugsPercentage: formData.bugsPercentage,
        tnrPercentage: formData.tnrPercentage,
        actualCapacity,
        deliveredPoints,
        epicPoints: formData.epicPoints,
      });
      navigate('/sprints');
    } catch (err) {
      setError(t('sprints.updateError'));
    }
  };

  const handleEditSubmit = (data: {
    startDate: Date;
    endDate: Date;
    totalDevelopers: number;
    absenceDays: number;
    quarter: string;
  }) => {
    try {
      const newWorkingDays = calculateWorkingDays(data.startDate, data.endDate);
      const plannedCapacity = calculateSprintCapacity({
        totalDevelopers: data.totalDevelopers,
        workingDays: newWorkingDays,
        meetingsPercentage: sprint.meetingsPercentage,
        bugsPercentage: sprint.bugsPercentage,
        tnrPercentage: sprint.tnrPercentage,
        absenceDays: data.absenceDays,
      });

      const name = sprint.name.split(' - ')[0] + ' - ' + data.quarter;

      updateSprint(sprint.id, {
        ...sprint,
        ...data,
        name,
        plannedCapacity,
      });
      setIsEditing(false);
    } catch (err) {
      setError(t('sprints.updateError'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('sprints.review')}: {sprint.name}
            </h2>
            {!isEditing && (
              <Button
                variant="secondary"
                icon={Edit}
                onClick={() => setIsEditing(true)}
              >
                {t('common.edit')}
              </Button>
            )}
          </div>

          {error && (
            <div className="mb-6">
              <Alert variant="error" message={error} />
            </div>
          )}

          {isEditing ? (
            <div className="mb-8">
              <SprintEditForm
                startDate={sprint.startDate}
                endDate={sprint.endDate}
                totalDevelopers={sprint.totalDevelopers}
                absenceDays={sprint.absenceDays}
                onSubmit={handleEditSubmit}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <>
              <SprintReviewForm
                initialData={{
                  epicPoints: sprint.epicPoints || [],
                  meetingsPercentage: sprint.meetingsPercentage,
                  bugsPercentage: sprint.bugsPercentage,
                  tnrPercentage: sprint.tnrPercentage,
                }}
                onSubmit={handleReviewSubmit}
                onCancel={() => navigate('/sprints')}
              />

              <div className="mt-6">
                <SprintMetrics
                  actualCapacity={sprint.actualCapacity}
                  capacityUtilization={(sprint.actualCapacity / sprint.plannedCapacity) * 100}
                  velocityPerDay={sprint.deliveredPoints / sprint.actualCapacity}
                  workingDays={workingDays}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}