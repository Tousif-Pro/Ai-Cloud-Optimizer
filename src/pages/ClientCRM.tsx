
import { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  FileSpreadsheet, 
  Star, 
  StarOff,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  Trash2,
  UserPlus
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample clients data for CRM
const clientsData = [
  {
    id: 1,
    name: "TechNova Solutions",
    logo: "🏢",
    industry: "Enterprise Software",
    contact: {
      name: "Sarah Johnson",
      email: "sarah@technova.com",
      phone: "+1 (555) 123-4567",
      position: "CTO"
    },
    revenue: "$3.2M",
    status: "active",
    lastContactDate: "2023-07-15",
    tags: ["Enterprise", "AI Integration", "Key Account"],
    nextAction: {
      type: "Meeting",
      date: "2023-07-28",
      description: "Quarterly Strategy Review"
    },
    notes: "Looking to expand AI integration across their product line. High potential for upselling.",
    isFavorite: true
  },
  {
    id: 2,
    name: "MediCore Innovations",
    logo: "🏥",
    industry: "Healthcare",
    contact: {
      name: "Michael Chen",
      email: "michael@medicore.com",
      phone: "+1 (555) 234-5678",
      position: "CIO"
    },
    revenue: "$1.8M",
    status: "active",
    lastContactDate: "2023-07-10",
    tags: ["Healthcare", "Security", "Mid-Market"],
    nextAction: {
      type: "Demo",
      date: "2023-08-05",
      description: "Product Demo - New Module"
    },
    notes: "Regulatory compliance is a top concern. Need to emphasize our security features.",
    isFavorite: false
  },
  {
    id: 3,
    name: "GreenPath Logistics",
    logo: "🚚",
    industry: "Transportation",
    contact: {
      name: "Jennifer Martinez",
      email: "jennifer@greenpath.com",
      phone: "+1 (555) 345-6789",
      position: "CEO"
    },
    revenue: "$2.4M",
    status: "at-risk",
    lastContactDate: "2023-06-28",
    tags: ["Transportation", "Cost-sensitive", "Renewal"],
    nextAction: {
      type: "Call",
      date: "2023-07-31",
      description: "Renewal Discussion"
    },
    notes: "Experiencing budget constraints. Prepare retention plan with scaled pricing options.",
    isFavorite: false
  },
  {
    id: 4,
    name: "Global Financial Partners",
    logo: "🏦",
    industry: "Financial Services",
    contact: {
      name: "Robert Williams",
      email: "robert@gfpartners.com",
      phone: "+1 (555) 456-7890",
      position: "Head of Technology"
    },
    revenue: "$5.7M",
    status: "active",
    lastContactDate: "2023-07-18",
    tags: ["Financial", "Enterprise", "Data Security"],
    nextAction: {
      type: "Proposal",
      date: "2023-08-10",
      description: "Contract Expansion Proposal"
    },
    notes: "Looking to consolidate vendors. Opportunity to expand services across more departments.",
    isFavorite: true
  },
  {
    id: 5,
    name: "Quantum Retail Group",
    logo: "🛍️",
    industry: "Retail",
    contact: {
      name: "Lisa Thompson",
      email: "lisa@quantumretail.com",
      phone: "+1 (555) 567-8901",
      position: "COO"
    },
    revenue: "$1.3M",
    status: "inactive",
    lastContactDate: "2023-06-05",
    tags: ["Retail", "SMB", "Reactivation"],
    nextAction: {
      type: "Email",
      date: "2023-07-25",
      description: "Re-engagement Campaign"
    },
    notes: "Account has been dormant for 45 days. Send case studies on retail analytics success.",
    isFavorite: false
  }
];

export default function ClientCRM() {
  const [clients, setClients] = useState(clientsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    industry: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactPosition: "",
    revenue: "",
    notes: ""
  });

  const filteredClients = clients.filter(client => {
    // Apply search term filter
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "favorites") return matchesSearch && client.isFavorite;
    if (activeFilter === "active") return matchesSearch && client.status === "active";
    if (activeFilter === "at-risk") return matchesSearch && client.status === "at-risk";
    if (activeFilter === "inactive") return matchesSearch && client.status === "inactive";
    
    return matchesSearch;
  });

  const handleAddClient = () => {
    const newClientData = {
      id: clients.length + 1,
      name: newClient.name,
      logo: "🏢",
      industry: newClient.industry,
      contact: {
        name: newClient.contactName,
        email: newClient.contactEmail,
        phone: newClient.contactPhone,
        position: newClient.contactPosition
      },
      revenue: newClient.revenue,
      status: "active",
      lastContactDate: new Date().toISOString().split('T')[0],
      tags: [newClient.industry],
      nextAction: {
        type: "Setup",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: "Initial Onboarding"
      },
      notes: newClient.notes,
      isFavorite: false
    };
    
    setClients([...clients, newClientData]);
    setOpen(false);
    toast.success(`Added ${newClient.name} to your client list!`);
    
    // Reset form
    setNewClient({
      name: "",
      industry: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactPosition: "",
      revenue: "",
      notes: ""
    });
  };

  const toggleFavorite = (id: number) => {
    setClients(clients.map(client => 
      client.id === id ? { ...client, isFavorite: !client.isFavorite } : client
    ));
  };

  const deleteClient = (id: number) => {
    const clientToDelete = clients.find(client => client.id === id);
    if (clientToDelete) {
      setClients(clients.filter(client => client.id !== id));
      toast.success(`Removed ${clientToDelete.name} from your client list`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "at-risk":
        return <Badge className="bg-red-500">At Risk</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "Meeting": 
        return <Calendar className="h-4 w-4 mr-1" />;
      case "Call": 
        return <Phone className="h-4 w-4 mr-1" />;
      case "Email": 
        return <Mail className="h-4 w-4 mr-1" />;
      case "Demo":
        return <UserPlus className="h-4 w-4 mr-1" />;
      default:
        return <Calendar className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Client Relationship Management
        </h1>
        <p className="text-muted-foreground">
          Manage your client relationships, interactions, and opportunities in one place
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                All Clients
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("favorites")}>
                Favorites
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("at-risk")}>
                At Risk
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("inactive")}>
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter client details to add them to your CRM system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Tabs defaultValue="basic">
                <TabsList className="mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="contact">Contact Details</TabsTrigger>
                  <TabsTrigger value="additional">Additional Info</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Company Name*</Label>
                      <Input
                        id="name"
                        placeholder="Enter company name"
                        value={newClient.name}
                        onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry*</Label>
                      <Input
                        id="industry"
                        placeholder="E.g. Healthcare, Finance, Technology"
                        value={newClient.industry}
                        onChange={(e) => setNewClient({...newClient, industry: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Annual Revenue</Label>
                    <Input
                      id="revenue"
                      placeholder="E.g. $1.5M"
                      value={newClient.revenue}
                      onChange={(e) => setNewClient({...newClient, revenue: e.target.value})}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="contact" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name*</Label>
                      <Input
                        id="contactName"
                        placeholder="Primary contact name"
                        value={newClient.contactName}
                        onChange={(e) => setNewClient({...newClient, contactName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        placeholder="E.g. CEO, CTO, Director"
                        value={newClient.contactPosition}
                        onChange={(e) => setNewClient({...newClient, contactPosition: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address*</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@company.com"
                        value={newClient.contactEmail}
                        onChange={(e) => setNewClient({...newClient, contactEmail: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={newClient.contactPhone}
                        onChange={(e) => setNewClient({...newClient, contactPhone: e.target.value})}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="additional" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                      id="notes"
                      className="w-full min-h-[100px] rounded-md border border-input p-2"
                      placeholder="Additional information about this client..."
                      value={newClient.notes}
                      onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAddClient}
                disabled={!newClient.name || !newClient.industry || !newClient.contactName || !newClient.contactEmail}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {filteredClients.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No clients found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filters, or add a new client.
              </p>
            </div>
          </Card>
        ) : (
          filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-center p-4 border-b md:border-b-0 md:border-r md:w-1/4">
                    <div className="text-3xl mr-4">{client.logo}</div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">{client.name}</h3>
                        <button 
                          className="ml-2 text-gray-400 hover:text-yellow-400 transition-colors"
                          onClick={() => toggleFavorite(client.id)}
                        >
                          {client.isFavorite ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{client.industry}</p>
                      <div className="mt-1">{getStatusBadge(client.status)}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 md:w-1/4 border-b md:border-b-0 md:border-r">
                    <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2">Contact Details</h4>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{client.contact.name}</p>
                      <p className="text-xs text-muted-foreground">{client.contact.position}</p>
                      <div className="flex items-center text-xs">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="truncate">{client.contact.email}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{client.contact.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 md:w-1/4 border-b md:border-b-0 md:border-r">
                    <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2">Next Action</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm font-medium">
                        {getActionIcon(client.nextAction.type)}
                        <span>{client.nextAction.description}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{client.nextAction.date}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {client.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 md:w-1/4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2">Details</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Revenue:</span>
                          <span className="text-xs font-medium">{client.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Last Contact:</span>
                          <span className="text-xs">{client.lastContactDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <Button size="sm" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.success(`Viewing ${client.name} details`)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Editing ${client.name}`)}>
                            Edit Client
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Creating activity for ${client.name}`)}>
                            Log Activity
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => deleteClient(client.id)} className="text-red-500">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
