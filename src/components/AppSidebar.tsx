
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
import { ChartBar, Database, Search, Users, Lightbulb, Cog } from "lucide-react";
import { Link } from "react-router-dom";

// Menu items for the sidebar
const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: ChartBar,
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
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-evolve-blue-500 via-evolve-purple-500 to-evolve-teal-500 flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <div className="font-bold text-xl text-sidebar-foreground">
            <span className="text-evolve-purple-500">Evolve</span>
            <span className="text-white">OptimAI</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-4">
        <div className="flex flex-col space-y-2">
          <div className="text-xs text-sidebar-foreground/70">
            Powered by AI • Version 1.0
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
