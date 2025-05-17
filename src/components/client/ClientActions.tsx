
import React from "react";
import { ClientActionButton } from "./ClientActionButton";
import { ClientActionModal } from "./ClientActionModal";
import { useIsMobile } from "@/hooks/use-mobile";

export const ClientHeaderActions: React.FC = () => {
  return (
    <>
      <ClientActionModal />
      <div className="flex items-center space-x-2">
        <ClientActionButton type="filter" variant="outline" />
        <ClientActionButton type="export" variant="outline" />
        <ClientActionButton type="add" variant="default" />
      </div>
    </>
  );
};

export const ClientRowActions: React.FC<{clientId: number | string}> = ({ clientId }) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <ClientActionModal />
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
        <ClientActionButton 
          type="call" 
          clientId={clientId} 
          variant="outline" 
          size={isMobile ? "default" : "sm"} 
        />
        <ClientActionButton 
          type="schedule" 
          clientId={clientId} 
          variant="outline" 
          size={isMobile ? "default" : "sm"} 
        />
        {!isMobile && (
          <ClientActionButton 
            type="view" 
            clientId={clientId} 
            variant="ghost" 
            size="sm" 
          />
        )}
      </div>
    </>
  );
};

export const ClientCardActions: React.FC<{clientId: number | string}> = ({ clientId }) => {
  return (
    <>
      <ClientActionModal />
      <div className="flex flex-wrap items-center gap-2">
        <ClientActionButton 
          type="contact" 
          clientId={clientId} 
        />
        <ClientActionButton 
          type="schedule" 
          clientId={clientId} 
          variant="outline" 
          size="sm" 
        />
      </div>
    </>
  );
};

export const ClientDetailPanel: React.FC<{
  revenue: string;
  lastContact: string;
  clientId: number | string;
}> = ({ revenue, lastContact, clientId }) => {
  return (
    <>
      <ClientActionModal />
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Revenue:</span>
              <span className="font-medium ml-2">{revenue}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Last Contact:</span>
              <span className="font-medium ml-2">{lastContact}</span>
            </div>
          </div>
          
          <ClientActionButton 
            type="contact" 
            clientId={clientId} 
          />
        </div>
      </div>
    </>
  );
};
