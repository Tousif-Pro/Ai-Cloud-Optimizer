
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  TrendingUp,
  Users,
  BarChart,
  PieChart,
  Globe,
  Target,
  Zap,
  ArrowRight,
  Lightbulb,
  Rocket,
  LineChart,
  Eye
} from "lucide-react";

const GrowthEngine = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("opportunities");

  const marketOpportunities = [
    {
      id: 1,
      name: "Healthcare AI Integration",
      confidence: 92,
      marketSize: "$32.5B",
      growth: "+24%",
      competition: "Medium",
      timeToMarket: "6-9 months",
      description: "Developing AI solutions for patient diagnosis, treatment planning, and medical research assistance."
    },
    {
      id: 2,
      name: "Financial Services Automation",
      confidence: 87,
      marketSize: "$45.8B",
      growth: "+18%",
      competition: "High",
      timeToMarket: "3-6 months",
      description: "AI-powered tools for fraud detection, risk assessment, and automated trading strategies."
    },
    {
      id: 3,
      name: "Manufacturing Process Optimization",
      confidence: 84,
      marketSize: "$28.3B",
      growth: "+15%",
      competition: "Low",
      timeToMarket: "9-12 months",
      description: "Predictive maintenance, quality control, and supply chain optimization for manufacturing."
    },
    {
      id: 4,
      name: "Retail Personalization Engine",
      confidence: 79,
      marketSize: "$19.7B",
      growth: "+22%",
      competition: "Medium",
      timeToMarket: "4-7 months",
      description: "AI-driven recommendation systems and customer behavior analysis for retail environments."
    }
  ];

  const strategicPartners = [
    {
      id: 1,
      name: "CloudTech Solutions",
      type: "Infrastructure",
      alignment: 92,
      benefits: ["Preferred pricing", "Joint marketing", "Technical support"],
      status: "Active"
    },
    {
      id: 2,
      name: "DataCore Systems",
      type: "Data Provider",
      alignment: 87,
      benefits: ["Access to proprietary datasets", "Reduced API costs", "Co-development"],
      status: "Active"
    },
    {
      id: 3,
      name: "SaaS Connect",
      type: "Integration Platform",
      alignment: 76,
      benefits: ["Access to customer base", "Integration marketplace", "Technical certification"],
      status: "Pending"
    }
  ];

  const customerSegments = [
    {
      id: 1,
      name: "Enterprise Healthcare",
      acquisitionCost: "$8,500",
      lifetimeValue: "$125,000",
      conversionRate: "4.2%",
      growthRate: "+18%",
      satisfaction: 92
    },
    {
      id: 2,
      name: "Mid-Market Finance",
      acquisitionCost: "$5,200",
      lifetimeValue: "$78,000",
      conversionRate: "5.8%",
      growthRate: "+24%",
      satisfaction: 87
    },
    {
      id: 3,
      name: "SMB Technology",
      acquisitionCost: "$2,800",
      lifetimeValue: "$42,000",
      conversionRate: "7.3%",
      growthRate: "+32%",
      satisfaction: 85
    }
  ];

  const marketExpansionStrategies = [
    {
      id: 1,
      name: "Geographic Expansion - APAC",
      impact: 85,
      timeframe: "12-18 months",
      investmentLevel: "High",
      riskLevel: "Medium",
      description: "Establish regional headquarters and partnerships in key APAC markets."
    },
    {
      id: 2,
      name: "Vertical Integration - Healthcare",
      impact: 78,
      timeframe: "6-12 months",
      investmentLevel: "Medium",
      riskLevel: "Low",
      description: "Develop specialized offerings for healthcare providers and research institutions."
    },
    {
      id: 3,
      name: "Product Expansion - Edge AI",
      impact: 92,
      timeframe: "9-15 months",
      investmentLevel: "High",
      riskLevel: "Medium",
      description: "Create low-latency edge AI solutions for IoT and manufacturing environments."
    }
  ];

  const handleExploreOpportunity = (id: number) => {
    toast({
      title: "Opportunity Analysis Initiated",
      description: "A detailed analysis of this market opportunity has been started.",
    });
  };

  const handleInitiatePartnership = (id: number) => {
    toast({
      title: "Partnership Process Started",
      description: "The partnership evaluation and outreach process has been initiated.",
    });
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          <span className="bg-gradient-to-r from-evolve-blue-500 via-evolve-purple-500 to-evolve-teal-500 bg-clip-text text-transparent">
            Growth Engine
          </span>
        </h1>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Executive Summary
          </Button>
          <Button className="gap-2">
            <Rocket className="h-4 w-4" />
            Launch Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="opportunities" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="opportunities" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Market Opportunities
          </TabsTrigger>
          <TabsTrigger value="partners" className="gap-2">
            <Users className="h-4 w-4" />
            Strategic Partners
          </TabsTrigger>
          <TabsTrigger value="customers" className="gap-2">
            <PieChart className="h-4 w-4" />
            Customer Segments
          </TabsTrigger>
          <TabsTrigger value="expansion" className="gap-2">
            <Globe className="h-4 w-4" />
            Market Expansion
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="opportunities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                High-Confidence Market Opportunities
              </CardTitle>
              <CardDescription>
                AI-identified market opportunities with the highest confidence scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {marketOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between lg:justify-start gap-4">
                          <h3 className="font-medium text-lg">{opportunity.name}</h3>
                          <div className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded text-sm font-medium">
                            {opportunity.confidence}% Confidence
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Market Size</p>
                            <p className="font-semibold">{opportunity.marketSize}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Annual Growth</p>
                            <p className="font-semibold text-green-600 dark:text-green-400">{opportunity.growth}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Competition</p>
                            <p className="font-semibold">{opportunity.competition}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Time to Market</p>
                            <p className="font-semibold">{opportunity.timeToMarket}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          className="whitespace-nowrap"
                          onClick={() => handleExploreOpportunity(opportunity.id)}
                        >
                          Explore Opportunity
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="partners" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Strategic Partnership Opportunities
              </CardTitle>
              <CardDescription>
                Potential and existing partners with highest strategic alignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strategicPartners.map((partner) => (
                  <div key={partner.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between lg:justify-start gap-4">
                          <h3 className="font-medium text-lg">{partner.name}</h3>
                          <div className={`px-2 py-1 rounded text-sm font-medium ${
                            partner.status === 'Active' 
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                              : 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'
                          }`}>
                            {partner.status}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Type:</span>
                          <span className="text-sm font-medium">{partner.type}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Strategic Alignment</span>
                            <span className="text-sm font-medium">{partner.alignment}%</span>
                          </div>
                          <Progress value={partner.alignment} className="h-2" />
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Key Benefits</p>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                            {partner.benefits.map((benefit, index) => (
                              <li key={index} className="text-sm flex items-center gap-1">
                                <Zap className="h-3 w-3 text-yellow-500" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant={partner.status === 'Active' ? 'outline' : 'default'}
                          className="whitespace-nowrap"
                          onClick={() => handleInitiatePartnership(partner.id)}
                        >
                          {partner.status === 'Active' ? 'Manage Partnership' : 'Initiate Partnership'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Customer Segment Analysis
                </CardTitle>
                <CardDescription>
                  Key metrics across major customer segments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {customerSegments.map((segment) => (
                    <div key={segment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium mb-3">{segment.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Customer Acquisition Cost</p>
                          <p className="font-semibold">{segment.acquisitionCost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Customer Lifetime Value</p>
                          <p className="font-semibold">{segment.lifetimeValue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Conversion Rate</p>
                          <p className="font-semibold">{segment.conversionRate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">YoY Growth</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{segment.growthRate}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Satisfaction Score</span>
                          <span className="text-sm font-medium">{segment.satisfaction}/100</span>
                        </div>
                        <Progress value={segment.satisfaction} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Growth Forecasts by Segment
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">Interactive growth forecast visualization would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI-Generated Growth Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Enterprise Healthcare</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Develop specialized compliance features for regulatory environments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Partner with EHR providers for deeper integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Host industry-specific thought leadership events</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    <h3 className="font-medium">Mid-Market Finance</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Create simplified onboarding for quicker time-to-value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Develop pre-built financial risk assessment templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Implement tiered pricing model with growth incentives</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-teal-500" />
                    <h3 className="font-medium">SMB Technology</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Launch self-service plan with API-limited features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Create integration marketplace for popular SMB tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Develop referral program with compelling incentives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expansion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Market Expansion Strategies
              </CardTitle>
              <CardDescription>
                AI-generated recommendations for market expansion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {marketExpansionStrategies.map((strategy) => (
                  <div key={strategy.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="space-y-3">
                        <h3 className="font-medium text-lg">{strategy.name}</h3>
                        <p className="text-sm text-muted-foreground">{strategy.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Timeframe</p>
                            <p className="font-medium">{strategy.timeframe}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Investment</p>
                            <p className="font-medium">{strategy.investmentLevel}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Risk Level</p>
                            <p className="font-medium">{strategy.riskLevel}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Potential Impact</span>
                            <span className="text-sm font-medium">{strategy.impact}%</span>
                          </div>
                          <Progress value={strategy.impact} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          className="whitespace-nowrap"
                        >
                          View Strategy Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Geographic Targeting
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">Interactive geographic map would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Market Penetration Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">Interactive market penetration chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrowthEngine;
