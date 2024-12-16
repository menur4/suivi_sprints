import { Epic } from '../types';

export function parseCSV(content: string): Epic[] {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = line.split(',').map((v) => v.trim());
      const epic: Epic = {
        id: crypto.randomUUID(),
        name: values[headers.indexOf('name')] || '',
        description: values[headers.indexOf('description')] || '',
        status: (values[headers.indexOf('status')] as Epic['status']) || 'todo',
        badges: [],
        createdAt: new Date(),
      };
      return epic;
    });
}