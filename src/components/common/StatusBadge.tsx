import React from 'react';
import { Badge } from '../../components/ui';

type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'success' | 'error' | 'warning';

interface StatusBadgeProps {
  status: StatusType;
  text?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  className,
}) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'active':
      case 'success':
      case 'completed':
        return {
          variant: 'error' as const,
          text: text || status.charAt(0).toUpperCase() + status.slice(1),
        };
      case 'pending':
      case 'warning':
        return {
          variant: 'warning' as const,
          text: text || status.charAt(0).toUpperCase() + status.slice(1),
        };
      default:
        return {
          variant: 'default' as const,
          text: text || status.charAt(0).toUpperCase() + status.slice(1),
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={className}>
      {config.text}
    </Badge>
  );
};
