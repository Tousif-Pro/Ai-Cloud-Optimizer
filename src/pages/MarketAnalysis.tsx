
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Area, AreaChart, PieChart, Pie, Cell
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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

const pieColors = ["#22c55e", "#16a34a", "#15803d", "#166534"];

// Custom tooltip for better visualization
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-gray-100">{label || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between mt-2">
            <p className="text-sm mr-4" style={{ color: entry.color }}>
              {entry.name}:
            </p>
            <p className="text-sm font-medium">
              {entry.value}%
            </p>
          </div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden shadow-lg border-none">
              <CardHeader className="bg-gradient-to-r from-green-50/50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/30">
                <CardTitle>Market Segment Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
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
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0.6}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 11, fill: '#888' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: '#888' }}
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
          </motion.div>
          
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {marketSegmentData.map((segment, index) => (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card key={segment.name} className="overflow-hidden shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{segment.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{segment.value}%</div>
                    <p className="text-xs text-green-500">↑ {segment.growth}% growth</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="competitors">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden shadow-lg border-none">
              <CardHeader className="bg-gradient-to-r from-green-50/50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/30">
                <CardTitle>Competitive Landscape</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={competitorData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: isMobile ? -15 : 20,
                        bottom: 5,
                      }}
                    >
                      <defs>
                        <linearGradient id="usGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="comp1Gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="comp2Gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#15803d" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#15803d" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="comp3Gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#166534" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#166534" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={true} vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 11, fill: '#888' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: '#888' }}
                        tickLine={false}
                        axisLine={false}
                        width={30}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" height={36} />
                      <Area 
                        type="monotone" 
                        dataKey="us" 
                        stroke="#22c55e" 
                        strokeWidth={3} 
                        fill="url(#usGradient)"
                        name="Our Company"
                        activeDot={{ r: 6, fill: '#22c55e' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="competitor1" 
                        stroke="#16a34a" 
                        strokeWidth={2}
                        fill="url(#comp1Gradient)"
                        name="AI Tech Solutions"
                        activeDot={{ r: 5, fill: '#16a34a' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="competitor2" 
                        stroke="#15803d"
                        strokeWidth={2} 
                        fill="url(#comp2Gradient)"
                        name="DataMind Corp"
                        activeDot={{ r: 5, fill: '#15803d' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="competitor3" 
                        stroke="#166534" 
                        strokeWidth={2}
                        fill="url(#comp3Gradient)"
                        name="Neural Systems"
                        activeDot={{ r: 5, fill: '#166534' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="regions">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden shadow-lg border-none">
              <CardHeader className="bg-gradient-to-r from-green-50/50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/30">
                <CardTitle>Regional Market Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-2 gap-6 items-center">
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
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#16a34a" stopOpacity={0.9}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={true} vertical={false} />
                        <XAxis 
                          type="number"
                          tick={{ fontSize: 11, fill: '#888' }}
                          tickLine={false}
                          axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                        />
                        <YAxis 
                          type="category" 
                          dataKey="name"
                          tick={{ fontSize: 11, fill: '#888' }}
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

                  <div className="h-[300px] hidden lg:block">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={regionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {regionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-4">
            {regionData.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden shadow-sm border-none">
                  <div className="h-2" style={{ backgroundColor: pieColors[index % pieColors.length] }}></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{region.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{region.value}%</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
