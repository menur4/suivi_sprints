import { Epic, EPIC_COLUMNS } from '../types/epic';

export function parseEpicCSV(content: string): Epic[] {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines
    .slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(v => v.trim());
      const getValue = (columnName: string) => {
        const index = headers.indexOf(columnName);
        return index >= 0 ? values[index] : '';
      };

      return {
        id: crypto.randomUUID(),
        ticketType: getValue(EPIC_COLUMNS.ticketType),
        ticketKey: getValue(EPIC_COLUMNS.ticketKey),
        ticketId: getValue(EPIC_COLUMNS.ticketId),
        summary: getValue(EPIC_COLUMNS.summary),
        assignee: getValue(EPIC_COLUMNS.assignee),
        assigneeId: getValue(EPIC_COLUMNS.assigneeId),
        reporter: getValue(EPIC_COLUMNS.reporter),
        reporterId: getValue(EPIC_COLUMNS.reporterId),
        priority: getValue(EPIC_COLUMNS.priority),
        status: getValue(EPIC_COLUMNS.status),
        resolution: getValue(EPIC_COLUMNS.resolution),
        createdAt: new Date(getValue(EPIC_COLUMNS.createdAt)),
        updatedAt: new Date(getValue(EPIC_COLUMNS.updatedAt)),
        dueDate: getValue(EPIC_COLUMNS.dueDate) ? new Date(getValue(EPIC_COLUMNS.dueDate)) : null,
        badges: [],
        displayColumns: ['ticketKey', 'summary', 'status', 'priority'], // Default columns
      };
    });
}