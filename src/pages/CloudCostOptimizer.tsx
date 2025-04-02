
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Check, Cloud, DollarSign, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CloudCostOptimizer() {
  const { toast } = useToast();
  const [instanceCount, setInstanceCount] = useState(5);
  const [instanceType, setInstanceType] = useState("medium");
  const [storageSize, setStorageSize] = useState(100);
  const [utilizationRate, setUtilizationRate] = useState(70);
  const [months, setMonths] = useState(12);
  const [optimizedCost, setOptimizedCost] = useState<number | null>(null);

  // Pricing constants
  const instancePricing = {
    small: 25,
    medium: 50,
    large: 100,
    xlarge: 200
  };
  const storagePrice = 0.1; // per GB
  
  // Calculate cost
  const calculateCost = () => {
    const baseInstanceCost = instanceCount * instancePricing[instanceType as keyof typeof instancePricing] * months;
    const storageCost = storageSize * storagePrice * months;
    const totalCost = baseInstanceCost + storageCost;
    
    // Calculate optimized cost (simulate 30% saving from optimization)
    const potentialSavings = totalCost * (1 - utilizationRate / 100) * 0.8;
    const optimized = totalCost - potentialSavings;
    
    setOptimizedCost(optimized);
    
    toast({
      title: "Cost Analysis Complete",
      description: `Your estimated optimized cost is $${optimized.toFixed(2)}, saving approximately $${potentialSavings.toFixed(2)}`,
    });
  };

  const optimizationStrategies = [
    {
      title: "Right-sizing Resources",
      description: "Analyze usage patterns and automatically recommend downsizing over-provisioned instances.",
      savings: "15-30%"
    },
    {
      title: "Spot Instance Utilization",
      description: "Dynamically shift non-critical workloads to spot instances for substantial cost reduction.",
      savings: "60-90% on eligible workloads"
    },
    {
      title: "Automated Scheduling",
      description: "Automatically power down development environments during off-hours.",
      savings: "40-60% on dev resources"
    },
    {
      title: "Reserved Instance Planning",
      description: "AI-powered forecasting for optimal reserved instance purchasing strategy.",
      savings: "25-40% on predictable workloads"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Cloud Cost Optimizer
        </h1>
        <p className="text-muted-foreground">
          Optimize your cloud spending and maximize ROI with AI-driven recommendations
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculator">Cost Calculator</TabsTrigger>
          <TabsTrigger value="strategies">Optimization Strategies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle>Cloud Cost Calculator</CardTitle>
              <CardDescription>
                Estimate your cloud costs and see potential savings from optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="instance-count">Number of Instances</Label>
                  <Input 
                    id="instance-count" 
                    type="number" 
                    value={instanceCount}
                    onChange={(e) => setInstanceCount(parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Instance Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.keys(instancePricing).map(type => (
                      <Button 
                        key={type}
                        variant={instanceType === type ? "default" : "outline"}
                        onClick={() => setInstanceType(type)}
                        className="capitalize"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storage">Storage (GB)</Label>
                  <Input 
                    id="storage" 
                    type="number" 
                    value={storageSize}
                    onChange={(e) => setStorageSize(parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="utilization">Current Utilization Rate (%)</Label>
                    <span>{utilizationRate}%</span>
                  </div>
                  <Slider 
                    id="utilization"
                    min={0} 
                    max={100} 
                    step={1} 
                    value={[utilizationRate]}
                    onValueChange={(value) => setUtilizationRate(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="months">Calculation Period (Months)</Label>
                  <Input 
                    id="months" 
                    type="number" 
                    value={months}
                    onChange={(e) => setMonths(parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <Button onClick={calculateCost} className="w-full">Calculate Potential Savings</Button>
                
                {optimizedCost !== null && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg">Estimated Optimized Cost</h3>
                        <p className="text-sm text-muted-foreground">Based on your current configuration</p>
                      </div>
                      <div className="text-xl font-bold text-primary">${optimizedCost.toFixed(2)}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategies">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Optimization Strategies</CardTitle>
              <CardDescription>
                Our platform automatically implements these strategies to reduce your cloud costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {optimizationStrategies.map((strategy, index) => (
                  <Card key={index} className="border-2 hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        {strategy.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{strategy.description}</p>
                      <div className="flex items-center gap-2 text-accent font-semibold">
                        <DollarSign className="h-4 w-4" />
                        <span>Typical savings: {strategy.savings}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
