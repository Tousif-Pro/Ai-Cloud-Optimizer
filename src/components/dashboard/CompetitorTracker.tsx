
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronUp, ChevronDown, Trophy, Award, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Competitor = {
  name: string;
  value: number;
  color: string;
  growth: number;
  strength?: string;
  weakness?: string;
};

interface CompetitorTrackerProps {
  competitors?: Competitor[];
}

const defaultCompetitors: Competitor[] = [
  { 
    name: "Your Company", 
    value: 78, 
    color: "bg-blue-500", 
    growth: 12,
    strength: "AI-driven analytics platform",
    weakness: "Limited global presence"
  },
  { 
    name: "Competitor A", 
    value: 65, 
    color: "bg-purple-500", 
    growth: 8,
    strength: "Strong enterprise partnerships",
    weakness: "Outdated technology stack"
  },
  { 
    name: "Competitor B", 
    value: 49, 
    color: "bg-green-500", 
    growth: -3,
    strength: "Cost-effective solutions",
    weakness: "Poor customer support"
  },
  { 
    name: "Competitor C", 
    value: 42, 
    color: "bg-yellow-500", 
    growth: 5,
    strength: "Innovative R&D department",
    weakness: "Complex pricing structure"
  },
];

export function CompetitorTracker({ competitors = defaultCompetitors }: CompetitorTrackerProps) {
  const [expandedCompetitor, setExpandedCompetitor] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleExpand = (competitorName: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    if (expandedCompetitor === competitorName) {
      setExpandedCompetitor(null);
    } else {
      setExpandedCompetitor(competitorName);
    }
  };

  // Sort competitors by value (market share)
  const sortedCompetitors = [...competitors].sort((a, b) => b.value - a.value);
  
  // Determine rankings for visual indicators
  const rankings = sortedCompetitors.map((competitor, index) => {
    if (index === 0) return "leader";
    if (index === 1) return "challenger";
    if (index === sortedCompetitors.length - 1) return "laggard";
    return "competitor";
  });

  return (
    <Card className="overflow-hidden border-t-4 border-t-blue-500 h-full">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
          Competitor Analysis
        </CardTitle>
        <CardDescription>
          Market share and growth relative to competitors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {sortedCompetitors.map((competitor, index) => {
          const isExpanded = expandedCompetitor === competitor.name;
          const currentRanking = rankings[index];
          
          return (
            <div 
              key={competitor.name} 
              className={`space-y-1 transition-all duration-300 ${
                isExpanded ? "pb-4" : ""
              } ${
                competitor.name === "Your Company" ? "bg-blue-50/50 dark:bg-blue-950/10 p-2 rounded-lg shadow-sm" : ""
              }`}
            >
              <div 
                className="flex justify-between text-sm items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 p-1 rounded"
                onClick={() => toggleExpand(competitor.name)}
              >
                <div className="flex items-center space-x-2">
                  {index === 0 && (
                    <span className="text-yellow-500 inline-flex items-center">
                      <Trophy className="h-4 w-4" />
                    </span>
                  )}
                  {index === 1 && (
                    <span className="text-gray-500 inline-flex items-center">
                      <Award className="h-4 w-4" />
                    </span>
                  )}
                  <span className={competitor.name === "Your Company" ? "font-semibold" : ""}>
                    {competitor.name}
                  </span>
                  {currentRanking === "leader" && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">Leader</span>
                  )}
                  {currentRanking === "challenger" && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Challenger</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{competitor.value}%</span>
                  <motion.span 
                    className={`text-xs flex items-center ${competitor.growth > 0 ? 'text-green-500' : 'text-red-500'}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                  >
                    {competitor.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-0.5" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-0.5" />
                    )}
                    {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                  </motion.span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
              <div className="relative pt-1">
                <Progress 
                  value={competitor.value} 
                  className={`h-2 ${competitor.name === "Your Company" ? "bg-muted" : "bg-muted/50"}`}
                />
                <div 
                  className={`absolute top-0 h-2 rounded-full ${competitor.color} transition-all duration-500`} 
                  style={{ 
                    width: `${competitor.value}%`,
                    opacity: isExpanded ? "1" : "0.8",
                    transform: isExpanded ? "scaleY(1.2)" : "scaleY(1)",
                    transformOrigin: "center"
                  }}
                ></div>
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                        <div className="font-medium text-green-700 dark:text-green-400 mb-1">Strengths</div>
                        <div className="text-gray-700 dark:text-gray-300">{competitor.strength || "No data available"}</div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                        <div className="font-medium text-red-700 dark:text-red-400 mb-1">Weaknesses</div>
                        <div className="text-gray-700 dark:text-gray-300">{competitor.weakness || "No data available"}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
