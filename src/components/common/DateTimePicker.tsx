import React from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { Input } from '../../components/ui';

interface DateTimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  showTime?: boolean;
  className?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  label,
  error,
  disabled = false,
  showTime = true,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue) {
      // Convert to ISO string
      const date = new Date(inputValue);
      onChange?.(date.toISOString());
    } else {
      onChange?.('');
    }
  };

  const formatValueForInput = (isoString: string) => {
    try {
      const date = parseISO(isoString);
      if (showTime) {
        return format(date, "yyyy-MM-dd'T'HH:mm");
      } else {
        return format(date, 'yyyy-MM-dd');
      }
    } catch {
      return '';
    }
  };

  const inputType = showTime ? 'datetime-local' : 'date';
  const inputValue = value ? formatValueForInput(value) : '';

  return (
    <div className="relative">
      <Input
        type={inputType}
        value={inputValue}
        onChange={handleChange}
        label={label}
        error={error}
        disabled={disabled}
        className={className}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        {showTime ? (
          <Clock className="w-4 h-4 text-gray-400" />
        ) : (
          <Calendar className="w-4 h-4 text-gray-400" />
        )}
      </div>
    </div>
  );
};
