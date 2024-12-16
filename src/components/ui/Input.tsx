import React, { forwardRef } from 'react';
import { formatNumber, parseNumber, isValidNumber } from '../../utils/number';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  suffix?: string;
  onChange?: (value: any) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, suffix, className = '', type, onChange, value, ...props }, ref) => {
    const inputClasses = `
      block rounded-md border-gray-300 shadow-sm 
      focus:border-indigo-500 focus:ring-indigo-500 
      text-base h-8 text-center
      ${error ? 'border-red-300' : ''}
      ${className}
    `.trim();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      const inputValue = e.target.value;

      if (type === 'number') {
        // Only proceed if the input is valid or empty
        if (isValidNumber(inputValue) || inputValue === '') {
          const numValue = parseNumber(inputValue);
          onChange(numValue);
        }
      } else {
        onChange(inputValue);
      }
    };

    const displayValue = React.useMemo(() => {
      if (type === 'number' && value !== undefined && value !== '') {
        return formatNumber(Number(value));
      }
      return value || '';
    }, [type, value]);

    return (
      <div className="flex flex-col">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="flex items-center">
          <input
            ref={ref}
            className={inputClasses}
            {...props}
            type={type === 'number' ? 'text' : type}
            inputMode={type === 'number' ? 'decimal' : undefined}
            value={displayValue}
            onChange={handleChange}
          />
          {suffix && (
            <span className="ml-2 text-sm font-medium text-gray-500">{suffix}</span>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';