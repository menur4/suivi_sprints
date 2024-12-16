import React from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle } from 'lucide-react';

export function RoadmapLegend() {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <div className="flex items-center">
          <HelpCircle className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            {t('roadmap.legend')}
          </h3>
        </div>
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="h-2 w-16 bg-indigo-600 rounded-full mr-3" />
            <span className="text-sm text-gray-600">
              {t('roadmap.epicDuration')}
            </span>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center text-sm font-medium text-indigo-700 mr-3">
              8
            </div>
            <span className="text-sm text-gray-600">
              {t('roadmap.monthlyPoints')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}