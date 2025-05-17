
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface TrendCardProps {
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  tags: string[];
}

export const TrendCard: React.FC<TrendCardProps> = ({
  title,
  description,
  confidence,
  impact,
  tags
}) => {
  // Get impact badge color
  const getImpactColor = () => {
    switch (impact) {
      case 'high':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'medium':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-green-50 text-green-800 border-green-200';
      default:
        return '';
    }
  };

  // Get progress color
  const getConfidenceColor = () => {
    if (confidence >= 90) return 'bg-green-600';
    if (confidence >= 75) return 'bg-blue-600';
    if (confidence >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-none bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            <Badge variant="outline" className={getImpactColor()}>
              {impact} impact
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">Confidence:</span>
              <span className="text-xs font-medium">{confidence}%</span>
            </div>
            <Progress value={confidence} className={getConfidenceColor()} />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
