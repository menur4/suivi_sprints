import React from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Absence } from '../../types';

interface AbsenceListProps {
  absences: Absence[];
  onRemove: (id: string) => void;
}

export function AbsenceList({ absences, onRemove }: AbsenceListProps) {
  const { t } = useTranslation();

  if (absences.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        {t('sprints.noAbsences')}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {absences.map((absence) => (
        <li key={absence.id} className="py-3 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {absence.developerId}
            </p>
            <p className="text-sm text-gray-500">
              {format(absence.date, 'PP')} - {absence.reason}
            </p>
          </div>
          <button
            onClick={() => onRemove(absence.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}