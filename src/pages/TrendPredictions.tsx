
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample trend data
const marketTrends = [
  {
    id: 1,
    title: "Generative AI for Content Creation",
    description: "Rapid adoption of generative models for creating marketing materials, designs, and product descriptions.",
    prediction: "Expected to grow by 280% in the next 24 months.",
    impact: "high",
    confidenceScore: 92,
    recommendations: [
      "Invest in generative model fine-tuning capabilities",
      "Develop expertise in prompt engineering",
      "Create content generation services for marketing teams"
    ],
    tags: ["Generative AI", "Content", "Marketing"]
  },
  {
    id: 2,
    title: "AI Regulation Compliance Solutions",
    description: "Growing demand for tools that help companies comply with emerging AI regulations and governance requirements.",
    prediction: "Market size expected to reach $4.8B by 2026.",
    impact: "high",
    confidenceScore: 87,
    recommendations: [
      "Develop compliance monitoring tools",
      "Create explainability features for AI systems",
      "Partner with legal expertise firms"
    ],
    tags: ["Regulation", "Compliance", "Governance"]
  },
  {
    id: 3,
    title: "Multi-modal AI Interfaces",
    description: "Increasing integration of text, vision, and audio understanding in unified AI systems.",
    prediction: "Will become standard in 65% of enterprise AI applications by 2025.",
    impact: "medium",
    confidenceScore: 83,
    recommendations: [
      "Develop multi-modal capabilities in core products",
      "Research efficient methods for cross-modal learning",
      "Acquire talent with multi-modal AI expertise"
    ],
    tags: ["Multi-modal", "Computer Vision", "NLP"]
  },
  {
    id: 4,
    title: "AI-Powered Decision Optimization",
    description: "Growing adoption of AI for complex business decision optimization across industries.",
    prediction: "Market growth at 35% CAGR through 2027.",
    impact: "high",
    confidenceScore: 79,
    recommendations: [
      "Focus on industry-specific decision support systems",
      "Develop reinforcement learning capabilities",
      "Create frameworks for human-AI collaborative decision making"
    ],
    tags: ["Decision Making", "Optimization", "Business Intelligence"]
  },
];

const adoptionData = [
  { month: "Jan", enterprises: 20, midMarket: 12, smallBusiness: 5 },
  { month: "Feb", enterprises: 25, midMarket: 14, smallBusiness: 7 },
  { month: "Mar", enterprises: 30, midMarket: 18, smallBusiness: 8 },
  { month: "Apr", enterprises: 40, midMarket: 24, smallBusiness: 10 },
  { month: "May", enterprises: 45, midMarket: 28, smallBusiness: 12 },
  { month: "Jun", enterprises: 55, midMarket: 35, smallBusiness: 15 },
  { month: "Jul", enterprises: 70, midMarket: 45, smallBusiness: 20 },
  { month: "Aug", enterprises: 85, midMarket: 55, smallBusiness: 25 },
];

// Helper function to render impact badge with appropriate color
function getImpactBadge(impact: string) {
  switch (impact) {
    case "high":
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">High Impact</Badge>;
    case "medium":
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Medium Impact</Badge>;
    case "low":
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Low Impact</Badge>;
    default:
      return <Badge variant="outline">{impact} Impact</Badge>;
  }
}

export default function TrendPredictions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Trend Predictions & Insights
        </h1>
        <p className="text-muted-foreground">
          AI-powered forecasting of industry trends and strategic recommendations
        </p>
      </div>

      <Tabs defaultValue="market" className="space-y-4">
        <TabsList>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
          <TabsTrigger value="adoption">Adoption Curves</TabsTrigger>
        </TabsList>
        
        <TabsContent value="market">
          <div className="grid gap-4 md:grid-cols-2">
            {marketTrends.map((trend) => (
              <Card key={trend.id} className="dashboard-card">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">{trend.title}</CardTitle>
                    <CardDescription className="mt-1">{trend.description}</CardDescription>
                  </div>
                  <Lightbulb className="h-5 w-5 text-evolve-purple-500 mt-1" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getImpactBadge(trend.impact)}
                      <span className="text-sm text-muted-foreground">Confidence: {trend.confidenceScore}%</span>
                    </div>
                  </div>
                  
                  <div className="text-sm font-medium">Prediction:</div>
                  <div className="text-sm bg-muted/30 p-2 rounded">
                    {trend.prediction}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Strategic Recommendations:</div>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      {trend.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {trend.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="adoption">
          <Card>
            <CardHeader>
              <CardTitle>AI Technology Adoption Curves</CardTitle>
              <CardDescription>
                Predicted adoption rates across different market segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={adoptionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: 'Adoption %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="enterprises" stroke="#1a237e" strokeWidth={2} name="Enterprise" />
                    <Line type="monotone" dataKey="midMarket" stroke="#4a148c" name="Mid-Market" />
                    <Line type="monotone" dataKey="smallBusiness" stroke="#006064" name="Small Business" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
                <h3 className="font-medium mb-2">Key Insights:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Enterprise adoption is accelerating rapidly, with a projected 300% increase by year-end</li>
                  <li>• Mid-market companies show strong growth pattern following enterprise adoption</li>
                  <li>• Small business adoption is beginning to rise as technology becomes more accessible</li>
                  <li>• Overall market penetration expected to reach critical mass in Q4</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
