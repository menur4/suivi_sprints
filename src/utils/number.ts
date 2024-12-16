export function formatNumber(value: number): string {
  return value.toString().replace('.', ',');
}

export function parseNumber(value: string): number {
  // Handle empty or invalid input
  if (!value || value === '') return 0;
  
  // Replace comma with dot for parsing
  const normalizedValue = value.replace(',', '.');
  
  // Parse the number
  const parsed = parseFloat(normalizedValue);
  
  // Return 0 if parsing failed
  return isNaN(parsed) ? 0 : parsed;
}

export function isValidNumber(value: string): boolean {
  // Allow empty string
  if (!value) return true;
  
  // Allow numbers with either comma or dot as decimal separator
  // and optional minus sign for negative numbers
  const regex = /^-?\d*[,.]?\d*$/;
  return regex.test(value);
}