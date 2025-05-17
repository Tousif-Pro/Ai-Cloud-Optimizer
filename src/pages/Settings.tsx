
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  AlertTriangle,
  ArrowUpRight, 
  Atom, 
  Award,
  Bell,
  Briefcase,
  ChartBar, 
  Check,
  ChevronDown,
  CloudIcon, 
  CogIcon, 
  Cpu,
  ExternalLink,
  Globe,
  Key,
  LineChart, 
  Lock,
  Mail,
  PercentIcon, 
  PieChart, 
  PlusCircle,
  RefreshCw,
  Save,
  Settings,
  Shield,
  ToggleLeft,
  Users,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { Toggle } from "@/components/ui/toggle";

export default function SettingsPage() {
  const { toast } = useToast();
  const [aiAggressiveness, setAiAggressiveness] = useState(50);
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [notificationsExpanded, setNotificationsExpanded] = useState(false);
  const [isPersonalizationExpanded, setIsPersonalizationExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [goalSettings, setGoalSettings] = useState({
    revenue: 200000,
    customerAcquisition: 50,
    retention: 95,
    marketShare: 15
  });

  const [aiSettings, setAiSettings] = useState({
    autoOptimize: true,
    suggestionFrequency: "daily",
    dataUsage: "full",
    privacyLevel: "balanced"
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings updated",
        description: "Your changes have been saved successfully.",
        variant: "default",
      });
    }, 800);
  };

  const updateGoal = (key: keyof typeof goalSettings, value: number) => {
    setGoalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSuggestionFrequencyChange = (value: string) => {
    setAiSettings(prev => ({
      ...prev,
      suggestionFrequency: value
    }));
  };

  const runGrowthSimulation = () => {
    toast({
      title: "Growth Simulation Complete",
      description: "AI has projected a 27% growth potential based on your current settings and market conditions.",
    });
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    toast({
      title: "Theme Changed",
      description: `Your theme has been updated to ${theme} mode.`,
    });
  };

  const updateAISetting = (key: keyof typeof aiSettings, value: any) => {
    setAiSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const regenerateApiKey = () => {
    toast({
      title: "API Key Regenerated",
      description: "Your new API key has been generated. The old key will expire in 24 hours.",
    });
  };

  const generateSecurityReport = () => {
    toast({
      title: "Security Report Generated",
      description: "A comprehensive security analysis has been emailed to your registered address.",
    });
  };

  return (
    <div className="space-y-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, platform preferences, and business growth targets
        </p>
      </motion.div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="w-full md:w-auto flex flex-wrap bg-background border overflow-hidden rounded-lg p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative flex items-center gap-2 px-4">
            <Settings className="size-4" />
            <span>General</span>
            {selectedTheme !== "system" && <div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-green-500"></div>}
          </TabsTrigger>
          
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative flex items-center gap-2 px-4">
            <Bell className="size-4" />
            <span>Notifications</span>
          </TabsTrigger>
          
          <TabsTrigger value="api" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative flex items-center gap-2 px-4">
            <Key className="size-4" />
            <span>API & Integrations</span>
          </TabsTrigger>
          
          <TabsTrigger value="growth" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative flex items-center gap-2 px-4">
            <LineChart className="size-4" />
            <span>Growth Engine</span>
            <Badge variant="outline" className="bg-background text-xs ml-1">AI</Badge>
          </TabsTrigger>

          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative flex items-center gap-2 px-4">
            <Shield className="size-4" />
            <span>Security</span>
            <Badge className="bg-amber-500 text-xs ml-1">New</Badge>
          </TabsTrigger>

          <TabsTrigger value="personalization" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative flex items-center gap-2 px-4">
            <Cpu className="size-4" />
            <span>AI Personalization</span>
            <Badge className="bg-green-500 text-xs ml-1">Beta</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Update your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Alice Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="alice@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme AI Solutions" />
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Theme Preferences</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div 
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedTheme === 'light' ? 'ring-2 ring-primary' : 'hover:bg-accent'}`}
                      onClick={() => handleThemeChange('light')}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Light</span>
                        {selectedTheme === 'light' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="bg-[#f8fafc] border h-10 rounded-md"></div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedTheme === 'dark' ? 'ring-2 ring-primary' : 'hover:bg-accent'}`}
                      onClick={() => handleThemeChange('dark')}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Dark</span>
                        {selectedTheme === 'dark' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="bg-[#0f172a] border h-10 rounded-md"></div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedTheme === 'system' ? 'ring-2 ring-primary' : 'hover:bg-accent'}`}
                      onClick={() => handleThemeChange('system')}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">System</span>
                        {selectedTheme === 'system' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="bg-gradient-to-r from-[#f8fafc] to-[#0f172a] border h-10 rounded-md"></div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select id="language" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>English (US)</option>
                        <option>Español (Spanish)</option>
                        <option>Français (French)</option>
                        <option>Deutsch (German)</option>
                        <option>日本語 (Japanese)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <select id="timezone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>Pacific Time (GMT-7)</option>
                        <option>Eastern Time (GMT-4)</option>
                        <option>Central European Time (GMT+1)</option>
                        <option>Japan Time (GMT+9)</option>
                        <option>Australia Eastern Time (GMT+10)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">System Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Compact View</Label>
                        <p className="text-sm text-muted-foreground">
                          Optimize screen space by using a more compact layout
                        </p>
                      </div>
                      <Switch id="compact" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Keep your dashboard up to date with the latest data
                        </p>
                      </div>
                      <Switch id="updates" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving} className="relative">
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    {isSaving && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    )}
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Manage your notification settings and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="trend-alerts">Trend Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about significant market trends
                    </p>
                  </div>
                  <Switch id="trend-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="competitor-updates">Competitor Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get alerts when competitor activities are detected
                    </p>
                  </div>
                  <Switch id="competitor-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="resource-alerts">Resource Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about resource utilization thresholds
                    </p>
                  </div>
                  <Switch id="resource-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reports">Weekly Email Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive summary reports via email every week
                    </p>
                  </div>
                  <Switch id="email-reports" />
                </div>
                
                <Collapsible 
                  open={notificationsExpanded} 
                  onOpenChange={setNotificationsExpanded}
                  className="pt-4 border-t"
                >
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <h3 className="text-lg font-medium">Advanced Notification Settings</h3>
                      <p className="text-sm text-muted-foreground">Configure detailed notification preferences</p>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className={`h-4 w-4 transition-transform ${notificationsExpanded ? "rotate-180" : ""}`} />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent className="pt-2 space-y-4">
                    <div className="space-y-3">
                      <Label>Notification Delivery Channels</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="py-1 px-2 flex items-center gap-1 bg-muted/50">
                          <Mail className="h-3 w-3" /> Email <Check className="h-3 w-3 ml-1 text-green-500" />
                        </Badge>
                        <Badge variant="outline" className="py-1 px-2 flex items-center gap-1 bg-muted/50">
                          <Bell className="h-3 w-3" /> In-App <Check className="h-3 w-3 ml-1 text-green-500" />
                        </Badge>
                        <Badge variant="outline" className="py-1 px-2 flex items-center gap-1 bg-muted/50">
                          <Shield className="h-3 w-3" /> SMS <PlusCircle className="h-3 w-3 ml-1" />
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Notification Frequency</Label>
                      <div className="flex items-center space-x-2">
                        <Toggle variant="outline" aria-label="Real-time">Real-time</Toggle>
                        <Toggle variant="outline" aria-label="Daily digest" pressed>Daily digest</Toggle>
                        <Toggle variant="outline" aria-label="Weekly summary">Weekly summary</Toggle>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Quiet Hours</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Start</span>
                          <Input type="time" defaultValue="22:00" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">End</span>
                          <Input type="time" defaultValue="07:00" />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="api">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Keys & Integrations
                </CardTitle>
                <CardDescription>
                  Manage API access and third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 p-4 rounded-md bg-background border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">API Authentication</h3>
                      <p className="text-sm text-muted-foreground">Manage access to the API</p>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex">
                      <Input id="api-key" defaultValue="sk_test_51HM•••••••••••••••••" className="rounded-r-none font-mono text-sm" readOnly />
                      <Button variant="outline" className="rounded-l-none" onClick={regenerateApiKey}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-amber-500">
                      <AlertTriangle className="h-4 w-4 mr-1" /> This API key provides full access to your account. Keep it secure.
                    </div>
                  </div>

                  <div className="pt-4 border-t mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">API Usage</h3>
                      <Badge variant="outline">250K / 500K Requests</Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span>50% of monthly quota used</span>
                        <span>250,000 / 500,000</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "50%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Plan resets on June 1, 2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-3">Active Integrations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-accent/20 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="font-semibold text-blue-800">SF</span>
                        </div>
                        <div>
                          <p className="font-medium">Salesforce</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs px-1 py-0 h-4 mr-2">CRM</Badge>
                            Connected on 15 May, 2023
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Settings className="h-3 w-3" />
                        Configure
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-accent/20 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="font-semibold text-green-800">TB</span>
                        </div>
                        <div>
                          <p className="font-medium">Tableau</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs px-1 py-0 h-4 mr-2">BI</Badge>
                            Connected on 3 June, 2023
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Settings className="h-3 w-3" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-3">Available Integrations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center justify-start h-auto py-3 px-4">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-xs font-semibold text-blue-800">GA</span>
                      </div>
                      <div className="text-left">
                        <p>Google Analytics</p>
                        <p className="text-xs text-muted-foreground">Web analytics integration</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 ml-auto" />
                    </Button>
                    
                    <Button variant="outline" className="flex items-center justify-start h-auto py-3 px-4">
                      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <span className="text-xs font-semibold text-orange-800">HS</span>
                      </div>
                      <div className="text-left">
                        <p>HubSpot</p>
                        <p className="text-xs text-muted-foreground">Marketing automation</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 ml-auto" />
                    </Button>
                    
                    <Button variant="outline" className="flex items-center justify-start h-auto py-3 px-4">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <span className="text-xs font-semibold text-purple-800">SL</span>
                      </div>
                      <div className="text-left">
                        <p>Slack</p>
                        <p className="text-xs text-muted-foreground">Team communication</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 ml-auto" />
                    </Button>
                    
                    <Button variant="outline" className="flex items-center justify-start h-auto py-3 px-4">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <span className="text-xs font-semibold text-gray-800">GH</span>
                      </div>
                      <div className="text-left">
                        <p>GitHub</p>
                        <p className="text-xs text-muted-foreground">Code repository integration</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 ml-auto" />
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <Button variant="link" className="text-primary flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      View all available integrations (24)
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Integration Settings
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <Badge className="bg-amber-500">Enhanced Security Available</Badge>
                </div>
                <CardDescription>
                  Manage security settings and access controls for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-md bg-background border">
                  <h3 className="text-lg font-medium mb-4">Account Security</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                    
                    <div className="pt-3 border-t">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-background border">
                  <h3 className="text-lg font-medium mb-4">Data Protection</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Encryption</Label>
                        <p className="text-sm text-muted-foreground">
                          Encrypt sensitive data with enterprise-grade protection
                        </p>
                      </div>
                      <Switch id="encryption" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>GDPR Compliance</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable enhanced data protection measures for EU regulations
                        </p>
                      </div>
                      <Switch id="gdpr" defaultChecked />
                    </div>

                    <div className="pt-3 border-t">
                      <Button variant="outline" onClick={generateSecurityReport} className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Generate Security Report
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-background border">
                  <h3 className="text-lg font-medium mb-4">Access Control</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after a period of inactivity
                        </p>
                      </div>
                      <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>8 hours</option>
                        <option>24 hours</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>IP Restrictions</Label>
                        <p className="text-sm text-muted-foreground">
                          Limit access to specific IP addresses or ranges
                        </p>
                      </div>
                      <Switch id="ip-restrict" />
                    </div>

                    <div className="pt-3 border-t">
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Team Access
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="personalization">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Atom className="h-5 w-5" />
                    AI Personalization
                  </CardTitle>
                  <Badge className="bg-green-500">Beta</Badge>
                </div>
                <CardDescription>
                  Configure how AI adapts to your needs and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Collapsible 
                  open={isPersonalizationExpanded} 
                  onOpenChange={setIsPersonalizationExpanded}
                  className="p-4 rounded-md bg-background/50 border space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">AI Assistant Personality</h3>
                      <p className="text-sm text-muted-foreground">Choose how you want the AI to interact with you</p>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className={`h-4 w-4 transition-transform ${isPersonalizationExpanded ? "rotate-180" : ""}`} />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted transition-colors relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="text-xs">Current</Badge>
                        </div>
                        <div className="pt-4">
                          <h4 className="font-medium">Analytical</h4>
                          <p className="text-sm text-muted-foreground mt-1">Focused on data and metrics with detailed analysis</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted transition-colors">
                        <div className="pt-1">
                          <h4 className="font-medium">Strategic</h4>
                          <p className="text-sm text-muted-foreground mt-1">Long-term planning with emphasis on competitive advantage</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted transition-colors">
                        <div className="pt-1">
                          <h4 className="font-medium">Concise</h4>
                          <p className="text-sm text-muted-foreground mt-1">Brief summaries and quick recommendations</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Communication Style</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Toggle variant="outline" aria-label="Formal" pressed>Formal</Toggle>
                        <Toggle variant="outline" aria-label="Casual">Casual</Toggle>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                <div className="p-4 rounded-md bg-background/50 border">
                  <h3 className="text-lg font-medium mb-4">AI Data Usage</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-Optimize Recommendations</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow AI to automatically optimize recommendations based on your interactions
                        </p>
                      </div>
                      <Switch 
                        id="auto-optimize" 
                        checked={aiSettings.autoOptimize}
                        onCheckedChange={(checked) => updateAISetting('autoOptimize', checked)}
                      />
                    </div>
                    
                    <div className="space-y-3 border-t pt-4">
                      <Label>AI Suggestion Frequency</Label>
                      <div className="flex flex-wrap gap-2">
                        <Toggle 
                          variant="outline" 
                          pressed={aiSettings.suggestionFrequency === "real-time"}
                          onClick={() => handleSuggestionFrequencyChange("real-time")}
                        >
                          Real-time
                        </Toggle>
                        <Toggle 
                          variant="outline" 
                          pressed={aiSettings.suggestionFrequency === "daily"}
                          onClick={() => handleSuggestionFrequencyChange("daily")}
                        >
                          Daily
                        </Toggle>
                        <Toggle 
                          variant="outline" 
                          pressed={aiSettings.suggestionFrequency === "weekly"}
                          onClick={() => handleSuggestionFrequencyChange("weekly")}
                        >
                          Weekly
                        </Toggle>
                      </div>
                    </div>
                    
                    <div className="space-y-3 border-t pt-4">
                      <Label>Data Permission Level</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <div 
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${aiSettings.dataUsage === 'minimal' ? 'ring-2 ring-primary/50' : 'hover:bg-muted'}`}
                          onClick={() => updateAISetting('dataUsage', 'minimal')}
                        >
                          <h4 className="font-medium">Minimal</h4>
                          <p className="text-xs text-muted-foreground mt-1">Basic insights only</p>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${aiSettings.dataUsage === 'balanced' ? 'ring-2 ring-primary/50' : 'hover:bg-muted'}`}
                          onClick={() => updateAISetting('dataUsage', 'balanced')}
                        >
                          <h4 className="font-medium">Balanced</h4>
                          <p className="text-xs text-muted-foreground mt-1">Moderate data access</p>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${aiSettings.dataUsage === 'full' ? 'ring-2 ring-primary/50' : 'hover:bg-muted'}`}
                          onClick={() => updateAISetting('dataUsage', 'full')}
                        >
                          <h4 className="font-medium">Full</h4>
                          <p className="text-xs text-muted-foreground mt-1">Complete data access</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-md bg-background/50 border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Learning & Improvement</h3>
                    <Badge variant="outline" className="bg-muted">AI Learning Active</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI Adaptation Speed</Label>
                        <p className="text-sm text-muted-foreground">
                          How quickly the AI adapts to your preferences
                        </p>
                      </div>
                      <div className="w-1/3">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          defaultValue={[7]}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Feedback Collection</Label>
                        <p className="text-sm text-muted-foreground">
                          Collect your feedback to improve AI responses
                        </p>
                      </div>
                      <Switch id="feedback" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Reset AI Learning</Label>
                        <p className="text-sm text-muted-foreground">
                          Clear all learned preferences and start fresh
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save AI Settings
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="growth">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  AI Growth Engine
                </CardTitle>
                <CardDescription>
                  Configure your business growth parameters and AI-driven optimization strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-md bg-background/50 border">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ai-aggressiveness">AI Strategy Aggressiveness</Label>
                      <Badge variant="outline" className="text-sm bg-background">{aiAggressiveness}%</Badge>
                    </div>
                    <Slider 
                      id="ai-aggressiveness"
                      min={10} 
                      max={100} 
                      step={5}
                      value={[aiAggressiveness]}
                      onValueChange={(value) => setAiAggressiveness(value[0])}
                      className="py-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      Higher values prioritize aggressive growth strategies, while lower values favor stability and risk minimization.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <Badge variant="outline" className="justify-center">Conservative</Badge>
                      <Badge variant="outline" className="justify-center">Balanced</Badge>
                      <Badge variant="outline" className="justify-center">Aggressive</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="shadow-none border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <ChartBar className="h-4 w-4" />
                        Revenue Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="revenue-goal">Quarterly Revenue Target ($)</Label>
                        <Input 
                          id="revenue-goal" 
                          type="number" 
                          value={goalSettings.revenue}
                          onChange={(e) => updateGoal('revenue', Number(e.target.value))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-none border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Customer Acquisition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="customer-goal">New Customers (Per Quarter)</Label>
                        <Input 
                          id="customer-goal" 
                          type="number" 
                          value={goalSettings.customerAcquisition}
                          onChange={(e) => updateGoal('customerAcquisition', Number(e.target.value))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-none border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <PercentIcon className="h-4 w-4" />
                        Retention Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="retention-goal">Customer Retention Target (%)</Label>
                        <Input 
                          id="retention-goal" 
                          type="number" 
                          value={goalSettings.retention}
                          onChange={(e) => updateGoal('retention', Number(e.target.value))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-none border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <PieChart className="h-4 w-4" />
                        Market Share
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="market-goal">Target Market Share (%)</Label>
                        <Input 
                          id="market-goal" 
                          type="number" 
                          value={goalSettings.marketShare}
                          onChange={(e) => updateGoal('marketShare', Number(e.target.value))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-2 border-accent/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        AI Growth Simulation
                      </CardTitle>
                      <Badge className="bg-blue-500">Pro Feature</Badge>
                    </div>
                    <CardDescription>
                      Use AI to simulate growth trajectories based on your settings and market conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="simulation-period">Simulation Period (Months)</Label>
                        <Input id="simulation-period" type="number" defaultValue={12} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="market-conditions">Market Conditions</Label>
                        <select id="market-conditions" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                          <option>Favorable</option>
                          <option>Neutral</option>
                          <option>Challenging</option>
                          <option>Volatile</option>
                        </select>
                      </div>
                    </div>
                    <Button onClick={runGrowthSimulation} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Run AI Growth Simulation
                    </Button>
                  </CardContent>
                </Card>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium">AI Growth Strategy Recommendations</h3>
                    <Badge variant="outline">Last updated: Today</Badge>
                  </div>
                  <div className="space-y-3">
                    <motion.div 
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    >
                      <div className="mt-0.5">
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Customer Acquisition Focus</h4>
                        <p className="text-sm text-muted-foreground">
                          Allocate 40% more resources to LinkedIn outreach campaigns targeting CTOs and Heads of AI in healthcare and finance sectors.
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-blue-500">
                          <Award className="h-3 w-3" /> 
                          <span>High impact recommendation</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    >
                      <div className="mt-0.5">
                        <CloudIcon className="h-5 w-5 text-teal-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Product Enhancement Priority</h4>
                        <p className="text-sm text-muted-foreground">
                          Develop real-time monitoring dashboard for edge AI deployments to address the rising demand from manufacturing clients.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    >
                      <div className="mt-0.5">
                        <CogIcon className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Operational Efficiency</h4>
                        <p className="text-sm text-muted-foreground">
                          Implement automated client onboarding workflow to reduce time-to-value by an estimated 37%, improving customer satisfaction metrics.
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-purple-500">
                          <Globe className="h-3 w-3" /> 
                          <span>Based on industry benchmarks</span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="link" className="text-primary">
                        View all 12 recommendations
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Growth Settings
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
