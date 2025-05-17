
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
import ClientCRM from "@/pages/ClientCRM";
import Contact from "@/pages/Contact";
import { ClientActionProvider } from "@/components/client/ClientActionContext";

// Configure React Query with better defaults for mobile
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider delayDuration={300}>
        <ClientActionProvider>
          <AppLayout>
            <div className="max-w-[1920px] mx-auto">
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
                <Route path="/client-crm" element={<ClientCRM />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AppLayout>
          <Toaster />
          <Sonner closeButton position="top-right" expand={false} />
        </ClientActionProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
