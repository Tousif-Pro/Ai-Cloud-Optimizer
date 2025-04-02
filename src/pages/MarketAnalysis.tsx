
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

// Sample market data
const marketSegmentData = [
  { name: "Enterprise", value: 45, growth: 12 },
  { name: "Mid-Market", value: 30, growth: 18 },
  { name: "SMB", value: 15, growth: 5 },
  { name: "Government", value: 10, growth: 3 },
];

const competitorData = [
  { name: "Q1", us: 25, competitor1: 30, competitor2: 20, competitor3: 15 },
  { name: "Q2", us: 30, competitor1: 28, competitor2: 22, competitor3: 17 },
  { name: "Q3", us: 35, competitor1: 27, competitor2: 24, competitor3: 18 },
  { name: "Q4", us: 40, competitor1: 25, competitor2: 26, competitor3: 20 },
];

const regionData = [
  { name: "North America", value: 45 },
  { name: "Europe", value: 30 },
  { name: "Asia Pacific", value: 15 },
  { name: "Rest of World", value: 10 },
];

export default function MarketAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Market Analysis
        </h1>
        <p className="text-muted-foreground">
          Comprehensive market intelligence to inform strategic decisions
        </p>
      </div>

      <Tabs defaultValue="segments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="segments">Market Segments</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="regions">Regional Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Segment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marketSegmentData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Market Share %" fill="#1a237e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-4">
            {marketSegmentData.map((segment) => (
              <Card key={segment.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{segment.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{segment.value}%</div>
                  <p className="text-xs text-green-500">↑ {segment.growth}% growth</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="competitors">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Landscape</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={competitorData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="us" stroke="#4a148c" strokeWidth={2} name="Our Company" />
                    <Line type="monotone" dataKey="competitor1" stroke="#1a237e" name="AI Tech Solutions" />
                    <Line type="monotone" dataKey="competitor2" stroke="#006064" name="DataMind Corp" />
                    <Line type="monotone" dataKey="competitor3" stroke="#0d47a1" name="Neural Systems" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regions">
          <Card>
            <CardHeader>
              <CardTitle>Regional Market Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={regionData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="value" name="Market Share %" fill="#006064" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
