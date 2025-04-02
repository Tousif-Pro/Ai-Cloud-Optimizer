
import { StatCard } from "@/components/dashboard/StatCard";
import { MetricChart } from "@/components/dashboard/MetricChart";
import { CompetitorTracker } from "@/components/dashboard/CompetitorTracker";
import { ResourceAllocation } from "@/components/dashboard/ResourceAllocation";
import { TrendInsight } from "@/components/dashboard/TrendInsight";
import { ChartBar, Users, Database, Search, Calendar } from "lucide-react";

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

const competitors = [
  { name: "AI Tech Solutions", marketShare: 35, growth: 5, color: "#1a237e" },
  { name: "DataMind Corp", marketShare: 28, growth: -2, color: "#4a148c" },
  { name: "Neural Systems", marketShare: 19, growth: 3, color: "#006064" },
  { name: "IntelliProcess AI", marketShare: 12, growth: 8, color: "#0d47a1" },
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

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Business Evolution Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time analytics and insights to drive your AI company forward
        </p>
      </div>

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
    </div>
  );
}
