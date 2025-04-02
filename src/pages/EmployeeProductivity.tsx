
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Award,
  BookOpen,
  Brain,
  Calendar,
  CheckSquare,
  LineChart,
  Lightbulb,
  Clock,
  Share2,
  PieChart,
  Target
} from "lucide-react";

interface Skill {
  id: number;
  name: string;
  level: number;
  category: "technical" | "soft" | "leadership";
}

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  completion: number;
  recommended: boolean;
}

interface Project {
  id: number;
  name: string;
  status: "active" | "completed" | "planned";
  team: string[];
  skills: string[];
  impact: number;
}

const EmployeeProductivity = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("development");

  // Sample data
  const skills: Skill[] = [
    { id: 1, name: "Machine Learning", level: 75, category: "technical" },
    { id: 2, name: "Data Analysis", level: 85, category: "technical" },
    { id: 3, name: "Python", level: 90, category: "technical" },
    { id: 4, name: "Communication", level: 80, category: "soft" },
    { id: 5, name: "Problem Solving", level: 85, category: "soft" },
    { id: 6, name: "Team Leadership", level: 70, category: "leadership" },
    { id: 7, name: "Strategic Planning", level: 65, category: "leadership" },
    { id: 8, name: "Cloud Architecture", level: 60, category: "technical" },
    { id: 9, name: "Project Management", level: 75, category: "leadership" },
  ];

  const courses: Course[] = [
    { id: 1, title: "Advanced Machine Learning Techniques", category: "AI Development", duration: "8 weeks", completion: 75, recommended: true },
    { id: 2, title: "Leadership in AI Organizations", category: "Leadership", duration: "4 weeks", completion: 30, recommended: true },
    { id: 3, title: "Cloud Platform Optimization", category: "Infrastructure", duration: "6 weeks", completion: 100, recommended: false },
    { id: 4, title: "Communication for Technical Experts", category: "Soft Skills", duration: "3 weeks", completion: 50, recommended: true },
    { id: 5, title: "Advanced NLP Implementation", category: "AI Development", duration: "10 weeks", completion: 0, recommended: true },
  ];

  const projects: Project[] = [
    { 
      id: 1, 
      name: "Customer Sentiment Analysis Engine", 
      status: "active", 
      team: ["Sarah Johnson", "Mike Zhang", "You"],
      skills: ["NLP", "Python", "Data Analysis"],
      impact: 85
    },
    { 
      id: 2, 
      name: "Internal Process Automation", 
      status: "completed", 
      team: ["David Lee", "Amanda Garcia", "You"],
      skills: ["Python", "Workflow Automation", "API Integration"],
      impact: 92
    },
    { 
      id: 3, 
      name: "Predictive Maintenance Model", 
      status: "planned", 
      team: ["You", "Raj Patel", "Emma Wilson"],
      skills: ["Machine Learning", "Time Series Analysis", "Cloud Architecture"],
      impact: 78
    },
  ];

  const teamMembers = [
    { name: "Sarah Johnson", role: "Senior Data Scientist", skills: ["Machine Learning", "Python", "Data Visualization"], alignment: 90 },
    { name: "Mike Zhang", role: "AI Engineer", skills: ["NLP", "TensorFlow", "Python"], alignment: 85 },
    { name: "David Lee", role: "DevOps Specialist", skills: ["Kubernetes", "Cloud Architecture", "CI/CD"], alignment: 75 },
    { name: "Amanda Garcia", role: "Product Manager", skills: ["Product Strategy", "Agile", "User Research"], alignment: 82 },
    { name: "Raj Patel", role: "ML Engineer", skills: ["Machine Learning", "Data Engineering", "Python"], alignment: 88 },
  ];

  const handleStartCourse = (courseId: number) => {
    toast({
      title: "Course Enrolled",
      description: "You've been enrolled in the course. Your manager has been notified.",
    });
  };

  const handleCompleteSkillAssessment = () => {
    toast({
      title: "Assessment Scheduled",
      description: "Your comprehensive skill assessment has been scheduled for next week.",
    });
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          <span className="bg-gradient-to-r from-evolve-blue-500 via-evolve-purple-500 to-evolve-teal-500 bg-clip-text text-transparent">
            Employee Development Hub
          </span>
        </h1>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleCompleteSkillAssessment} className="gap-2">
            <Target className="h-4 w-4" />
            Request Skill Assessment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="development" value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="development" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Development Plan
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-2">
            <CheckSquare className="h-4 w-4" />
            Project Assignments
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="h-4 w-4" />
            Team Alignment
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="development" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Skills & Competencies
                </CardTitle>
                <CardDescription>
                  Your current skills profile and growth areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Technical Skills</h3>
                    <div className="space-y-4">
                      {skills.filter(skill => skill.category === "technical").map(skill => (
                        <div key={skill.id} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">{skill.name}</span>
                            <span className="text-sm font-medium">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Soft Skills</h3>
                    <div className="space-y-4">
                      {skills.filter(skill => skill.category === "soft").map(skill => (
                        <div key={skill.id} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">{skill.name}</span>
                            <span className="text-sm font-medium">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Leadership Skills</h3>
                    <div className="space-y-4">
                      {skills.filter(skill => skill.category === "leadership").map(skill => (
                        <div key={skill.id} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">{skill.name}</span>
                            <span className="text-sm font-medium">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Growth Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized for your career path
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <h3 className="font-medium mb-2">Focus Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Cloud Architecture</Badge>
                      <Badge variant="outline">Strategic Planning</Badge>
                      <Badge variant="outline">Team Leadership</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-medium mb-2">Recommended Next Steps</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Brain className="h-4 w-4 mt-0.5" />
                        <span>Complete the "Leadership in AI Organizations" course</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Share2 className="h-4 w-4 mt-0.5" />
                        <span>Join the internal cloud architecture community</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 mt-0.5" />
                        <span>Request a mentor for strategic planning skills</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Learning & Development
              </CardTitle>
              <CardDescription>
                Courses and learning opportunities aligned with your career path
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{course.title}</h3>
                          {course.recommended && (
                            <Badge className="bg-green-500">Recommended</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>{course.category}</span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 flex-shrink-0">
                        {course.completion > 0 && (
                          <div className="w-full md:w-48">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{course.completion}%</span>
                            </div>
                            <Progress value={course.completion} className="h-2" />
                          </div>
                        )}
                        
                        {course.completion === 0 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full md:w-auto"
                            onClick={() => handleStartCourse(course.id)}
                          >
                            Start Course
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{project.name}</CardTitle>
                    <Badge 
                      className={`
                        ${project.status === 'active' ? 'bg-green-500' : 
                          project.status === 'completed' ? 'bg-blue-500' : 'bg-amber-500'}
                      `}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Team Members</div>
                    <div className="flex flex-wrap gap-1">
                      {project.team.map((member, i) => (
                        <Badge key={i} variant="outline">{member}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Core Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {project.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Business Impact</span>
                      <span className="font-medium">{project.impact}%</span>
                    </div>
                    <Progress value={project.impact} className="h-2" />
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    {project.status === 'active' ? 'View Details' : 
                     project.status === 'completed' ? 'View Results' : 'Join Project'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Composition
              </CardTitle>
              <CardDescription>
                Analyze your team and identify skill synergies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMembers.map((member, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      
                      <div className="space-y-2 w-full md:w-48">
                        <div className="flex justify-between text-xs">
                          <span>Skill Alignment</span>
                          <span>{member.alignment}%</span>
                        </div>
                        <Progress value={member.alignment} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Core Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill, j) => (
                          <Badge key={j} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">Interactive team performance visualization would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Team Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Weekly Sync</h3>
                      <span className="text-sm">Tomorrow, 10:00 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Team progress review and planning session</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Skills Workshop</h3>
                      <span className="text-sm">Friday, 2:00 PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Cloud Architecture best practices session</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Quarterly Review</h3>
                      <span className="text-sm">Next Monday, 9:00 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Department-wide review and strategy session</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeProductivity;
