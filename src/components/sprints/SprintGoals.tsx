import React from 'react';
import { useTranslation } from 'react-i18next';
import { Target } from 'lucide-react';

interface SprintGoalsProps {
  value: string;
  onChange: (value: string) => void;
}

export function SprintGoals({ value, onChange }: SprintGoalsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Target className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('sprints.goals')}
        </h3>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder={t('sprints.goalsPlaceholder')}
      />
    </div>
  );
}