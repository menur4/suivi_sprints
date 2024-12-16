import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEpicStore } from '../../store/epicStore';
import { Button } from '../ui/Button';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const badgeSchema = z.object({
  name: z.string().min(1, 'Badge name is required'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
});

type BadgeFormData = z.infer<typeof badgeSchema>;

interface BadgeManagerProps {
  onClose: () => void;
}

export function BadgeManager({ onClose }: BadgeManagerProps) {
  const { badges, addBadge, deleteBadge } = useEpicStore();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BadgeFormData>({
    resolver: zodResolver(badgeSchema),
  });

  const onSubmit = (data: BadgeFormData) => {
    addBadge({
      id: crypto.randomUUID(),
      ...data,
    });
    reset();
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {t('epics.manageBadges')}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="name" className="sr-only">
              {t('epics.badgeName')}
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder={t('epics.badgeName')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="mt-3 sm:mt-0 sm:ml-4 sm:w-40">
            <label htmlFor="color" className="sr-only">
              {t('epics.badgeColor')}
            </label>
            <input
              type="color"
              {...register('color')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9"
            />
            {errors.color && (
              <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
            )}
          </div>

          <div className="mt-3 sm:mt-0 sm:ml-4">
            <Button type="submit">
              {t('epics.addBadge')}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900">
            {t('epics.existingBadges')}
          </h4>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {badges.map((badge) => (
              <li
                key={badge.id}
                className="flex items-center justify-between rounded-md border border-gray-200 p-3"
              >
                <div className="flex items-center">
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: badge.color }}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {badge.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => deleteBadge(badge.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            {t('common.close')}
          </Button>
        </div>
      </div>
    </div>
  );
}