
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface Trend {
  id: number;
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  tags: string[];
}

interface TrendInsightProps {
  trends: Trend[];
}

export function TrendInsight({ trends }: TrendInsightProps) {
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-semibold">Emerging Trends</CardTitle>
        <Lightbulb className="h-5 w-5 text-evolve-purple-500" />
      </CardHeader>
      <CardContent className="space-y-4">
        {trends.map((trend) => (
          <div key={trend.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-medium text-sm">{trend.title}</h4>
              <Badge
                variant="outline"
                className={
                  trend.impact === "high"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : trend.impact === "medium"
                    ? "bg-amber-100 text-amber-800 border-amber-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }
              >
                {trend.impact} impact
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{trend.description}</p>
            <div className="flex items-center text-xs">
              <span className="mr-2 text-muted-foreground">Confidence:</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-evolve-blue-500"
                  style={{ width: `${trend.confidence}%` }}
                />
              </div>
              <span className="ml-2 text-muted-foreground">{trend.confidence}%</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {trend.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
