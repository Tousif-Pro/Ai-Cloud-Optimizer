
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, Target, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Sample AI-generated insights
const insights = [
  {
    id: 1,
    type: "opportunity",
    title: "Cross-selling opportunity detected",
    description: "5 enterprise clients are using less than 40% of available features. Targeted education could increase usage and retention.",
    icon: TrendingUp,
    iconColor: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    id: 2,
    type: "action",
    title: "Retention risk identified",
    description: "GreenPath Logistics shows decreasing feature usage over the last 30 days. Recommend scheduling a check-in call this week.",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    id: 3,
    type: "recommendation",
    title: "Market differentiation strategy",
    description: "Your AI-driven reporting features are receiving 68% more engagement than competitors. Consider highlighting this in upcoming campaigns.",
    icon: Target,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: 4,
    type: "achievement",
    title: "Performance milestone reached",
    description: "Customer onboarding time has decreased by 24% this quarter. This exceeds your quarterly goal of 15%.",
    icon: CheckCircle2,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

export function AIInsightPanel() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <Card className="border-t-4 border-blue-500 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2 py-8">
            <motion.div
              className="h-10 w-10 text-blue-500"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <BrainCircuit className="h-10 w-10" />
            </motion.div>
            <div className="text-lg font-medium">Analyzing your business data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-t-4 border-indigo-500 overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BrainCircuit className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-xl font-semibold">AI-Generated Strategic Insights</h3>
          </div>
          <div className="text-xs text-muted-foreground">Updated: Just now</div>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2"
        >
          {insights.map((insight) => (
            <motion.div 
              key={insight.id} 
              variants={item}
              className={`p-4 rounded-lg ${insight.bgColor}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-white dark:bg-gray-800 ${insight.iconColor}`}>
                  <insight.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{insight.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
