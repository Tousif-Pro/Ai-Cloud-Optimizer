
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

// Sample resource data
const teamMembers = [
  { 
    name: "Alex Johnson", 
    role: "AI Engineer", 
    allocation: 85, 
    projects: ["Product Enhancement", "R&D Innovation"],
    availability: "High"
  },
  { 
    name: "Sarah Chen", 
    role: "Data Scientist", 
    allocation: 95, 
    projects: ["Market Analysis", "Client Project A"],
    availability: "Low"
  },
  { 
    name: "Michael Rodriguez", 
    role: "ML Engineer", 
    allocation: 75, 
    projects: ["Infrastructure", "Client Project B"],
    availability: "Medium"
  },
  { 
    name: "Emily Patel", 
    role: "Product Manager", 
    allocation: 90, 
    projects: ["Product Roadmap", "Client Relations"],
    availability: "Low"
  },
  { 
    name: "David Kim", 
    role: "UX Designer", 
    allocation: 80, 
    projects: ["UI Enhancement", "User Testing"],
    availability: "Medium"
  },
];

const computeResources = [
  { 
    name: "Training Cluster", 
    usage: 78, 
    priority: "High", 
    cost: "$4,500/month" 
  },
  { 
    name: "Inference Services", 
    usage: 65, 
    priority: "Critical", 
    cost: "$3,200/month" 
  },
  { 
    name: "Development Environment", 
    usage: 45, 
    priority: "Medium", 
    cost: "$1,800/month" 
  },
  { 
    name: "Data Processing Pipeline", 
    usage: 82, 
    priority: "High", 
    cost: "$2,500/month" 
  },
];

// Helper function to render availability badge with appropriate color
function getAvailabilityBadge(availability: string) {
  switch (availability) {
    case "High":
      return <Badge className="bg-green-100 text-green-800 border-green-200">High</Badge>;
    case "Medium":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Medium</Badge>;
    case "Low":
      return <Badge className="bg-red-100 text-red-800 border-red-200">Low</Badge>;
    default:
      return <Badge>{availability}</Badge>;
  }
}

// Helper function to render priority badge with appropriate color
function getPriorityBadge(priority: string) {
  switch (priority) {
    case "Critical":
      return <Badge variant="destructive">Critical</Badge>;
    case "High":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200">High</Badge>;
    case "Medium":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Medium</Badge>;
    case "Low":
      return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
    default:
      return <Badge>{priority}</Badge>;
  }
}

export default function ResourceAllocation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Resource Allocation
        </h1>
        <p className="text-muted-foreground">
          Optimize your team and computational resources for maximum productivity
        </p>
      </div>

      <Tabs defaultValue="team" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team">Team Resources</TabsTrigger>
          <TabsTrigger value="compute">Compute Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-semibold">Team Allocation</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMembers.map((member) => (
                  <div key={member.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Availability:</span>
                        {getAvailabilityBadge(member.availability)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Resource Allocation: {member.allocation}%</span>
                      <span>
                        {member.projects.join(", ")}
                      </span>
                    </div>
                    
                    <Progress 
                      value={member.allocation} 
                      className="h-2" 
                      indicatorClassName={member.allocation > 90 ? "bg-red-500" : member.allocation > 75 ? "bg-amber-500" : "bg-green-500"}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compute">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Compute Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {computeResources.map((resource) => (
                  <div key={resource.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{resource.name}</h3>
                        <p className="text-sm text-muted-foreground">Cost: {resource.cost}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Priority:</span>
                        {getPriorityBadge(resource.priority)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Usage: {resource.usage}%</span>
                    </div>
                    
                    <Progress 
                      value={resource.usage} 
                      className="h-2" 
                      indicatorClassName={resource.usage > 80 ? "bg-red-500" : resource.usage > 60 ? "bg-amber-500" : "bg-green-500"}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
