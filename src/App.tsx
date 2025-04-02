
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import MarketAnalysis from "@/pages/MarketAnalysis";
import ResourceAllocation from "@/pages/ResourceAllocation";
import TrendPredictions from "@/pages/TrendPredictions";
import DataInsights from "@/pages/DataInsights";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import CloudCostOptimizer from "@/pages/CloudCostOptimizer";
import EmployeeProductivity from "@/pages/EmployeeProductivity";
import GrowthEngine from "@/pages/GrowthEngine";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/market-analysis" element={<MarketAnalysis />} />
            <Route path="/resources" element={<ResourceAllocation />} />
            <Route path="/trends" element={<TrendPredictions />} />
            <Route path="/insights" element={<DataInsights />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/cloud-optimizer" element={<CloudCostOptimizer />} />
            <Route path="/employee-productivity" element={<EmployeeProductivity />} />
            <Route path="/growth-engine" element={<GrowthEngine />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
