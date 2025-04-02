
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Competitor {
  name: string;
  marketShare: number;
  growth: number;
  color: string;
}

interface CompetitorTrackerProps {
  competitors: Competitor[];
}

export function CompetitorTracker({ competitors }: CompetitorTrackerProps) {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-md font-semibold">Competitor Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {competitors.map((competitor) => (
            <div key={competitor.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{competitor.name}</span>
                <span className="text-sm">{competitor.marketShare}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress 
                  value={competitor.marketShare} 
                  className="h-2" 
                  indicatorClassName={`bg-[${competitor.color}]`}
                />
                <span
                  className={`text-xs ${
                    competitor.growth > 0
                      ? "text-green-500"
                      : competitor.growth < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {competitor.growth > 0 ? "+" : ""}
                  {competitor.growth}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
