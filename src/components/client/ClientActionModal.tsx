
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useClientAction } from './ClientActionContext';
import { Calendar, Phone, CalendarPlus, FileText, Plus, Filter, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Modal content based on action type
const ModalContent: React.FC<{ actionType: string; clientId?: number | string }> = ({ actionType, clientId }) => {
  switch (actionType) {
    case 'call':
      return (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Schedule Call
            </DialogTitle>
            <DialogDescription>
              Schedule a call with {clientId ? `client #${clientId}` : 'this client'}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input type="date" className="w-full rounded-md border border-input bg-background px-3 py-2" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <input type="time" className="w-full rounded-md border border-input bg-background px-3 py-2" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea 
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 resize-none" 
                placeholder="Enter call details..."
              />
            </div>
          </div>
        </>
      );
      
    case 'schedule':
      return (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5 text-primary" />
              Schedule Meeting
            </DialogTitle>
            <DialogDescription>
              Schedule a meeting with {clientId ? `client #${clientId}` : 'this client'}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input type="date" className="w-full rounded-md border border-input bg-background px-3 py-2" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <input type="time" className="w-full rounded-md border border-input bg-background px-3 py-2" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Type</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                <option value="in-person">In Person</option>
                <option value="virtual">Virtual Meeting</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Agenda</label>
              <textarea 
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 resize-none" 
                placeholder="Enter meeting agenda..."
              />
            </div>
          </div>
        </>
      );
      
    case 'view':
      return (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Client Details
            </DialogTitle>
            <DialogDescription>
              Viewing details for {clientId ? `client #${clientId}` : 'this client'}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-muted p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Revenue:</span>
                <span className="font-medium">$3.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Last Contact:</span>
                <span className="font-medium">2023-07-15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Status:</span>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </>
      );
      
    case 'contact':
      return (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Contact Client
            </DialogTitle>
            <DialogDescription>
              Choose a method to contact {clientId ? `client #${clientId}` : 'this client'}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 py-4">
            <Button variant="outline" className="justify-start">
              <Phone className="mr-2 h-4 w-4" /> Call (555) 123-4567
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Email contact@company.com
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Send Text Message
            </Button>
          </div>
        </>
      );
    
    case 'export':
      return (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Export Client Data
            </DialogTitle>
            <DialogDescription>
              Choose a format to export client data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 py-4">
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              Export as PDF
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              Export as CSV
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              Export as Excel
            </Button>
          </div>
        </>
      );
      
    case 'filter':
      return (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filter Clients
            </DialogTitle>
            <DialogDescription>
              Filter the client list by various properties.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Client Status</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="churned">Churned</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                <option value="">All Industries</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Revenue</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
                <span>to</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Contact</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="date" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
                <span>to</span>
                <input 
                  type="date" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
          </div>
        </>
      );
      
    case 'add':
      return (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New Client
            </DialogTitle>
            <DialogDescription>
              Enter details to add a new client to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <input 
                  type="text" 
                  placeholder="Enter company name" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option value="">Select Industry</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Email</label>
                <input 
                  type="email" 
                  placeholder="email@company.com" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="(555) 123-4567" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Annual Revenue</label>
              <input 
                type="text" 
                placeholder="$1,000,000" 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <textarea 
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 resize-none" 
                placeholder="Additional notes about this client..."
              />
            </div>
          </div>
        </>
      );
      
    default:
      return (
        <DialogHeader>
          <DialogTitle>Action Required</DialogTitle>
          <DialogDescription>
            Please select an action to perform.
          </DialogDescription>
        </DialogHeader>
      );
  }
};

export const ClientActionModal: React.FC = () => {
  const { isModalOpen, actionType, clientId, closeModal } = useClientAction();
  
  const handleAction = () => {
    toast({
      title: "Action successful",
      description: `${actionType?.charAt(0).toUpperCase() + actionType?.slice(1)} action completed successfully.`,
    });
    closeModal();
  };
  
  if (!actionType) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-md md:max-w-xl">
        <ModalContent actionType={actionType} clientId={clientId} />
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleAction}>
            {actionType === 'view' ? 'Close' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
