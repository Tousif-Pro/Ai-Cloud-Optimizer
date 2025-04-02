
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Phone, 
  Clock, 
  Bookmark, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

type ClientStatus = "growing" | "stable" | "at risk";

interface ClientProps {
  client: {
    id: number;
    name: string;
    logo: string;
    industry: string;
    revenue: string;
    status: ClientStatus;
    lastInteraction: string;
    satisfaction: number;
    upcoming: {
      title: string;
      date: string;
    };
    notes: string;
  };
}

export function ClientSpotlight({ client }: ClientProps) {
  const [showNotes, setShowNotes] = useState(false);
  
  const getStatusIcon = (status: ClientStatus) => {
    switch (status) {
      case "growing":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "stable":
        return <Minus className="h-4 w-4 text-blue-500" />;
      case "at risk":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: ClientStatus) => {
    switch (status) {
      case "growing":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "stable":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "at risk":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    }
  };
  
  const getSatisfactionColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-blue-500";
    return "text-red-500";
  };

  const handleQuickCall = () => {
    toast.success(`Initiating call with ${client.name}`);
  };

  const handleScheduleMeeting = () => {
    toast.success(`Opening scheduler for ${client.name}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full border-t-2 border-t-blue-400 hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="text-3xl mr-2">{client.logo}</div>
              <div>
                <h3 className="font-semibold text-lg">{client.name}</h3>
                <p className="text-xs text-muted-foreground">{client.industry}</p>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusColor(client.status)}`}>
              {getStatusIcon(client.status)}
              <span className="ml-1 capitalize">{client.status}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-gray-500" />
              <span className="text-xs">{client.lastInteraction}</span>
            </div>
            <div className="flex items-center">
              <Bookmark className="h-3 w-3 mr-1 text-gray-500" />
              <span className="text-xs">{client.revenue}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs">Client Satisfaction</div>
            <div className={`font-semibold ${getSatisfactionColor(client.satisfaction)}`}>
              {client.satisfaction}%
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/30 p-2 rounded-md mb-3">
            <div className="flex items-center text-xs mb-1">
              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
              <span className="font-medium">Upcoming: {client.upcoming.title}</span>
            </div>
            <div className="text-xs text-muted-foreground">{client.upcoming.date}</div>
          </div>
          
          {showNotes && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded mb-3"
            >
              <div className="flex items-start text-xs">
                <FileText className="h-3 w-3 mr-1 text-amber-500 mt-0.5" />
                <span>{client.notes}</span>
              </div>
            </motion.div>
          )}
          
          <div className="flex justify-between mt-2 space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleQuickCall}
            >
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleScheduleMeeting}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Schedule
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotes(!showNotes)}
            >
              <FileText className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
