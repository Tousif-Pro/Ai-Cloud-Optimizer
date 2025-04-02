
import { StatCard } from "@/components/dashboard/StatCard";
import { MetricChart } from "@/components/dashboard/MetricChart";
import { CompetitorTracker } from "@/components/dashboard/CompetitorTracker";
import { ResourceAllocation } from "@/components/dashboard/ResourceAllocation";
import { TrendInsight } from "@/components/dashboard/TrendInsight";
import { ChartBar, Users, Database, Search, Stars, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIInsightPanel } from "@/components/dashboard/AIInsightPanel";
import { ClientSpotlight } from "@/components/dashboard/ClientSpotlight";
import { useState } from "react";
import { toast } from "sonner";

// Sample data for charts
const revenueData = [
  { name: "Jan", value: 80 },
  { name: "Feb", value: 92 },
  { name: "Mar", value: 85 },
  { name: "Apr", value: 99 },
  { name: "May", value: 105 },
  { name: "Jun", value: 125 },
  { name: "Jul", value: 148 },
];

const acquisitionData = [
  { name: "Jan", value: 15 },
  { name: "Feb", value: 18 },
  { name: "Mar", value: 22 },
  { name: "Apr", value: 24 },
  { name: "May", value: 35 },
  { name: "Jun", value: 42 },
  { name: "Jul", value: 48 },
];

// Updated competitors data with strengths and weaknesses
const competitors = [
  { 
    name: "Your Company", 
    value: 78, 
    color: "bg-blue-500", 
    growth: 12,
    strength: "AI-driven analytics platform",
    weakness: "Limited global presence"
  },
  { 
    name: "Competitor A", 
    value: 65, 
    color: "bg-purple-500", 
    growth: 8,
    strength: "Strong enterprise partnerships",
    weakness: "Outdated technology stack"
  },
  { 
    name: "Competitor B", 
    value: 49, 
    color: "bg-green-500", 
    growth: -3,
    strength: "Cost-effective solutions",
    weakness: "Poor customer support"
  },
  { 
    name: "Competitor C", 
    value: 42, 
    color: "bg-yellow-500", 
    growth: 5,
    strength: "Innovative R&D department",
    weakness: "Complex pricing structure"
  },
];

const resourceAllocationData = [
  { name: "R&D", value: 40, color: "#1a237e" },
  { name: "Marketing", value: 25, color: "#4a148c" },
  { name: "Operations", value: 20, color: "#006064" },
  { name: "Admin", value: 15, color: "#0d47a1" },
];

const trendData = [
  {
    id: 1,
    title: "Generative AI in Enterprise",
    description: "Increasing adoption of generative AI for content production and automation in enterprise settings.",
    confidence: 92,
    impact: "high" as const,
    tags: ["GenAI", "Enterprise", "Automation"],
  },
  {
    id: 2,
    title: "Multi-modal Models",
    description: "Growth in models that can process and generate multiple types of data including text, images, and audio.",
    confidence: 87,
    impact: "medium" as const,
    tags: ["Multi-modal", "Computer Vision", "NLP"],
  },
  {
    id: 3,
    title: "Federated Learning Platforms",
    description: "Privacy-preserving machine learning approaches gaining traction in regulated industries.",
    confidence: 76,
    impact: "medium" as const,
    tags: ["Privacy", "Federated Learning", "Regulation"],
  },
];

// Featured clients data
const featuredClients = [
  {
    id: 1,
    name: "TechNova Solutions",
    logo: "🏢",
    industry: "Enterprise Software",
    revenue: "$3.2M",
    status: "growing",
    lastInteraction: "2 days ago",
    satisfaction: 92,
    upcoming: {
      title: "Quarterly Strategy Review",
      date: "Jul 28, 2023",
    },
    notes: "Looking to expand AI integration across their product line. High potential for upselling.",
  },
  {
    id: 2,
    name: "MediCore Innovations",
    logo: "🏥",
    industry: "Healthcare",
    revenue: "$1.8M",
    status: "stable",
    lastInteraction: "1 week ago",
    satisfaction: 86,
    upcoming: {
      title: "Product Demo - New Module",
      date: "Aug 5, 2023",
    },
    notes: "Regulatory compliance is a top concern. Need to emphasize our security features.",
  },
  {
    id: 3,
    name: "GreenPath Logistics",
    logo: "🚚",
    industry: "Transportation",
    revenue: "$2.4M",
    status: "at risk",
    lastInteraction: "3 weeks ago",
    satisfaction: 71,
    upcoming: {
      title: "Renewal Discussion",
      date: "Jul 31, 2023",
    },
    notes: "Experiencing budget constraints. Prepare retention plan with scaled pricing options.",
  },
];

export default function Dashboard() {
  const [showAIInsights, setShowAIInsights] = useState(false);

  const handleGenerateInsights = () => {
    setShowAIInsights(true);
    toast.success("AI analysis complete! New strategic insights generated.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
            Business Evolution Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time analytics and insights to drive your AI company forward
          </p>
        </div>
        <Button 
          onClick={handleGenerateInsights}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
        >
          <BrainCircuit className="mr-2 h-4 w-4" />
          Generate AI Insights
        </Button>
      </div>

      {showAIInsights && <AIInsightPanel />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly Revenue"
          value="$248,500"
          description="↑ 18.2% from last month"
          trend="up"
          icon={<ChartBar className="h-4 w-4" />}
        />
        <StatCard
          title="Active Clients"
          value="73"
          description="↑ 4 new this month"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Pipeline Value"
          value="$1.2M"
          description="↑ 22% increase in opportunities"
          trend="up"
          icon={<Database className="h-4 w-4" />}
        />
        <StatCard
          title="Market Position"
          value="#2"
          description="Improved from #3 last quarter"
          trend="up"
          icon={<Search className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <MetricChart
          title="Revenue Growth"
          data={revenueData}
          dataKey="value"
          color="#1a237e"
        />
        <MetricChart
          title="Customer Acquisition"
          data={acquisitionData}
          dataKey="value"
          color="#4a148c"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CompetitorTracker competitors={competitors} />
        <ResourceAllocation data={resourceAllocationData} />
        <TrendInsight trends={trendData} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Stars className="mr-2 h-5 w-5 text-yellow-500" />
          Client Spotlight
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredClients.map((client) => (
            <ClientSpotlight key={client.id} client={client} />
          ))}
        </div>
      </div>
    </div>
  );
}
