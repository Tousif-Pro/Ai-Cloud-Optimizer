
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClientActionButton } from './ClientActionButton';
import { ClientActionModal } from './ClientActionModal';
import { motion } from 'framer-motion';

interface ClientDetailCardProps {
  id: number;
  name: string;
  industry: string;
  revenue: string;
  lastContact: string;
  status: 'active' | 'inactive' | 'pending' | 'churned';
}

export const ClientDetailCard: React.FC<ClientDetailCardProps> = ({
  id,
  name,
  industry,
  revenue,
  lastContact,
  status
}) => {
  // Get status badge color
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900';
      case 'inactive':
        return 'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      case 'pending':
        return 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900';
      case 'churned':
        return 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900';
      default:
        return '';
    }
  };

  return (
    <>
      <ClientActionModal />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-medium text-lg">{name}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">{industry}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{revenue}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor()}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Last contact: {lastContact}
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <ClientActionButton type="call" clientId={id} />
              <ClientActionButton type="schedule" clientId={id} />
              <ClientActionButton type="view" clientId={id} variant="ghost" size="sm" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};
