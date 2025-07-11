import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../../components/ui';
import { cn } from '../../utils/helpers';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('text-center py-12', className)}>
      {Icon && (
        <div className="mx-auto w-12 h-12 text-gray-400 mb-4">
          <Icon className="w-full h-full" />
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          icon={action.icon}
          variant="primary"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
