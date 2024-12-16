import React from 'react';
import { Plus, FileEdit } from 'lucide-react';
import { useSprintStore } from '../store/sprintStore';
import { SprintForm } from '../components/sprints/SprintForm';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

export function SprintsPage() {
  const { sprints, addSprint } = useSprintStore();
  const [isCreating, setIsCreating] = React.useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Sort sprints by start date in descending order (newest first)
  const sortedSprints = [...sprints].sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );

  const calculateVelocity = (deliveredPoints: number, actualCapacity: number) => {
    if (!deliveredPoints || !actualCapacity) return null;
    return deliveredPoints / actualCapacity;
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">{t('sprints.title')}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('sprints.description')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            onClick={() => setIsCreating(true)}
            icon={Plus}
          >
            {t('sprints.newSprint')}
          </Button>
        </div>
      </div>

      {isCreating && (
        <div className="mt-6">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t('sprints.newSprint')}
              </h3>
              <div className="mt-5">
                <SprintForm
                  onSubmit={(sprint) => {
                    addSprint(sprint);
                    setIsCreating(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('sprints.sprintName')}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('sprints.startDate')}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('sprints.endDate')}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('sprints.teamSize')}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('sprints.plannedCapacity')}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('sprints.actualCapacity')}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('sprints.metrics.velocityPerDay')}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('common.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sortedSprints.map((sprint) => {
                    const velocity = calculateVelocity(sprint.deliveredPoints, sprint.actualCapacity);
                    
                    return (
                      <tr key={sprint.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {sprint.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {format(sprint.startDate, 'dd MMM yyyy')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {format(sprint.endDate, 'dd MMM yyyy')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {sprint.totalDevelopers} {t('sprints.developers')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {Math.round(sprint.plannedCapacity)} {t('sprints.days')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {Math.round(sprint.actualCapacity)} {t('sprints.days')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {velocity !== null ? `${velocity.toFixed(2)} points/${t('sprints.days')}` : '-'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Button
                            variant="secondary"
                            icon={FileEdit}
                            onClick={() => navigate(`/sprints/${sprint.id}/review`)}
                          >
                            {t('common.review')}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}