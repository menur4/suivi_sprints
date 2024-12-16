import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { EpicPointsForm } from './EpicPointsForm';
import { TimeAllocationForm } from './TimeAllocationForm';
import { useTranslation } from 'react-i18next';

interface EpicPoint {
  epicId: string;
  points: number;
}

interface SprintReviewFormData {
  epicPoints: EpicPoint[];
  meetingsPercentage: number;
  bugsPercentage: number;
  tnrPercentage: number;
}

interface SprintReviewFormProps {
  initialData: SprintReviewFormData;
  onSubmit: (data: SprintReviewFormData) => void;
  onCancel: () => void;
}

export function SprintReviewForm({
  initialData,
  onSubmit,
  onCancel,
}: SprintReviewFormProps) {
  const [formData, setFormData] = React.useState(initialData);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Epics Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <EpicPointsForm
          value={formData.epicPoints}
          onChange={(epicPoints) => setFormData({ ...formData, epicPoints })}
        />
      </div>

      {/* Time Allocation Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <TimeAllocationForm
          meetingsPercentage={formData.meetingsPercentage}
          bugsPercentage={formData.bugsPercentage}
          tnrPercentage={formData.tnrPercentage}
          onChange={({ meetingsPercentage, bugsPercentage, tnrPercentage }) =>
            setFormData({
              ...formData,
              meetingsPercentage,
              bugsPercentage,
              tnrPercentage,
            })
          }
        />
      </div>

      {/* Action Buttons */}
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