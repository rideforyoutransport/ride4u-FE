import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button, Select, Input } from '../../components/ui';
import { Card, CardContent } from '../../components/ui';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterField {
  key: string;
  label: string;
  type: 'select' | 'text' | 'date';
  options?: FilterOption[];
  placeholder?: string;
}

interface FilterPanelProps {
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  fields,
  values,
  onChange,
  onClear,
  isOpen,
  onToggle,
}) => {
  const hasActiveFilters = Object.values(values).some(value => value !== '');

  const renderField = (field: FilterField) => {
    const value = values[field.key] || '';

    switch (field.type) {
      case 'select':
        return (
          <Select
            key={field.key}
            label={field.label}
            value={value}
            onChange={(e) => onChange(field.key, e.target.value)}
            options={[
              { value: '', label: `All ${field.label}` },
              ...(field.options || []),
            ]}
          />
        );
      case 'date':
        return (
          <Input
            key={field.key}
            type="date"
            label={field.label}
            value={value}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
        );
      case 'text':
      default:
        return (
          <Input
            key={field.key}
            label={field.label}
            value={value}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          icon={Filter}
          onClick={onToggle}
          className={hasActiveFilters ? 'text-primary-600 border-primary-300' : ''}
        >
          Filters {hasActiveFilters && `(${Object.values(values).filter(v => v).length})`}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear all
          </Button>
        )}
      </div>

      {isOpen && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fields.map(renderField)}
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={onToggle}>
                Close
              </Button>
              <Button variant="outline" onClick={onClear}>
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
