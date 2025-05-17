
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Server, Database, HardDrive, Cloud, DollarSign, Zap, BarChart4, Award, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";

interface CloudProvider {
  id: string;
  name: string;
  logo: JSX.Element;
  description: string;
  serviceTypes: CloudServiceType[];
}

interface CloudServiceType {
  id: string;
  name: string;
  description: string;
  services: CloudService[];
}

interface CloudService {
  id: string;
  name: string;
  description: string;
  pricing: {
    compute: {
      monthly: number;
      hourly: number;
    };
    storage: {
      pricePerGB: number;
    };
    database: {
      monthly: number;
    };
  };
  features: string[];
}

// Define pricing data
const cloudProviders: CloudProvider[] = [
  {
    id: "aws",
    name: "Amazon Web Services",
    logo: <Cloud className="h-6 w-6 text-orange-500" />,
    description: "Wide range of cloud computing services",
    serviceTypes: [
      {
        id: "compute",
        name: "Compute Services",
        description: "Virtual servers for running applications",
        services: [
          {
            id: "ec2",
            name: "EC2 Instances",
            description: "Virtual servers in the cloud",
            pricing: {
              compute: {
                monthly: 29.2,
                hourly: 0.0403,
              },
              storage: {
                pricePerGB: 0.10,
              },
              database: {
                monthly: 0,
              }
            },
            features: [
              "Auto Scaling",
              "Load Balancing",
              "Custom AMIs",
              "Multiple Instance Types"
            ]
          },
          {
            id: "lambda",
            name: "Lambda Functions",
            description: "Run code without provisioning servers",
            pricing: {
              compute: {
                monthly: 8.5,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0,
              },
              database: {
                monthly: 0,
              }
            },
            features: [
              "Serverless Architecture",
              "Pay per execution",
              "Automatic scaling"
            ]
          }
        ]
      },
      {
        id: "storage",
        name: "Storage Services",
        description: "Scalable cloud storage solutions",
        services: [
          {
            id: "s3",
            name: "S3 Storage",
            description: "Object storage for any type of data",
            pricing: {
              compute: {
                monthly: 0,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0.023,
              },
              database: {
                monthly: 0,
              }
            },
            features: [
              "Unlimited Storage",
              "99.999999999% durability",
              "Lifecycle Policies",
              "Versioning"
            ]
          },
          {
            id: "ebs",
            name: "EBS Volumes",
            description: "Block storage for EC2 instances",
            pricing: {
              compute: {
                monthly: 0,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0.10,
              },
              database: {
                monthly: 0,
              }
            },
            features: [
              "SSD and HDD options",
              "Snapshots",
              "Encryption"
            ]
          }
        ]
      },
      {
        id: "database",
        name: "Database Services",
        description: "Managed database services",
        services: [
          {
            id: "rds",
            name: "RDS Database",
            description: "Managed relational database service",
            pricing: {
              compute: {
                monthly: 0,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0,
              },
              database: {
                monthly: 45.26,
              }
            },
            features: [
              "Multiple DB engines",
              "Automated backups",
              "Multi-AZ deployment"
            ]
          },
          {
            id: "dynamodb",
            name: "DynamoDB",
            description: "NoSQL database service",
            pricing: {
              compute: {
                monthly: 0,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0,
              },
              database: {
                monthly: 25.14,
              }
            },
            features: [
              "Auto scaling",
              "Global tables",
              "Serverless"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    logo: <Cloud className="h-6 w-6 text-blue-500" />,
    description: "Microsoft's cloud computing platform",
    serviceTypes: [
      {
        id: "compute",
        name: "Compute Services",
        description: "Virtual machines and containers",
        services: [
          {
            id: "vm",
            name: "Virtual Machines",
            description: "Scalable cloud computing",
            pricing: {
              compute: {
                monthly: 30.66,
                hourly: 0.0426,
              },
              storage: {
                pricePerGB: 0.12,
              },
              database: {
                monthly: 0,
              }
            },
            features: [
              "Windows & Linux support",
              "Auto-scaling",
              "Advanced networking",
              "High availability"
            ]
          },
          {
            id: "functions",
            name: "Azure Functions",
            description: "Serverless computing service",
            pricing: {
              compute: {
                monthly: 7.9,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0,
              },
              database: {
                monthly: 0,
              }
            },
            features: [
              "Serverless architecture",
              "Pay-per-execution",
              "Integrated Microsoft tools"
            ]
          }
        ]
      },
      {
        id: "storage",
        name: "Storage Services",
        description: "Scalable cloud storage solutions",
        services: [
          {
            id: "blob",
            name: "Blob Storage",
            description: "Object storage for unstructured data",
            pricing: {
              compute: {
                monthly: 0,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0.0184,
              },
              database: {
                monthly: 0,
              }
            },
            features: [
              "Tiered storage",
              "Lifecycle management",
              "Data redundancy"
            ]
          },
          {
            id: "disk",
            name: "Azure Disk Storage",
            description: "Block-level storage volumes",
            pricing: {
              compute: {
                monthly: 0,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0.095,
              },
              database: {
                monthly: 0,
              }
            },
            features: [
              "SSD & HDD options",
              "Snapshots",
              "Disk encryption"
            ]
          }
        ]
      },
      {
        id: "database",
        name: "Database Services",
        description: "Managed database services",
        services: [
          {
            id: "sql",
            name: "Azure SQL Database",
            description: "Managed SQL database service",
            pricing: {
              compute: {
                monthly: 0,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0,
              },
              database: {
                monthly: 42.34,
              }
            },
            features: [
              "Automatic tuning",
              "Advanced security",
              "High availability"
            ]
          },
          {
            id: "cosmos",
            name: "Cosmos DB",
            description: "Globally distributed database service",
            pricing: {
              compute: {
                monthly: 0,
                hourly: 0,
              },
              storage: {
                pricePerGB: 0,
              },
              database: {
                monthly: 31.25,
              }
            },
            features: [
              "Multi-model database",
              "Global distribution",
              "Multiple consistency models"
            ]
          }
        ]
      }
    ]
  }
];

// Recommendations storage
const costRecommendations = [
  {
    id: 1,
    title: "Right-size underutilized resources",
    description: "Analyze resource usage patterns and downsize instances that are consistently underutilized.",
    saving: "15-30%",
    effort: "medium",
    category: "compute"
  },
  {
    id: 2,
    title: "Implement auto-scaling",
    description: "Set up auto-scaling to automatically adjust resources based on demand.",
    saving: "10-25%",
    effort: "medium",
    category: "compute"
  },
  {
    id: 3,
    title: "Utilize spot/preemptible instances",
    description: "Use spot instances for non-critical, fault-tolerant workloads to save on compute costs.",
    saving: "60-90%",
    effort: "high",
    category: "compute"
  },
  {
    id: 4,
    title: "Implement storage lifecycle policies",
    description: "Move infrequently accessed data to lower-cost storage tiers automatically.",
    saving: "40-70%",
    effort: "low",
    category: "storage"
  },
  {
    id: 5,
    title: "Database optimization",
    description: "Optimize database resources by using appropriate instance types and storage options.",
    saving: "20-35%",
    effort: "high",
    category: "database"
  },
  {
    id: 6,
    title: "Reserved instances/savings plans",
    description: "Purchase reserved instances or savings plans for predictable workloads.",
    saving: "30-75%",
    effort: "low",
    category: "general"
  },
  {
    id: 7,
    title: "Remove unused resources",
    description: "Identify and eliminate idle or unused resources that are still incurring costs.",
    saving: "100% of unused",
    effort: "low",
    category: "general"
  }
];

export default function CloudCostOptimizer() {
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<string>("aws");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("compute");
  const [selectedService, setSelectedService] = useState<string>("ec2");
  const [computeUnits, setComputeUnits] = useState<number>(5);
  const [storageGB, setStorageGB] = useState<number>(100);
  const [databaseInstances, setDatabaseInstances] = useState<number>(1);
  const [monthlyEstimate, setMonthlyEstimate] = useState<number>(0);
  const [yearlyEstimate, setYearlyEstimate] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [selectedRecommendations, setSelectedRecommendations] = useState<number[]>([]);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  // Get the current provider data
  const currentProvider = cloudProviders.find(provider => provider.id === selectedProvider);
  
  // Get the current service type data
  const currentServiceType = currentProvider?.serviceTypes.find(type => type.id === selectedServiceType);
  
  // Get the current service data
  const currentService = currentServiceType?.services.find(service => service.id === selectedService);

  // Calculate cost
  useEffect(() => {
    if (currentService) {
      // Calculate base costs
      const computeCost = currentService.pricing.compute.monthly * computeUnits;
      const storageCost = currentService.pricing.storage.pricePerGB * storageGB;
      const databaseCost = currentService.pricing.database.monthly * databaseInstances;
      
      // Calculate total
      const total = computeCost + storageCost + databaseCost;
      setMonthlyEstimate(total);
      setYearlyEstimate(total * 12);
      
      // Calculate savings
      let savingsPercent = 0;
      selectedRecommendations.forEach(recId => {
        const rec = costRecommendations.find(r => r.id === recId);
        if (rec) {
          // Extract numeric value from saving percentage range
          const savingStr = rec.saving.split('-')[0].replace(/[^0-9]/g, '');
          const savingValue = parseInt(savingStr, 10) / 100;
          
          // Apply category-specific savings
          if (rec.category === 'general' || rec.category === selectedServiceType) {
            savingsPercent += savingValue;
          }
        }
      });
      
      // Cap savings at 90%
      savingsPercent = Math.min(savingsPercent, 0.9);
      setSavings(total * savingsPercent);
      
    }
  }, [currentService, computeUnits, storageGB, databaseInstances, selectedRecommendations, selectedServiceType]);

  // Handle recommendation toggle
  const toggleRecommendation = (recId: number) => {
    if (selectedRecommendations.includes(recId)) {
      setSelectedRecommendations(selectedRecommendations.filter(id => id !== recId));
    } else {
      setSelectedRecommendations([...selectedRecommendations, recId]);
    }
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      toast({
        title: "Cost Optimization Complete",
        description: `We've identified potential savings of $${savings.toFixed(2)} per month.`,
        variant: "default",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Cloud Cost Optimizer
        </h1>
        <p className="text-muted-foreground">
          Analyze and optimize your cloud costs across major platforms
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 text-blue-500 mr-2" />
              Cloud Service Calculator
            </CardTitle>
            <CardDescription>
              Estimate and compare cloud costs across providers and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={selectedProvider} onValueChange={setSelectedProvider}>
              <TabsList className="grid w-full grid-cols-2">
                {cloudProviders.map(provider => (
                  <TabsTrigger key={provider.id} value={provider.id} className="flex items-center gap-2">
                    {provider.logo}
                    <span>{provider.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {cloudProviders.map(provider => (
                <TabsContent key={provider.id} value={provider.id} className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {provider.serviceTypes.map(serviceType => (
                      <Card 
                        key={serviceType.id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedServiceType === serviceType.id ? 'border-2 border-primary' : ''
                        }`}
                        onClick={() => setSelectedServiceType(serviceType.id)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center">
                            {serviceType.id === 'compute' && <Server className="h-4 w-4 mr-2" />}
                            {serviceType.id === 'storage' && <HardDrive className="h-4 w-4 mr-2" />}
                            {serviceType.id === 'database' && <Database className="h-4 w-4 mr-2" />}
                            {serviceType.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs text-muted-foreground">
                          {serviceType.description}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Service Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {currentProvider?.serviceTypes
                      .find(type => type.id === selectedServiceType)?.services
                      .map(service => (
                        <Card 
                          key={service.id} 
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedService === service.id ? 'border-2 border-primary' : ''
                          }`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex justify-between items-center">
                              <span>{service.name}</span>
                              {selectedService === service.id && (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-xs text-muted-foreground">{service.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {service.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    }
                  </div>
                  
                  {/* Resource Configuration */}
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-sm">Resource Configuration</CardTitle>
                      <CardDescription>Adjust your resource needs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="compute-slider">Compute Units</Label>
                          <span className="text-sm font-medium">{computeUnits}</span>
                        </div>
                        <Slider 
                          id="compute-slider"
                          min={1} 
                          max={20} 
                          step={1} 
                          value={[computeUnits]}
                          onValueChange={(value) => setComputeUnits(value[0])}
                        />
                        {currentService && (
                          <div className="text-xs text-muted-foreground">
                            ${currentService.pricing.compute.monthly.toFixed(2)} per unit monthly
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="storage-slider">Storage (GB)</Label>
                          <span className="text-sm font-medium">{storageGB}</span>
                        </div>
                        <Slider 
                          id="storage-slider"
                          min={10} 
                          max={1000} 
                          step={10} 
                          value={[storageGB]}
                          onValueChange={(value) => setStorageGB(value[0])}
                        />
                        {currentService && (
                          <div className="text-xs text-muted-foreground">
                            ${currentService.pricing.storage.pricePerGB.toFixed(4)} per GB
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="database-slider">Database Instances</Label>
                          <span className="text-sm font-medium">{databaseInstances}</span>
                        </div>
                        <Slider 
                          id="database-slider"
                          min={0} 
                          max={5} 
                          step={1} 
                          value={[databaseInstances]}
                          onValueChange={(value) => setDatabaseInstances(value[0])}
                        />
                        {currentService && (
                          <div className="text-xs text-muted-foreground">
                            ${currentService.pricing.database.monthly.toFixed(2)} per instance monthly
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div>
                        <p className="text-sm font-medium">Estimated Monthly Cost</p>
                        <p className="text-2xl font-bold">${monthlyEstimate.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">${yearlyEstimate.toFixed(2)} annually</p>
                      </div>
                      <Button onClick={handleOptimize} disabled={isOptimizing}>
                        {isOptimizing ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Optimizing...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Optimize Costs
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              Cost Optimization
            </CardTitle>
            <CardDescription>
              Optimization recommendations and potential savings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-3 bg-green-50 dark:bg-green-900/20">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm">Potential Monthly Savings</h4>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {savings > 0 ? (savings / monthlyEstimate * 100).toFixed(0) : 0}% reduction
                </Badge>
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${savings.toFixed(2)}
              </div>
              <Progress value={(savings / monthlyEstimate) * 100} className="h-2 mt-2" />
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-3">Optimization Recommendations</h4>
              <ScrollArea className="h-96 rounded-md border p-2">
                <div className="space-y-3">
                  {costRecommendations.map(rec => {
                    const isSelected = selectedRecommendations.includes(rec.id);
                    return (
                      <div 
                        key={rec.id}
                        className={`p-3 rounded-lg border cursor-pointer hover:bg-accent/10 transition-colors ${
                          isSelected ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => toggleRecommendation(rec.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium text-sm flex items-center">
                            {isSelected && <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5" />}
                            {rec.title}
                          </h5>
                          <Badge>
                            {rec.saving}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                        <div className="flex justify-between text-xs">
                          <Badge variant="outline" className="capitalize">
                            {rec.category}
                          </Badge>
                          <span className={`
                            ${rec.effort === 'low' ? 'text-green-600' : 
                              rec.effort === 'medium' ? 'text-amber-600' : 'text-red-600'}
                          `}>
                            {rec.effort} effort
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button variant="outline" className="w-full">
                <BarChart4 className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" className="w-full">
                <Award className="h-4 w-4 mr-2" />
                Best Practices
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
