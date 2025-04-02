
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-grid-pattern">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="container mx-auto">
            <div className="flex items-center mb-6">
              <SidebarTrigger className="lg:hidden mr-4" />
              <div className="flex-1" />
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
