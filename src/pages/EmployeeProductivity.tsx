
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Activity, Target, Award, Brain, Zap, Calendar, Check, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmployeeProductivity() {
  const { toast } = useToast();
  
  // Sample employee data
  const employees = [
    {
      name: "Alex Johnson",
      role: "AI Engineer",
      avatar: "/placeholder.svg",
      initials: "AJ",
      productivity: 87,
      skills: ["Machine Learning", "Python", "TensorFlow"],
      currentProject: "Customer Segmentation Algorithm",
      learningPath: "Advanced NLP Techniques",
      completionRate: 65
    },
    {
      name: "Sarah Chen",
      role: "Data Scientist",
      avatar: "/placeholder.svg",
      initials: "SC",
      productivity: 92,
      skills: ["Data Analysis", "R", "Statistics"],
      currentProject: "Predictive Analytics Dashboard",
      learningPath: "Deep Learning Specialization",
      completionRate: 78
    },
    {
      name: "Michael Rodriguez",
      role: "ML Engineer",
      avatar: "/placeholder.svg",
      initials: "MR",
      productivity: 79,
      skills: ["Computer Vision", "PyTorch", "AWS"],
      currentProject: "Real-time Object Detection",
      learningPath: "MLOps Certification",
      completionRate: 45
    }
  ];
  
  const learningResources = [
    {
      title: "Advanced Neural Networks",
      level: "Expert",
      duration: "8 weeks",
      relevance: "High",
      skills: ["Deep Learning", "PyTorch", "Computer Vision"]
    },
    {
      title: "Business Intelligence Fundamentals",
      level: "Intermediate",
      duration: "4 weeks",
      relevance: "Medium",
      skills: ["Data Visualization", "SQL", "Business Analytics"]
    },
    {
      title: "MLOps & Deployment Pipelines",
      level: "Advanced",
      duration: "6 weeks",
      relevance: "Very High",
      skills: ["CI/CD", "Docker", "Kubernetes", "Model Serving"]
    },
    {
      title: "AI Ethics & Responsible Development",
      level: "All Levels",
      duration: "3 weeks",
      relevance: "High",
      skills: ["Ethics", "Bias Detection", "Governance"]
    }
  ];

  const recommendTraining = (employeeName: string) => {
    toast({
      title: "AI Recommendation Sent",
      description: `Personalized training plan has been sent to ${employeeName} based on skills gap analysis.`,
    });
  };

  const assignProject = (employeeName: string) => {
    toast({
      title: "Project Assignment",
      description: `${employeeName} has been assigned to the optimal project based on their skills and availability.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text inline-block mb-2">
          Employee Development Hub
        </h1>
        <p className="text-muted-foreground">
          AI-powered tools to optimize talent development and maximize team productivity
        </p>
      </div>

      <Tabs defaultValue="productivity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="productivity">Productivity Analytics</TabsTrigger>
          <TabsTrigger value="learning">Learning & Development</TabsTrigger>
          <TabsTrigger value="skills">Skills Matrix</TabsTrigger>
        </TabsList>
        
        <TabsContent value="productivity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Team Productivity Dashboard
              </CardTitle>
              <CardDescription>
                AI-driven insights on team performance and optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {employees.map((employee) => (
                  <div key={employee.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>{employee.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{employee.productivity}%</span>
                          <Badge variant={employee.productivity > 85 ? "default" : "outline"}>
                            {employee.productivity > 85 ? "High Performer" : "Developing"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Current Focus: {employee.currentProject}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Productivity Score</span>
                        <span>{employee.productivity}%</span>
                      </div>
                      <Progress value={employee.productivity} className="h-2" />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => recommendTraining(employee.name)}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Recommend Training
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => assignProject(employee.name)}
                      >
                        <Target className="h-4 w-4 mr-1" />
                        Optimize Assignment
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Learning Hub
              </CardTitle>
              <CardDescription>
                Personalized learning paths and skill development recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {employees.map((employee) => (
                  <Card key={employee.name} className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>{employee.initials}</AvatarFallback>
                          </Avatar>
                          <CardTitle className="text-base">{employee.name}</CardTitle>
                        </div>
                      </div>
                      <CardDescription>{employee.role}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium mb-1">Recommended Path: {employee.learningPath}</div>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{employee.completionRate}%</span>
                          </div>
                          <Progress value={employee.completionRate} className="h-1.5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-1">Core Skills</div>
                          <div className="flex flex-wrap gap-1">
                            {employee.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule Development Session
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">AI-Recommended Learning Resources</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {learningResources.map((resource, index) => (
                    <Card key={index} className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <CardDescription className="flex justify-between">
                          <span>Level: {resource.level}</span>
                          <span>{resource.duration}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <Badge className="bg-accent">{resource.relevance} Relevance</Badge>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">Key Skills</div>
                            <div className="flex flex-wrap gap-1">
                              {resource.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" size="sm">
                          <Award className="h-4 w-4 mr-1" />
                          Assign to Team Members
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Team Skills Matrix
              </CardTitle>
              <CardDescription>
                Visualize team capabilities and identify skill gaps for strategic development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted text-sm">
                    <tr>
                      <th className="text-left p-3 font-medium">Employee</th>
                      <th className="text-left p-3 font-medium">Machine Learning</th>
                      <th className="text-left p-3 font-medium">Data Analysis</th>
                      <th className="text-left p-3 font-medium">Software Engineering</th>
                      <th className="text-left p-3 font-medium">Cloud Services</th>
                      <th className="text-left p-3 font-medium">Business Strategy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {employees.map((employee) => (
                      <tr key={employee.name}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={employee.avatar} alt={employee.name} />
                              <AvatarFallback>{employee.initials}</AvatarFallback>
                            </Avatar>
                            <span>{employee.name}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={employee.name === "Alex Johnson" || employee.name === "Michael Rodriguez" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                            {employee.name === "Alex Johnson" || employee.name === "Michael Rodriguez" ? "Expert" : "Intermediate"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={employee.name === "Sarah Chen" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                            {employee.name === "Sarah Chen" ? "Expert" : "Intermediate"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={employee.name === "Michael Rodriguez" ? "bg-green-100 text-green-800" : employee.name === "Alex Johnson" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}>
                            {employee.name === "Michael Rodriguez" ? "Expert" : employee.name === "Alex Johnson" ? "Intermediate" : "Beginner"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={employee.name === "Michael Rodriguez" ? "bg-green-100 text-green-800" : employee.name === "Sarah Chen" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}>
                            {employee.name === "Michael Rodriguez" ? "Expert" : employee.name === "Sarah Chen" ? "Intermediate" : "Beginner"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={employee.name === "Sarah Chen" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}>
                            {employee.name === "Sarah Chen" ? "Intermediate" : "Beginner"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Card className="border-2 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Team Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Machine Learning & AI</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Data Analysis & Visualization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Python & TensorFlow</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Development Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-amber-500" />
                        <span>Business Strategy & Communication</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-amber-500" />
                        <span>Cloud Architecture</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-amber-500" />
                        <span>Product Management</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Recommended Hiring</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-blue-500" />
                        <span>DevOps Specialist</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-blue-500" />
                        <span>Product Manager with AI focus</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-blue-500" />
                        <span>UI/UX Designer for AI tools</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
