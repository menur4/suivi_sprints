import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

type AlertVariant = 'success' | 'error' | 'info';

interface AlertProps {
  variant: AlertVariant;
  message: string;
}

const variantStyles = {
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  info: 'bg-blue-50 text-blue-800',
};

const variantIcons = {
  success: CheckCircle,
  error: XCircle,
  info: AlertCircle,
};

export function Alert({ variant, message }: AlertProps) {
  const Icon = variantIcons[variant];
  
  return (
    <div className={`rounded-md p-4 ${variantStyles[variant]}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}