
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MetricChartProps {
  title: string;
  data: any[];
  dataKey: string;
  color?: string;
  className?: string;
  showGrid?: boolean;
  showAverage?: boolean;
  showGradient?: boolean;
  smooth?: boolean;
  tooltipPrefix?: string;
  tooltipSuffix?: string;
}

export function MetricChart({
  title,
  data,
  dataKey,
  color = "#9b87f5",
  className,
  showGrid = true,
  showAverage = false,
  showGradient = true,
  smooth = true,
  tooltipPrefix = "",
  tooltipSuffix = "",
}: MetricChartProps) {
  const isMobile = useIsMobile();
  
  // Calculate average if needed
  const average = showAverage
    ? data.reduce((sum, item) => sum + item[dataKey], 0) / data.length
    : null;
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {tooltipPrefix}{payload[0].value}{tooltipSuffix}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className={cn("dashboard-card overflow-hidden border-none shadow-lg", className)}>
      <CardHeader className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/30 dark:to-gray-800/30 pb-0">
        <CardTitle className="text-md font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className={`${isMobile ? "h-[180px]" : "h-[240px]"}`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: isMobile ? -20 : 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id={`colorGradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                </linearGradient>
                
                {/* Add a more premium gradient with multiple color stops */}
                <linearGradient id={`premiumGradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.9}/>
                  <stop offset="40%" stopColor={color} stopOpacity={0.6}/>
                  <stop offset="70%" stopColor={color} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              
              {showGrid && (
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  opacity={0.1} 
                  vertical={false}
                  stroke="#e5e7eb" 
                />
              )}
              
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
              
              {showAverage && average !== null && (
                <ReferenceLine 
                  y={average} 
                  stroke={color} 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: "AVG", 
                    position: "insideTopRight",
                    fill: color,
                    fontSize: 10
                  }} 
                />
              )}
              
              <Area
                type={smooth ? "monotone" : "linear"}
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                fill={showGradient ? `url(#premiumGradient-${title.replace(/\s+/g, '')})` : "none"}
                animationDuration={1500}
                animationEasing="ease-out"
                dot={{ stroke: color, strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ stroke: color, strokeWidth: 2, r: 6, fill: 'white' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
