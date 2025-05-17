
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample market data with premium colors
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

// Custom tooltip for better visualization
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-100">
        <p className="font-semibold">{label || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MarketAnalysis() {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Market Analysis
        </h1>
        <p className="text-muted-foreground">
          Comprehensive market intelligence to inform strategic decisions
        </p>
      </div>

      <Tabs defaultValue="segments" className="space-y-4">
        <TabsList className="w-full overflow-x-auto flex-nowrap no-scrollbar">
          <TabsTrigger value="segments">Market Segments</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="regions">Regional Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="segments" className="space-y-4">
          <Card className="overflow-hidden shadow-lg border-none">
            <CardHeader className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/30 dark:to-gray-800/30">
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
                      left: isMobile ? -15 : 20,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.6}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      width={30}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      name="Market Share %" 
                      fill="url(#barGradient)" 
                      radius={[4, 4, 0, 0]} 
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {marketSegmentData.map((segment) => (
              <Card key={segment.name} className="overflow-hidden shadow-sm">
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
          <Card className="overflow-hidden shadow-lg border-none">
            <CardHeader className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/30 dark:to-gray-800/30">
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
                      left: isMobile ? -15 : 20,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="usGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#7E69AB" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={true} vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      width={30}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} />
                    <Line 
                      type="monotone" 
                      dataKey="us" 
                      stroke="url(#usGradient)" 
                      strokeWidth={3} 
                      name="Our Company"
                      dot={{ stroke: '#9b87f5', strokeWidth: 2, r: 4, fill: 'white' }}
                      activeDot={{ r: 6, fill: '#9b87f5' }}
                      animationDuration={1500}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="competitor1" 
                      stroke="#7E69AB" 
                      name="AI Tech Solutions"
                      strokeDasharray="5 5"
                      dot={{ stroke: '#7E69AB', strokeWidth: 2, r: 4, fill: 'white' }}
                      animationDuration={1500}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="competitor2" 
                      stroke="#0EA5E9" 
                      name="DataMind Corp" 
                      strokeDasharray="3 3"
                      dot={{ stroke: '#0EA5E9', strokeWidth: 2, r: 4, fill: 'white' }}
                      animationDuration={1500}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="competitor3" 
                      stroke="#F97316" 
                      name="Neural Systems" 
                      strokeDasharray="1 1"
                      dot={{ stroke: '#F97316', strokeWidth: 2, r: 4, fill: 'white' }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regions">
          <Card className="overflow-hidden shadow-lg border-none">
            <CardHeader className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/30 dark:to-gray-800/30">
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
                      left: isMobile ? 60 : 80,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="horizontalBarGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.6}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={true} vertical={false} />
                    <XAxis 
                      type="number"
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      width={isMobile ? 60 : 80}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      name="Market Share %" 
                      fill="url(#horizontalBarGradient)" 
                      radius={[0, 4, 4, 0]} 
                      animationDuration={1500}
                    />
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
