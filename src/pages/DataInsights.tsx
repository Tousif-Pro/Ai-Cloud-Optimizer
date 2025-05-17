
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

// Sample data with premium colors
const productData = [
  { name: "AI Assistant", value: 85, color: "#9b87f5" },
  { name: "Data Platform", value: 72, color: "#7E69AB" },
  { name: "Analytics Suite", value: 78, color: "#6E59A5" },
  { name: "API Services", value: 63, color: "#0EA5E9" },
];

const customerSegmentData = [
  { name: "Tech", value: 35, color: "#9b87f5" },
  { name: "Finance", value: 25, color: "#7E69AB" },
  { name: "Healthcare", value: 20, color: "#0EA5E9" },
  { name: "Retail", value: 15, color: "#F97316" },
  { name: "Other", value: 5, color: "#aaadb0" },
];

const insights = [
  {
    id: 1,
    title: "Product-Market Fit Optimization",
    description: "Analytics suite shows strong retention in finance sector but underperforms in healthcare.",
    recommendation: "Develop healthcare-specific features focusing on compliance and patient data management.",
    category: "product",
    impact: "high",
  },
  {
    id: 2,
    title: "Customer Acquisition Efficiency",
    description: "Cost of acquisition is 32% higher for retail customers compared to tech customers.",
    recommendation: "Refine marketing messaging and channels for retail sector to improve conversion rates.",
    category: "marketing",
    impact: "medium",
  },
  {
    id: 3,
    title: "Revenue Expansion Opportunity",
    description: "Existing customers using AI Assistant show 28% higher likelihood to adopt Data Platform.",
    recommendation: "Create targeted cross-sell campaign highlighting integration benefits between products.",
    category: "sales",
    impact: "high",
  },
  {
    id: 4,
    title: "Support Resource Allocation",
    description: "Healthcare clients require 45% more support resources than other sectors.",
    recommendation: "Develop specialized training program for support staff handling healthcare clients.",
    category: "operations",
    impact: "medium",
  },
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label, valuePrefix, valueSuffix }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-100">
        <p className="font-semibold">{label || payload[0].name}</p>
        <p className="text-sm text-gray-700">
          {valuePrefix || ""}{payload[0].value}{valueSuffix || ""}
        </p>
      </div>
    );
  }
  return null;
};

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

export default function DataInsights() {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Data Insights
        </h1>
        <p className="text-muted-foreground">
          AI-powered analysis of your business data to uncover actionable insights
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden shadow-lg border-none">
          <CardHeader className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/30 dark:to-gray-800/30">
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Customer satisfaction score by product</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: isMobile ? -15 : 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    {productData.map((entry, index) => (
                      <linearGradient key={index} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={entry.color} stopOpacity={0.9}/>
                        <stop offset="95%" stopColor={entry.color} stopOpacity={0.6}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <Tooltip content={<CustomTooltip valueSuffix="%" />} />
                  <Bar 
                    dataKey="value" 
                    name="Satisfaction Score"
                    animationDuration={1500}
                    radius={[4, 4, 0, 0]}
                  >
                    {productData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#barGradient-${index})`} 
                        stroke={entry.color}
                        strokeWidth={1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-lg border-none">
          <CardHeader className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/30 dark:to-gray-800/30">
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Revenue distribution by industry</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={isMobile ? 70 : 100}
                    paddingAngle={4}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={200}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerSegmentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip valueSuffix="%" />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden shadow-lg border-none">
        <CardHeader className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/30 dark:to-gray-800/30">
          <CardTitle>AI-Generated Business Insights</CardTitle>
          <CardDescription>
            Actionable insights derived from your business data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {insights.map((insight, index) => (
              <motion.div 
                key={insight.id} 
                className="border-b pb-4 last:border-0 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="font-medium">{insight.title}</h3>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="capitalize">
                      {insight.category}
                    </Badge>
                    {getImpactBadge(insight.impact)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                <div className="bg-muted/30 p-2.5 rounded text-sm">
                  <span className="font-medium">Recommendation:</span> {insight.recommendation}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
