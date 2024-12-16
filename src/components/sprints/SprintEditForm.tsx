import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/date';
import { Button } from '../ui/Button';
import { Save } from 'lucide-react';
import { Select } from '../ui/Select';
import { DateRangePicker } from '../ui/DateRangePicker';
import { Input } from '../ui/Input';

interface SprintEditFormProps {
  startDate: Date;
  endDate: Date;
  totalDevelopers: number;
  absenceDays: number;
  onSubmit: (data: { 
    startDate: Date; 
    endDate: Date; 
    totalDevelopers: number;
    absenceDays: number;
    quarter: string;
  }) => void;
  onCancel: () => void;
}

export function SprintEditForm({
  startDate,
  endDate,
  totalDevelopers,
  absenceDays = 0,
  onSubmit,
  onCancel,
}: SprintEditFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    totalDevelopers: totalDevelopers || 1,
    absenceDays: absenceDays || 0,
    quarter: '',
  });

  const quarterOptions = [
    { value: '', label: t('sprints.selectQuarter') },
    { value: 'Q1', label: t('sprints.q1') },
    { value: 'Q2', label: t('sprints.q2') },
    { value: 'Q3', label: t('sprints.q3') },
    { value: 'Q4', label: t('sprints.q4') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      totalDevelopers: Number(formData.totalDevelopers),
      absenceDays: Number(formData.absenceDays),
      quarter: formData.quarter,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select
          label={t('sprints.quarter')}
          options={quarterOptions}
          value={formData.quarter}
          onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
        />
      </div>

      <DateRangePicker
        startDate={new Date(formData.startDate)}
        endDate={new Date(formData.endDate)}
        onStartDateChange={(date) =>
          setFormData({ ...formData, startDate: formatDate(date) })
        }
        onEndDateChange={(date) =>
          setFormData({ ...formData, endDate: formatDate(date) })
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          min="1"
          label={t('sprints.teamSize')}
          value={formData.totalDevelopers}
          onChange={(value) =>
            setFormData({
              ...formData,
              totalDevelopers: Math.max(1, value || 1),
            })
          }
          suffix={t('sprints.developers')}
        />

        <Input
          type="number"
          min="0"
          label={t('sprints.absenceDays')}
          value={formData.absenceDays}
          onChange={(value) =>
            setFormData({
              ...formData,
              absenceDays: Math.max(0, value || 0),
            })
          }
          suffix={t('sprints.days')}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel} type="button">
          {t('common.cancel')}
        </Button>
        <Button type="submit" icon={Save}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}