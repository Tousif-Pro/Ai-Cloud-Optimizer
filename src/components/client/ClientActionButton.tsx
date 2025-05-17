
import React from 'react';
import { Button } from '@/components/ui/button';
import { useClientAction } from './ClientActionContext';
import { Phone, CalendarCheck, FileText, Plus, Filter, Download, Contact } from 'lucide-react';

type ClientActionType = 'call' | 'schedule' | 'view' | 'contact' | 'export' | 'filter' | 'add';

interface ClientActionButtonProps {
  type: ClientActionType;
  clientId?: number | string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const ClientActionButton: React.FC<ClientActionButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  type,
  clientId,
  className,
  variant = 'outline',
  size = 'default',
  ...props
}) => {
  const { openModal } = useClientAction();

  // Get the appropriate icon and text based on the action type
  const getButtonContent = () => {
    switch (type) {
      case 'call':
        return {
          icon: <Phone className="h-4 w-4" />,
          text: 'Call'
        };
      case 'schedule':
        return {
          icon: <CalendarCheck className="h-4 w-4" />,
          text: 'Schedule'
        };
      case 'view':
        return {
          icon: <FileText className="h-4 w-4" />,
          text: 'View'
        };
      case 'contact':
        return {
          icon: <Phone className="h-4 w-4" />,
          text: 'Contact'
        };
      case 'export':
        return {
          icon: <Download className="h-4 w-4" />,
          text: 'Export'
        };
      case 'filter':
        return {
          icon: <Filter className="h-4 w-4" />,
          text: 'Filter'
        };
      case 'add':
        return {
          icon: <Plus className="h-4 w-4" />,
          text: 'Add Client'
        };
      default:
        return {
          icon: null,
          text: 'Action'
        };
    }
  };

  const { icon, text } = getButtonContent();
  
  // Apply green background and white text for contact buttons
  const getButtonStyle = () => {
    if (type === 'contact') {
      return "bg-green-600 hover:bg-green-700 text-white";
    }
    return "";
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal(type, clientId);
    
    // Call the original onClick if it exists
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Button
      variant={type === 'contact' ? 'default' : variant}
      size={size}
      className={`${className} ${getButtonStyle()}`}
      onClick={handleClick}
      {...props}
    >
      {icon}
      {text}
    </Button>
  );
};
