
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  ChartBar, 
  Database, 
  Search, 
  Users, 
  Lightbulb, 
  Cog, 
  Cloud, 
  Target, 
  Rocket, 
  Zap, 
  UserSquare, 
  BrainCircuit 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

// Menu items for the sidebar
const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: ChartBar,
  },
  {
    title: "Client CRM",
    path: "/client-crm",
    icon: UserSquare,
    highlight: true
  },
  {
    title: "Market Analysis",
    path: "/market-analysis",
    icon: Search,
  },
  {
    title: "Resource Allocation",
    path: "/resources",
    icon: Users,
  },
  {
    title: "Cloud Cost Optimizer",
    path: "/cloud-optimizer",
    icon: Cloud, 
  },
  {
    title: "Employee Development",
    path: "/employee-productivity",
    icon: Target,
  },
  {
    title: "Growth Engine",
    path: "/growth-engine",
    icon: Rocket,
  },
  {
    title: "Trend Predictions",
    path: "/trends",
    icon: Lightbulb,
  },
  {
    title: "Data Insights",
    path: "/insights",
    icon: Database,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Cog,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="h-8 w-8 rounded-full bg-gradient-to-br from-evolve-blue-500 via-evolve-purple-500 to-evolve-teal-500 flex items-center justify-center"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BrainCircuit className="h-4 w-4 text-white" />
          </motion.div>
          <div className="font-bold text-xl text-sidebar-foreground">
            <span className="text-evolve-purple-500">Evolve</span>
            <span className="text-white">OptimAI</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isMobile ? "sr-only" : ""}>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.path}
                    className={`${item.highlight ? "relative overflow-visible after:absolute after:-right-1 after:-top-1 after:h-2 after:w-2 after:rounded-full after:bg-green-500" : ""} ${isMobile ? "justify-center" : ""}`}
                  >
                    <Link to={item.path} className={`flex items-center gap-3 ${isMobile ? "p-2" : ""}`}>
                      <item.icon className={`${isMobile ? "h-5 w-5" : "h-5 w-5"}`} />
                      {!isMobile && <span>{item.title}</span>}
                      {!isMobile && item.highlight && <Zap className="h-3 w-3 text-green-500 absolute right-2" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className={`px-4 py-4 ${isMobile ? "text-center" : ""}`}>
        <div className="flex flex-col space-y-2">
          <div className="text-xs text-sidebar-foreground/70">
            {isMobile ? "v2.0" : "Powered by AI • Version 2.0"}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
