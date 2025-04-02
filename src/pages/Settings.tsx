
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and platform preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
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
      </Tabs>
    </div>
  );
}
