
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Competitor = {
  name: string;
  value: number;
  color: string;
  growth: number;
};

const competitors: Competitor[] = [
  { name: "Your Company", value: 78, color: "bg-blue-500", growth: 12 },
  { name: "Competitor A", value: 65, color: "bg-purple-500", growth: 8 },
  { name: "Competitor B", value: 49, color: "bg-green-500", growth: -3 },
  { name: "Competitor C", value: 42, color: "bg-yellow-500", growth: 5 },
];

export function CompetitorTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitor Analysis</CardTitle>
        <CardDescription>
          Market share and growth relative to competitors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {competitors.map((competitor) => (
          <div key={competitor.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{competitor.name}</span>
              <div className="flex items-center gap-2">
                <span>{competitor.value}%</span>
                <span className={`text-xs ${competitor.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                </span>
              </div>
            </div>
            <Progress 
              value={competitor.value} 
              className={competitor.name === "Your Company" ? "h-2 bg-muted" : "h-2 bg-muted/50"} 
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
