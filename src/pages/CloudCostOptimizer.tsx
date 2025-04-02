
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Server, 
  Database, 
  Cpu, 
  HardDrive, 
  BarChart, 
  CloudOff, 
  DollarSign,
  ArrowRight, 
  ArrowLeft
} from "lucide-react";

const CloudCostOptimizer = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<'calculator' | 'recommendations'>('calculator');
  const [formData, setFormData] = useState({
    instances: 5,
    storage: 500,
    database: 3,
    networking: 100,
    reserved: 20,
  });
  
  const [optimizedCost, setOptimizedCost] = useState<number | null>(null);
  const [currentCost, setCurrentCost] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);

  const calculateCosts = () => {
    // Calculate current costs (simplified model)
    const instanceCost = formData.instances * 150;
    const storageCost = formData.storage * 0.08;
    const databaseCost = formData.database * 200;
    const networkingCost = formData.networking * 0.15;
    
    // Calculate with standard rates
    const currentTotalCost = instanceCost + storageCost + databaseCost + networkingCost;
    
    // Calculate optimized costs with reserved instances and optimization techniques
    const reservedDiscount = formData.reserved / 100;
    const instanceOptimized = instanceCost * (1 - (reservedDiscount * 0.40));
    const storageOptimized = storageCost * 0.7; // Assume 30% storage optimization
    const databaseOptimized = databaseCost * 0.8; // Assume 20% database optimization
    const networkingOptimized = networkingCost * 0.9; // Assume 10% networking optimization
    
    const optimizedTotalCost = instanceOptimized + storageOptimized + databaseOptimized + networkingOptimized;
    const savingsAmount = currentTotalCost - optimizedTotalCost;
    
    setCurrentCost(Math.round(currentTotalCost));
    setOptimizedCost(Math.round(optimizedTotalCost));
    setSavings(Math.round(savingsAmount));
    
    toast({
      title: "Cost Analysis Complete",
      description: `Potential monthly savings: $${Math.round(savingsAmount)}`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const recommendations = [
    {
      title: "Right-Size Your Instances",
      description: "Analyze instance utilization and downsize or upgrade based on actual needs. We've identified 40% of your instances are underutilized.",
      icon: <Server className="h-10 w-10 text-blue-500" />,
      savings: "25-30%",
      implementation: "Medium",
    },
    {
      title: "Reserved Instances",
      description: "Convert predictable workloads to reserved instances for significant discounts on the hourly rate.",
      icon: <Cpu className="h-10 w-10 text-purple-500" />,
      savings: "30-40%",
      implementation: "Easy",
    },
    {
      title: "Storage Lifecycle Policies",
      description: "Implement tiered storage to automatically move infrequently accessed data to lower-cost storage classes.",
      icon: <HardDrive className="h-10 w-10 text-green-500" />,
      savings: "15-25%",
      implementation: "Easy",
    },
    {
      title: "Database Optimization",
      description: "Consolidate databases and optimize query performance to reduce compute requirements and operation costs.",
      icon: <Database className="h-10 w-10 text-yellow-500" />,
      savings: "20-35%",
      implementation: "Complex",
    },
    {
      title: "Shutdown Dev/Test Environments",
      description: "Automatically shutdown non-production environments during off-hours to reduce compute costs.",
      icon: <CloudOff className="h-10 w-10 text-red-500" />,
      savings: "40-60%",
      implementation: "Easy",
    }
  ];

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          <span className="bg-gradient-to-r from-evolve-blue-500 via-evolve-purple-500 to-evolve-teal-500 bg-clip-text text-transparent">
            Cloud Cost Optimizer
          </span>
        </h1>
        <div className="flex space-x-2">
          <Button 
            variant={currentView === 'calculator' ? 'default' : 'outline'} 
            onClick={() => setCurrentView('calculator')}
            className="gap-2"
          >
            <DollarSign className="h-4 w-4" />
            Cost Calculator
          </Button>
          <Button 
            variant={currentView === 'recommendations' ? 'default' : 'outline'} 
            onClick={() => setCurrentView('recommendations')}
            className="gap-2"
          >
            <BarChart className="h-4 w-4" />
            Recommendations
          </Button>
        </div>
      </div>

      {currentView === 'calculator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Cloud Cost Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="instances" className="text-sm font-medium">
                      Number of VM Instances
                    </label>
                    <Input 
                      id="instances"
                      name="instances"
                      type="number" 
                      min="0"
                      value={formData.instances} 
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">$150 per instance/month</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="storage" className="text-sm font-medium">
                      Storage (GB)
                    </label>
                    <Input 
                      id="storage"
                      name="storage"
                      type="number" 
                      min="0"
                      value={formData.storage} 
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">$0.08 per GB/month</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="database" className="text-sm font-medium">
                      Database Instances
                    </label>
                    <Input 
                      id="database"
                      name="database"
                      type="number" 
                      min="0"
                      value={formData.database} 
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">$200 per instance/month</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="networking" className="text-sm font-medium">
                      Data Transfer (GB)
                    </label>
                    <Input 
                      id="networking"
                      name="networking"
                      type="number" 
                      min="0"
                      value={formData.networking} 
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">$0.15 per GB/month</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="reserved" className="text-sm font-medium">
                  Percentage of workloads that can use reserved instances (%)
                </label>
                <Input 
                  id="reserved"
                  name="reserved"
                  type="number" 
                  min="0"
                  max="100"
                  value={formData.reserved} 
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">Higher percentages lead to greater savings</p>
              </div>
              
              <Button className="w-full" onClick={calculateCosts}>
                Calculate Potential Savings
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentCost !== null && optimizedCost !== null && savings !== null ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Current Monthly Cost</span>
                        <span className="text-sm font-bold">${currentCost}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Optimized Monthly Cost</span>
                        <span className="text-sm font-bold">${optimizedCost}</span>
                      </div>
                      <Progress value={(optimizedCost / currentCost) * 100} className="h-2" />
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Monthly Savings</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">${savings}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm">Annual Savings: <span className="font-bold">${savings * 12}</span></span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setCurrentView('recommendations')} 
                    variant="outline" 
                    className="w-full"
                  >
                    View Optimization Recommendations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <DollarSign className="h-16 w-16 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Enter your cloud resource details and calculate to see potential savings.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-muted rounded-full">
                        {rec.icon}
                      </div>
                      <h3 className="font-medium text-lg">{rec.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-xs text-muted-foreground">Potential Savings</span>
                        <p className="font-bold text-green-600 dark:text-green-400">{rec.savings}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Implementation</span>
                        <p className="font-medium">{rec.implementation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Button onClick={() => setCurrentView('calculator')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Button>
        </div>
      )}
    </div>
  );
};

export default CloudCostOptimizer;
