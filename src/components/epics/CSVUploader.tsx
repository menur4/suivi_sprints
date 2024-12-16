import React from 'react';
import { Upload } from 'lucide-react';
import { useEpicStore } from '../../store/epicStore';
import { parseEpicCSV } from '../../utils/csv-parser';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

export function CSVUploader() {
  const { addEpics } = useEpicStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const epics = parseEpicCSV(content);
      addEpics(epics);
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        icon={Upload}
      >
        {t('epics.uploadCSV')}
      </Button>
    </>
  );
}