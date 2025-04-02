
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Sample data
const productData = [
  { name: "AI Assistant", value: 85, color: "#1a237e" },
  { name: "Data Platform", value: 72, color: "#4a148c" },
  { name: "Analytics Suite", value: 78, color: "#006064" },
  { name: "API Services", value: 63, color: "#0d47a1" },
];

const customerSegmentData = [
  { name: "Tech", value: 35, color: "#1a237e" },
  { name: "Finance", value: 25, color: "#4a148c" },
  { name: "Healthcare", value: 20, color: "#006064" },
  { name: "Retail", value: 15, color: "#0d47a1" },
  { name: "Other", value: 5, color: "#263238" },
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

export default function DataInsights() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Data Insights
        </h1>
        <p className="text-muted-foreground">
          AI-powered analysis of your business data to uncover actionable insights
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Customer satisfaction score by product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Satisfaction']} />
                  <Bar dataKey="value" name="Satisfaction Score">
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Revenue distribution by industry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Revenue Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Business Insights</CardTitle>
          <CardDescription>
            Actionable insights derived from your business data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {insights.map((insight) => (
              <div key={insight.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{insight.title}</h3>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="capitalize">
                      {insight.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={
                        insight.impact === "high" 
                          ? "bg-red-100 text-red-800 border-red-200" 
                          : insight.impact === "medium"
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {insight.impact} impact
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                <div className="bg-muted/30 p-2.5 rounded text-sm">
                  <span className="font-medium">Recommendation:</span> {insight.recommendation}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
