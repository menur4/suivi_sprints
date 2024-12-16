import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/date';
import { Absence } from '../../types';

interface AbsenceFormProps {
  startDate: Date;
  endDate: Date;
  onAdd: (absence: Omit<Absence, 'id'>) => void;
}

export function AbsenceForm({ startDate, endDate, onAdd }: AbsenceFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    developerId: '',
    date: formatDate(startDate),
    reason: '',
  });

  const handleSubmit = () => {
    if (!formData.developerId || !formData.date || !formData.reason) return;
    
    onAdd({
      developerId: formData.developerId,
      date: new Date(formData.date),
      reason: formData.reason,
    });
    setFormData({ ...formData, reason: '' });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('sprints.developerName')}
        </label>
        <input
          type="text"
          value={formData.developerId}
          onChange={(e) => setFormData({ ...formData, developerId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('sprints.absenceDate')}
        </label>
        <input
          type="date"
          min={formatDate(startDate)}
          max={formatDate(endDate)}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('sprints.absenceReason')}
        </label>
        <input
          type="text"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <Button 
        type="button"
        onClick={handleSubmit}
      >
        {t('sprints.addAbsence')}
      </Button>
    </div>
  );
}