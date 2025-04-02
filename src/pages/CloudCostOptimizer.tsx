
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Server, 
  Database, 
  Cpu, 
  HardDrive, 
  BarChart, 
  CloudOff, 
  DollarSign,
  ArrowRight, 
  ArrowLeft,
  CloudCog
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// AWS and Azure service pricing models (simplified for demo)
const cloudProviders = {
  aws: {
    name: "Amazon Web Services",
    logo: "/lovable-uploads/86f28db5-e756-4d84-90af-9d5f049e7f56.png",
    compute: {
      onDemand: {
        t3Small: { name: "t3.small", hourly: 0.0208, monthly: 15.18 },
        t3Medium: { name: "t3.medium", hourly: 0.0416, monthly: 30.37 },
        t3Large: { name: "t3.large", hourly: 0.0832, monthly: 60.74 },
        m5Large: { name: "m5.large", hourly: 0.096, monthly: 70.08 },
        m5xLarge: { name: "m5.xlarge", hourly: 0.192, monthly: 140.16 }
      },
      reserved: {
        t3Small: { name: "t3.small", hourly: 0.0125, monthly: 9.11 },
        t3Medium: { name: "t3.medium", hourly: 0.0250, monthly: 18.22 },
        t3Large: { name: "t3.large", hourly: 0.0499, monthly: 36.44 },
        m5Large: { name: "m5.large", hourly: 0.0576, monthly: 42.05 },
        m5xLarge: { name: "m5.xlarge", hourly: 0.1152, monthly: 84.10 }
      },
      savings: "Up to 40% with 1-year reserved instances"
    },
    storage: {
      s3Standard: { name: "S3 Standard", pricePerGB: 0.023 },
      s3IntelligentTiering: { name: "S3 Intelligent-Tiering", pricePerGB: 0.0125 },
      ebs: { name: "EBS General Purpose", pricePerGB: 0.08 }
    },
    database: {
      rdsOnDemand: { name: "RDS MySQL On-Demand", hourly: 0.178, monthly: 130 },
      rdsReserved: { name: "RDS MySQL Reserved", hourly: 0.107, monthly: 78 }
    }
  },
  azure: {
    name: "Microsoft Azure",
    logo: "/lovable-uploads/86f28db5-e756-4d84-90af-9d5f049e7f56.png",
    compute: {
      onDemand: {
        b2s: { name: "B2s", hourly: 0.0208, monthly: 15.18 },
        b2ms: { name: "B2ms", hourly: 0.0416, monthly: 30.37 },
        b4ms: { name: "B4ms", hourly: 0.0832, monthly: 60.74 },
        d2sv3: { name: "D2s v3", hourly: 0.096, monthly: 70.08 },
        d4sv3: { name: "D4s v3", hourly: 0.192, monthly: 140.16 }
      },
      reserved: {
        b2s: { name: "B2s", hourly: 0.0125, monthly: 9.11 },
        b2ms: { name: "B2ms", hourly: 0.0250, monthly: 18.22 },
        b4ms: { name: "B4ms", hourly: 0.0499, monthly: 36.44 },
        d2sv3: { name: "D2s v3", hourly: 0.0576, monthly: 42.05 },
        d4sv3: { name: "D4s v3", hourly: 0.1152, monthly: 84.10 }
      },
      savings: "Up to 40% with 1-year reserved instances"
    },
    storage: {
      blobHot: { name: "Blob Storage (Hot)", pricePerGB: 0.0184 },
      blobCool: { name: "Blob Storage (Cool)", pricePerGB: 0.01 },
      managedDisk: { name: "Managed Disk (SSD)", pricePerGB: 0.0765 }
    },
    database: {
      sqlOnDemand: { name: "Azure SQL On-Demand", hourly: 0.17, monthly: 124 },
      sqlReserved: { name: "Azure SQL Reserved", hourly: 0.102, monthly: 74.4 }
    }
  }
};

// Optimization recommendations
const recommendations = [
  {
    title: "Right-Size Your Instances",
    description: "Analyze instance utilization and downsize or upgrade based on actual needs. We've identified 40% of your instances are underutilized.",
    icon: <Server className="h-10 w-10 text-blue-500" />,
    savings: "25-30%",
    implementation: "Medium",
    details: "Many instances in your environment are running at less than 20% CPU utilization. Consider downsizing these instances to a smaller instance type or consolidating workloads."
  },
  {
    title: "Reserved Instances",
    description: "Convert predictable workloads to reserved instances for significant discounts on the hourly rate.",
    icon: <Cpu className="h-10 w-10 text-purple-500" />,
    savings: "30-40%",
    implementation: "Easy",
    details: "By committing to a 1-year term for your stable workloads, you can save up to 40% compared to on-demand pricing. This is ideal for applications that run consistently throughout the year."
  },
  {
    title: "Storage Lifecycle Policies",
    description: "Implement tiered storage to automatically move infrequently accessed data to lower-cost storage classes.",
    icon: <HardDrive className="h-10 w-10 text-green-500" />,
    savings: "15-25%",
    implementation: "Easy",
    details: "Configure lifecycle policies to automatically transition objects to S3 Infrequent Access or Glacier storage classes after 30 days of no access, reducing storage costs significantly."
  },
  {
    title: "Database Optimization",
    description: "Consolidate databases and optimize query performance to reduce compute requirements and operation costs.",
    icon: <Database className="h-10 w-10 text-yellow-500" />,
    savings: "20-35%",
    implementation: "Complex",
    details: "Consider using read replicas for read-heavy workloads, optimizing queries with proper indexing, and using managed database services that automatically scale resources based on demand."
  },
  {
    title: "Shutdown Dev/Test Environments",
    description: "Automatically shutdown non-production environments during off-hours to reduce compute costs.",
    icon: <CloudOff className="h-10 w-10 text-red-500" />,
    savings: "40-60%",
    implementation: "Easy",
    details: "Implement automated start/stop schedules for development and testing environments to run only during working hours (e.g., 8am-6pm on weekdays), potentially saving 70+ hours of runtime costs per week."
  }
];

const CloudCostOptimizer = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<'calculator' | 'recommendations'>('calculator');
  const [cloudProvider, setCloudProvider] = useState<'aws' | 'azure'>('aws');
  const [selectedComputeType, setSelectedComputeType] = useState<string>('t3Medium');
  const [selectedStorageType, setSelectedStorageType] = useState<string>('s3Standard');
  const [selectedDatabaseType, setSelectedDatabaseType] = useState<string>('rdsOnDemand');
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    instances: 5,
    instanceType: selectedComputeType,
    storage: 500,
    storageType: selectedStorageType,
    database: 3,
    databaseType: selectedDatabaseType,
    networking: 100,
    reserved: 20,
  });
  
  const [optimizedCost, setOptimizedCost] = useState<number | null>(null);
  const [currentCost, setCurrentCost] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);
  const [optimizationBreakdown, setOptimizationBreakdown] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'instanceType') {
      setSelectedComputeType(value);
    } else if (name === 'storageType') {
      setSelectedStorageType(value);
    } else if (name === 'databaseType') {
      setSelectedDatabaseType(value);
    }
  };

  const calculateCosts = () => {
    // Get current provider data
    const provider = cloudProviders[cloudProvider];
    
    // Calculate compute costs based on selected instance type
    const instanceType = selectedComputeType;
    let instanceCost;
    
    if (cloudProvider === 'aws') {
      instanceCost = formData.instances * provider.compute.onDemand[instanceType as keyof typeof provider.compute.onDemand].monthly;
    } else {
      instanceCost = formData.instances * provider.compute.onDemand[instanceType as keyof typeof provider.compute.onDemand].monthly;
    }
    
    // Calculate storage costs
    const storageType = selectedStorageType;
    let storageCost;
    
    if (cloudProvider === 'aws') {
      storageCost = formData.storage * provider.storage[storageType as keyof typeof provider.storage].pricePerGB;
    } else {
      storageCost = formData.storage * provider.storage[storageType as keyof typeof provider.storage].pricePerGB;
    }
    
    // Calculate database costs
    const databaseType = selectedDatabaseType;
    let databaseCost;
    
    if (cloudProvider === 'aws') {
      databaseCost = formData.database * provider.database[databaseType as keyof typeof provider.database].monthly;
    } else {
      databaseCost = formData.database * provider.database[databaseType as keyof typeof provider.database].monthly;
    }
    
    // Calculate networking costs (simplified)
    const networkingCost = formData.networking * 0.15;
    
    // Calculate total current cost
    const currentTotalCost = instanceCost + storageCost + databaseCost + networkingCost;
    
    // Calculate optimized costs with potential savings
    const reservedDiscount = formData.reserved / 100;
    
    // Instance optimization
    const instanceOptimized = instanceCost * (1 - (reservedDiscount * 0.40));
    
    // Storage optimization (tiered storage strategies)
    const storageOptimized = storageCost * 0.7;
    
    // Database optimization
    const databaseOptimized = databaseCost * 0.8;
    
    // Networking optimization
    const networkingOptimized = networkingCost * 0.9;
    
    // Calculate total optimized cost
    const optimizedTotalCost = instanceOptimized + storageOptimized + databaseOptimized + networkingOptimized;
    
    // Calculate total savings
    const savingsAmount = currentTotalCost - optimizedTotalCost;
    
    // Set state with calculated values
    setCurrentCost(Math.round(currentTotalCost));
    setOptimizedCost(Math.round(optimizedTotalCost));
    setSavings(Math.round(savingsAmount));
    
    // Set breakdown details for more detailed analysis
    setOptimizationBreakdown({
      compute: {
        original: Math.round(instanceCost),
        optimized: Math.round(instanceOptimized),
        savings: Math.round(instanceCost - instanceOptimized)
      },
      storage: {
        original: Math.round(storageCost),
        optimized: Math.round(storageOptimized),
        savings: Math.round(storageCost - storageOptimized)
      },
      database: {
        original: Math.round(databaseCost),
        optimized: Math.round(databaseOptimized),
        savings: Math.round(databaseCost - databaseOptimized)
      },
      networking: {
        original: Math.round(networkingCost),
        optimized: Math.round(networkingOptimized),
        savings: Math.round(networkingCost - networkingOptimized)
      }
    });
    
    toast({
      title: "Cost Analysis Complete",
      description: `Potential monthly savings: $${Math.round(savingsAmount)}`,
    });
  };

  const viewRecommendationDetails = (recommendation: any) => {
    setSelectedRecommendation(recommendation);
    setShowDetailDialog(true);
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          <span className="bg-gradient-to-r from-evolve-blue-500 via-evolve-purple-500 to-evolve-teal-500 bg-clip-text text-transparent flex items-center">
            <CloudCog className="h-8 w-8 mr-2" />
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
              <CardTitle className="flex items-center justify-between">
                <span>Cloud Cost Calculator</span>
                <Tabs defaultValue={cloudProvider} className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="aws" onClick={() => setCloudProvider('aws')}>AWS</TabsTrigger>
                    <TabsTrigger value="azure" onClick={() => setCloudProvider('azure')}>Azure</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instances">Number of VM Instances</Label>
                    <Input 
                      id="instances"
                      name="instances"
                      type="number" 
                      min="0"
                      value={formData.instances} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instanceType">Instance Type</Label>
                    {cloudProvider === 'aws' ? (
                      <Select 
                        value={selectedComputeType} 
                        onValueChange={(value) => handleSelectChange('instanceType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select instance type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="t3Small">{cloudProviders.aws.compute.onDemand.t3Small.name} (${cloudProviders.aws.compute.onDemand.t3Small.monthly}/mo)</SelectItem>
                          <SelectItem value="t3Medium">{cloudProviders.aws.compute.onDemand.t3Medium.name} (${cloudProviders.aws.compute.onDemand.t3Medium.monthly}/mo)</SelectItem>
                          <SelectItem value="t3Large">{cloudProviders.aws.compute.onDemand.t3Large.name} (${cloudProviders.aws.compute.onDemand.t3Large.monthly}/mo)</SelectItem>
                          <SelectItem value="m5Large">{cloudProviders.aws.compute.onDemand.m5Large.name} (${cloudProviders.aws.compute.onDemand.m5Large.monthly}/mo)</SelectItem>
                          <SelectItem value="m5xLarge">{cloudProviders.aws.compute.onDemand.m5xLarge.name} (${cloudProviders.aws.compute.onDemand.m5xLarge.monthly}/mo)</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select 
                        value={selectedComputeType} 
                        onValueChange={(value) => handleSelectChange('instanceType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select instance type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="b2s">{cloudProviders.azure.compute.onDemand.b2s.name} (${cloudProviders.azure.compute.onDemand.b2s.monthly}/mo)</SelectItem>
                          <SelectItem value="b2ms">{cloudProviders.azure.compute.onDemand.b2ms.name} (${cloudProviders.azure.compute.onDemand.b2ms.monthly}/mo)</SelectItem>
                          <SelectItem value="b4ms">{cloudProviders.azure.compute.onDemand.b4ms.name} (${cloudProviders.azure.compute.onDemand.b4ms.monthly}/mo)</SelectItem>
                          <SelectItem value="d2sv3">{cloudProviders.azure.compute.onDemand.d2sv3.name} (${cloudProviders.azure.compute.onDemand.d2sv3.monthly}/mo)</SelectItem>
                          <SelectItem value="d4sv3">{cloudProviders.azure.compute.onDemand.d4sv3.name} (${cloudProviders.azure.compute.onDemand.d4sv3.monthly}/mo)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storage">Storage (GB)</Label>
                    <Input 
                      id="storage"
                      name="storage"
                      type="number" 
                      min="0"
                      value={formData.storage} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storageType">Storage Type</Label>
                    {cloudProvider === 'aws' ? (
                      <Select 
                        value={selectedStorageType} 
                        onValueChange={(value) => handleSelectChange('storageType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="s3Standard">{cloudProviders.aws.storage.s3Standard.name} (${cloudProviders.aws.storage.s3Standard.pricePerGB}/GB)</SelectItem>
                          <SelectItem value="s3IntelligentTiering">{cloudProviders.aws.storage.s3IntelligentTiering.name} (${cloudProviders.aws.storage.s3IntelligentTiering.pricePerGB}/GB)</SelectItem>
                          <SelectItem value="ebs">{cloudProviders.aws.storage.ebs.name} (${cloudProviders.aws.storage.ebs.pricePerGB}/GB)</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select 
                        value={selectedStorageType} 
                        onValueChange={(value) => handleSelectChange('storageType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blobHot">{cloudProviders.azure.storage.blobHot.name} (${cloudProviders.azure.storage.blobHot.pricePerGB}/GB)</SelectItem>
                          <SelectItem value="blobCool">{cloudProviders.azure.storage.blobCool.name} (${cloudProviders.azure.storage.blobCool.pricePerGB}/GB)</SelectItem>
                          <SelectItem value="managedDisk">{cloudProviders.azure.storage.managedDisk.name} (${cloudProviders.azure.storage.managedDisk.pricePerGB}/GB)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="database">Database Instances</Label>
                    <Input 
                      id="database"
                      name="database"
                      type="number" 
                      min="0"
                      value={formData.database} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="databaseType">Database Type</Label>
                    {cloudProvider === 'aws' ? (
                      <Select 
                        value={selectedDatabaseType} 
                        onValueChange={(value) => handleSelectChange('databaseType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select database type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rdsOnDemand">{cloudProviders.aws.database.rdsOnDemand.name} (${cloudProviders.aws.database.rdsOnDemand.monthly}/mo)</SelectItem>
                          <SelectItem value="rdsReserved">{cloudProviders.aws.database.rdsReserved.name} (${cloudProviders.aws.database.rdsReserved.monthly}/mo)</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select 
                        value={selectedDatabaseType} 
                        onValueChange={(value) => handleSelectChange('databaseType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select database type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sqlOnDemand">{cloudProviders.azure.database.sqlOnDemand.name} (${cloudProviders.azure.database.sqlOnDemand.monthly}/mo)</SelectItem>
                          <SelectItem value="sqlReserved">{cloudProviders.azure.database.sqlReserved.name} (${cloudProviders.azure.database.sqlReserved.monthly}/mo)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="networking">Data Transfer (GB)</Label>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="reserved">
                      Percentage of workloads that can use reserved instances (%)
                    </Label>
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
                </div>
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
                    
                    {optimizationBreakdown && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Savings Breakdown</h3>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-muted/30 p-2 rounded">
                            <div className="font-medium">Compute</div>
                            <div className="text-green-600">-${optimizationBreakdown.compute.savings}</div>
                          </div>
                          
                          <div className="bg-muted/30 p-2 rounded">
                            <div className="font-medium">Storage</div>
                            <div className="text-green-600">-${optimizationBreakdown.storage.savings}</div>
                          </div>
                          
                          <div className="bg-muted/30 p-2 rounded">
                            <div className="font-medium">Database</div>
                            <div className="text-green-600">-${optimizationBreakdown.database.savings}</div>
                          </div>
                          
                          <div className="bg-muted/30 p-2 rounded">
                            <div className="font-medium">Networking</div>
                            <div className="text-green-600">-${optimizationBreakdown.networking.savings}</div>
                          </div>
                        </div>
                      </div>
                    )}
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
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Potential Savings</span>
                        <p className="font-bold text-green-600 dark:text-green-400">{rec.savings}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Implementation</span>
                        <p className="font-medium">{rec.implementation}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => viewRecommendationDetails(rec)}
                    >
                      View Details
                    </Button>
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
      
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedRecommendation?.icon}
              {selectedRecommendation?.title}
            </DialogTitle>
            <DialogDescription>
              Implementation difficulty: {selectedRecommendation?.implementation}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <p>{selectedRecommendation?.details}</p>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span>Potential Savings</span>
              <span className="font-bold text-green-600">{selectedRecommendation?.savings}</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Implementation Steps:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Analyze current usage patterns using cloud provider monitoring tools</li>
                <li>Identify resources that match this optimization pattern</li>
                <li>Create implementation plan with minimal service disruption</li>
                <li>Test changes in a staging environment</li>
                <li>Gradually roll out to production with monitoring</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowDetailDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CloudCostOptimizer;
