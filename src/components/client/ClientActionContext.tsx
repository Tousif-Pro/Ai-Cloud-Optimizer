
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type ClientActionType = 'call' | 'schedule' | 'view' | 'contact' | 'export' | 'filter' | 'add';

interface ClientActionContextProps {
  isModalOpen: boolean;
  actionType: ClientActionType | null;
  clientId?: number | string;
  openModal: (type: ClientActionType, id?: number | string) => void;
  closeModal: () => void;
}

const ClientActionContext = createContext<ClientActionContextProps | undefined>(undefined);

export const ClientActionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<ClientActionType | null>(null);
  const [clientId, setClientId] = useState<number | string | undefined>(undefined);
  const navigate = useNavigate();

  const openModal = (type: ClientActionType, id?: number | string) => {
    // Special handling for contact action to navigate to contact page
    if (type === 'contact') {
      navigate('/contact');
      return;
    }
    
    setActionType(type);
    setClientId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActionType(null);
    setClientId(undefined);
  };

  return (
    <ClientActionContext.Provider value={{ isModalOpen, actionType, clientId, openModal, closeModal }}>
      {children}
    </ClientActionContext.Provider>
  );
};

export const useClientAction = () => {
  const context = useContext(ClientActionContext);
  if (context === undefined) {
    throw new Error('useClientAction must be used within a ClientActionProvider');
  }
  return context;
};
