
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface ResourceData {
  name: string;
  value: number;
  color: string;
}

interface ResourceAllocationProps {
  data: ResourceData[];
}

export function ResourceAllocation({ data }: ResourceAllocationProps) {
  const isMobile = useIsMobile();
  
  // Custom tooltip component for better styling
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-100 text-sm">
          <p className="font-medium text-gray-900">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend that renders more attractively
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-xs">
        {payload.map((entry: any, index: number) => (
          <motion.li 
            key={`item-${index}`}
            className="flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className="w-3 h-3 rounded-sm mr-1.5" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.value}</span>
          </motion.li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="dashboard-card overflow-hidden border-none shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/30 dark:to-gray-800/30">
        <CardTitle className="text-md font-semibold">Resource Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${isMobile ? "h-[180px]" : "h-[220px]"} mt-2`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 40 : 60}
                outerRadius={isMobile ? 60 : 80}
                paddingAngle={4}
                dataKey="value"
                animationDuration={1200}
                animationBegin={200}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                content={<CustomLegend />}
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
