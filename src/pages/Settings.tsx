
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { 
  ChartBarIcon, 
  CloudIcon, 
  CogIcon, 
  LineChart, 
  PercentIcon, 
  PieChart, 
  Users 
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [aiAggressiveness, setAiAggressiveness] = useState(50);
  const [goalSettings, setGoalSettings] = useState({
    revenue: 200000,
    customerAcquisition: 50,
    retention: 95,
    marketShare: 15
  });

  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const updateGoal = (key: keyof typeof goalSettings, value: number) => {
    setGoalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const runGrowthSimulation = () => {
    toast({
      title: "Growth Simulation Complete",
      description: "AI has projected a 27% growth potential based on your current settings and market conditions.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, platform preferences, and business growth targets
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
          <TabsTrigger value="growth">Growth Engine</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
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
              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" defaultChecked />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
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
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys & Integrations</CardTitle>
              <CardDescription>
                Manage API access and third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex">
                  <Input id="api-key" defaultValue="sk_test_51HM•••••••••••••••••" className="rounded-r-none" readOnly />
                  <Button variant="outline" className="rounded-l-none">Regenerate</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This API key provides full access to your account. Keep it secure.
                </p>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-3">Active Integrations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">CRM</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Salesforce</p>
                        <p className="text-xs text-muted-foreground">Connected on 15 May, 2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-green-800">BI</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Tableau</p>
                        <p className="text-xs text-muted-foreground">Connected on 3 June, 2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-3">Available Integrations</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2">+</span> Connect Google Analytics
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2">+</span> Connect HubSpot
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2">+</span> Connect Slack
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2">+</span> Connect GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Integration Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                AI Growth Engine
              </CardTitle>
              <CardDescription>
                Configure your business growth parameters and AI-driven optimization strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-aggressiveness">AI Strategy Aggressiveness</Label>
                  <span className="text-sm font-medium">{aiAggressiveness}%</span>
                </div>
                <Slider 
                  id="ai-aggressiveness"
                  min={10} 
                  max={100} 
                  step={5}
                  value={[aiAggressiveness]}
                  onValueChange={(value) => setAiAggressiveness(value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  Higher values prioritize aggressive growth strategies, while lower values favor stability and risk minimization.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <ChartBarIcon className="h-4 w-4" />
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

                <Card>
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

                <Card>
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

                <Card>
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
                  <CardTitle className="text-base">AI Growth Simulation</CardTitle>
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
                  <Button onClick={runGrowthSimulation} className="w-full mt-4">
                    Run AI Growth Simulation
                  </Button>
                </CardContent>
              </Card>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-3">AI Growth Strategy Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="mt-0.5">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Customer Acquisition Focus</h4>
                      <p className="text-sm text-muted-foreground">
                        Allocate 40% more resources to LinkedIn outreach campaigns targeting CTOs and Heads of AI in healthcare and finance sectors.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="mt-0.5">
                      <CloudIcon className="h-5 w-5 text-teal-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Product Enhancement Priority</h4>
                      <p className="text-sm text-muted-foreground">
                        Develop real-time monitoring dashboard for edge AI deployments to address the rising demand from manufacturing clients.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="mt-0.5">
                      <CogIcon className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Operational Efficiency</h4>
                      <p className="text-sm text-muted-foreground">
                        Implement automated client onboarding workflow to reduce time-to-value by an estimated 37%, improving customer satisfaction metrics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Growth Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
