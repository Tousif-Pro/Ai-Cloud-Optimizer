
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Rocket, 
  Globe, 
  ShoppingBag, 
  Users, 
  Mail, 
  Phone, 
  MessageSquare,
  Calendar,
  Check,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Sample market segments
const marketSegments = [
  { id: 1, name: "Small Business", size: 2500, growth: 12, budgetRange: "$1k-5k" },
  { id: 2, name: "Mid-Market", size: 1200, growth: 8, budgetRange: "$5k-20k" },
  { id: 3, name: "Enterprise", size: 450, growth: 5, budgetRange: "$20k-100k" },
  { id: 4, name: "Healthcare", size: 800, growth: 14, budgetRange: "$10k-50k" },
  { id: 5, name: "Financial Services", size: 600, growth: 7, budgetRange: "$15k-80k" },
  { id: 6, name: "Technology", size: 1100, growth: 18, budgetRange: "$5k-40k" },
];

// Sample campaign channels
const campaignChannels = [
  { id: 1, name: "Email Marketing", effectiveness: 78, costPerLead: 12, conversionRate: 2.4 },
  { id: 2, name: "Social Media", effectiveness: 85, costPerLead: 18, conversionRate: 1.8 },
  { id: 3, name: "Content Marketing", effectiveness: 72, costPerLead: 22, conversionRate: 3.1 },
  { id: 4, name: "PPC Advertising", effectiveness: 80, costPerLead: 35, conversionRate: 2.7 },
  { id: 5, name: "Direct Mail", effectiveness: 62, costPerLead: 45, conversionRate: 1.2 },
  { id: 6, name: "Trade Shows", effectiveness: 58, costPerLead: 120, conversionRate: 4.5 },
];

// Sample campaigns
const sampleCampaigns = [
  { 
    id: 1, 
    name: "Q2 Product Launch", 
    status: "Active", 
    budget: 25000, 
    spent: 12500, 
    leads: 420, 
    conversions: 28,
    roi: 18.5,
    channels: ["Email Marketing", "Social Media", "PPC Advertising"],
    segment: "Mid-Market",
    startDate: "2023-04-01",
    endDate: "2023-06-30"
  },
  { 
    id: 2, 
    name: "Healthcare Solution Webinar", 
    status: "Planning", 
    budget: 8000, 
    spent: 0, 
    leads: 0, 
    conversions: 0,
    roi: 0,
    channels: ["Email Marketing", "Content Marketing"],
    segment: "Healthcare",
    startDate: "2023-07-15",
    endDate: "2023-07-15"
  },
  { 
    id: 3, 
    name: "Enterprise Outreach", 
    status: "Completed", 
    budget: 50000, 
    spent: 48750, 
    leads: 850, 
    conversions: 42,
    roi: 24.2,
    channels: ["Direct Mail", "Trade Shows", "Email Marketing"],
    segment: "Enterprise",
    startDate: "2023-01-15",
    endDate: "2023-03-31"
  }
];

type Campaign = {
  id: number;
  name: string;
  status: string;
  budget: number;
  spent: number;
  leads: number;
  conversions: number;
  roi: number;
  channels: string[];
  segment: string;
  startDate: string;
  endDate: string;
};

const GrowthEngine = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<number | null>(null);
  const [selectedMarketSegments, setSelectedMarketSegments] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    segment: '',
    budget: '',
    startDate: '',
    endDate: '',
    channels: [] as string[],
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCampaign(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewCampaign(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelectChange = (name: string, value: string) => {
    setNewCampaign(prev => {
      const updatedValues = prev[name as keyof typeof prev] as string[];
      
      if (Array.isArray(updatedValues)) {
        if (updatedValues.includes(value)) {
          return {
            ...prev,
            [name]: updatedValues.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            [name]: [...updatedValues, value]
          };
        }
      }
      
      return prev;
    });
  };

  const handleMarketSegmentSelect = (segmentName: string) => {
    if (selectedMarketSegments.includes(segmentName)) {
      setSelectedMarketSegments(selectedMarketSegments.filter(name => name !== segmentName));
    } else {
      setSelectedMarketSegments([...selectedMarketSegments, segmentName]);
    }
  };

  const handleChannelSelect = (channelName: string) => {
    if (selectedChannels.includes(channelName)) {
      setSelectedChannels(selectedChannels.filter(name => name !== channelName));
    } else {
      setSelectedChannels([...selectedChannels, channelName]);
    }
  };

  const createCampaign = () => {
    // Validate inputs
    if (!newCampaign.name || !newCampaign.segment || !newCampaign.budget || !newCampaign.startDate || newCampaign.channels.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Create new campaign
    const campaign: Campaign = {
      id: campaigns.length + 1,
      name: newCampaign.name,
      status: "Planning",
      budget: parseFloat(newCampaign.budget),
      spent: 0,
      leads: 0,
      conversions: 0,
      roi: 0,
      channels: newCampaign.channels,
      segment: newCampaign.segment,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate || newCampaign.startDate
    };

    // Add to campaigns list
    setCampaigns([...campaigns, campaign]);

    // Reset form and close dialog
    setNewCampaign({
      name: '',
      segment: '',
      budget: '',
      startDate: '',
      endDate: '',
      channels: [],
      description: ''
    });
    setShowNewCampaignDialog(false);

    // Show success notification
    toast({
      title: "Campaign Created",
      description: `${campaign.name} has been added to your campaigns`,
    });
  };

  const launchCampaign = (id: number) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id && campaign.status === "Planning") {
        return { ...campaign, status: "Active" };
      }
      return campaign;
    }));

    toast({
      title: "Campaign Launched",
      description: "Campaign is now active and running"
    });
  };

  const confirmDeleteCampaign = (id: number) => {
    setCampaignToDelete(id);
    setShowDeleteDialog(true);
  };

  const deleteCampaign = () => {
    if (campaignToDelete) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignToDelete));
      setCampaignToDelete(null);
      setShowDeleteDialog(false);
      
      toast({
        title: "Campaign Deleted",
        description: "The campaign has been removed"
      });
    }
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Planning": return "bg-blue-500";
      case "Completed": return "bg-gray-500";
      case "Paused": return "bg-yellow-500";
      default: return "bg-gray-300";
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          <span className="bg-gradient-to-r from-evolve-blue-500 via-evolve-purple-500 to-evolve-teal-500 bg-clip-text text-transparent flex items-center">
            <Rocket className="h-8 w-8 mr-2" />
            Growth Engine
          </span>
        </h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowNewCampaignDialog(true)}>
            <Zap className="mr-2 h-4 w-4" />
            Launch New Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="campaigns" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            <span>Campaigns</span>
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Market Segments</span>
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Marketing Channels</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-blue-500" />
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {campaigns.filter(c => c.status === "Active").length}
                </div>
                <p className="text-sm text-muted-foreground">
                  {campaigns.filter(c => c.status === "Planning").length} in planning
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-green-500" />
                  Total Conversions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0)}
                </div>
                <p className="text-sm text-muted-foreground">
                  From {campaigns.reduce((sum, campaign) => sum + campaign.leads, 0)} leads
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Average ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {campaigns.length > 0 
                    ? `${(campaigns.reduce((sum, campaign) => sum + campaign.roi, 0) / campaigns.length).toFixed(1)}%` 
                    : '0%'}
                </div>
                <p className="text-sm text-muted-foreground">
                  Across all campaigns
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Campaign Management</CardTitle>
              <CardDescription>Track, analyze, and optimize your marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium px-4 py-3">Campaign</th>
                      <th className="text-left font-medium px-4 py-3">Status</th>
                      <th className="text-left font-medium px-4 py-3">Segment</th>
                      <th className="text-left font-medium px-4 py-3">Budget</th>
                      <th className="text-left font-medium px-4 py-3">Spent</th>
                      <th className="text-left font-medium px-4 py-3">Leads</th>
                      <th className="text-left font-medium px-4 py-3">ROI</th>
                      <th className="text-left font-medium px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getCampaignStatusColor(campaign.status)}`}></div>
                            {campaign.status}
                          </div>
                        </td>
                        <td className="px-4 py-3">{campaign.segment}</td>
                        <td className="px-4 py-3">${campaign.budget.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col space-y-1">
                            <div className="flex justify-between">
                              <span>${campaign.spent.toLocaleString()}</span>
                              <span className="text-muted-foreground">{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                            </div>
                            <Progress value={(campaign.spent / campaign.budget) * 100} className="h-1" />
                          </div>
                        </td>
                        <td className="px-4 py-3">{campaign.leads}</td>
                        <td className="px-4 py-3">{campaign.roi}%</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {campaign.status === "Planning" && (
                              <Button size="sm" variant="outline" onClick={() => launchCampaign(campaign.id)}>
                                <Rocket className="h-3 w-3 mr-1" /> Launch
                              </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => confirmDeleteCampaign(campaign.id)}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Segment Analysis</CardTitle>
              <CardDescription>Identify and target the most profitable customer segments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketSegments.map((segment) => (
                  <div 
                    key={segment.id} 
                    className={`border rounded-lg p-4 transition-all cursor-pointer ${
                      selectedMarketSegments.includes(segment.name) 
                        ? 'ring-2 ring-primary/70 shadow-md' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleMarketSegmentSelect(segment.name)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-lg">{segment.name}</h3>
                      {selectedMarketSegments.includes(segment.name) && (
                        <div className="h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Market Size</span>
                          <span className="font-medium">{segment.size.toLocaleString()} companies</span>
                        </div>
                        <Progress value={segment.size / 30} className="h-1" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth Rate</span>
                          <span className={`font-medium ${segment.growth > 10 ? 'text-green-600' : ''}`}>
                            {segment.growth}% annually
                          </span>
                        </div>
                        <Progress value={segment.growth * 5} className="h-1" />
                      </div>
                      
                      <div>
                        <div className="text-sm mb-1">Budget Range</div>
                        <div className="font-medium">{segment.budgetRange}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Channel Performance</CardTitle>
              <CardDescription>Evaluate and optimize your marketing channel mix</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaignChannels.map((channel) => (
                  <div 
                    key={channel.id} 
                    className={`border rounded-lg p-4 transition-all cursor-pointer ${
                      selectedChannels.includes(channel.name) 
                        ? 'ring-2 ring-primary/70 shadow-md' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleChannelSelect(channel.name)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-lg">{channel.name}</h3>
                      {selectedChannels.includes(channel.name) && (
                        <div className="h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Effectiveness</span>
                          <span className="font-medium">{channel.effectiveness}%</span>
                        </div>
                        <Progress value={channel.effectiveness} className="h-1" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Cost Per Lead</span>
                          <span className={`font-medium ${channel.costPerLead < 20 ? 'text-green-600' : ''}`}>
                            ${channel.costPerLead}
                          </span>
                        </div>
                        <Progress value={100 - (channel.costPerLead * 2)} max={100} className="h-1" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Conversion Rate</span>
                          <span className={`font-medium ${channel.conversionRate > 2.5 ? 'text-green-600' : ''}`}>
                            {channel.conversionRate}%
                          </span>
                        </div>
                        <Progress value={channel.conversionRate * 20} className="h-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Campaign Dialog */}
      <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Marketing Campaign</DialogTitle>
            <DialogDescription>
              Set up your campaign details and marketing strategy.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter campaign name"
                  value={newCampaign.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="segment">Target Segment</Label>
                  <Select 
                    value={newCampaign.segment} 
                    onValueChange={(value) => handleSelectChange('segment', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select market segment" />
                    </SelectTrigger>
                    <SelectContent>
                      {marketSegments.map(segment => (
                        <SelectItem key={segment.id} value={segment.name}>
                          {segment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="Enter budget amount"
                    value={newCampaign.budget}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={newCampaign.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={newCampaign.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Marketing Channels</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {campaignChannels.map(channel => (
                    <div
                      key={channel.id}
                      className={`px-3 py-2 rounded-md border text-sm cursor-pointer flex items-center ${
                        newCampaign.channels.includes(channel.name)
                          ? 'bg-primary/10 border-primary/30'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => handleMultiSelectChange('channels', channel.name)}
                    >
                      {newCampaign.channels.includes(channel.name) && (
                        <Check className="h-3 w-3 mr-2 text-primary" />
                      )}
                      <span>{channel.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter campaign details..."
                  rows={3}
                  value={newCampaign.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCampaignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createCampaign}>
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this campaign and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteCampaign} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GrowthEngine;
