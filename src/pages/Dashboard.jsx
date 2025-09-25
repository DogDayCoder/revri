import React, { useState, useEffect } from "react";
import { Project, Feature } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Target,
  Zap,
  Users,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import QuickStats from "../components/dashboard/QuickStats";
import RecentActivity from "../components/dashboard/RecentActivity";
import ProjectProgress from "../components/dashboard/ProjectProgress";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [projectsData, featuresData] = await Promise.all([
        Project.list('-updated_date', 10),
        Feature.list('-updated_date', 20)
      ]);
      setProjects(projectsData);
      setFeatures(featuresData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setIsLoading(false);
  };

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => !['exported', 'ready'].includes(p.status)).length,
    readyFeatures: features.filter(f => f.status === 'approved').length,
    totalFeatures: features.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-indigo-800 bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Transform your product visions into development reality
            </p>
          </div>
          <Link to={createPageUrl("Projects")}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 text-white font-semibold px-8"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickStats
            title="Total Projects"
            value={stats.totalProjects}
            icon={Target}
            gradient="from-blue-500 to-cyan-500"
            change="+2 this week"
          />
          <QuickStats
            title="In Progress"
            value={stats.activeProjects}
            icon={Clock}
            gradient="from-amber-500 to-orange-500"
            change="3 need attention"
          />
          <QuickStats
            title="Ready Features"
            value={stats.readyFeatures}
            icon={CheckCircle}
            gradient="from-green-500 to-emerald-500"
            change="+12 this week"
          />
          <QuickStats
            title="AI Breakdowns"
            value={projects.filter(p => p.ai_breakdown_generated).length}
            icon={Zap}
            gradient="from-purple-500 to-violet-500"
            change="Smart automation"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100 pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-slate-800">
                    Recent Projects
                  </CardTitle>
                  <Link to={createPageUrl("Projects")}>
                    <Button variant="outline" size="sm" className="font-medium">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">
                      No projects yet
                    </h3>
                    <p className="text-slate-500 mb-6">
                      Start your first product vision and watch it transform into reality
                    </p>
                    <Link to={createPageUrl("Projects")}>
                      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Project
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project) => (
                      <ProjectProgress key={project.id} project={project} features={features} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <RecentActivity features={features} isLoading={isLoading} />
            
            {/* AI Insights Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-purple-900 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-purple-800">
                      3 projects ready for breakdown
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-purple-800">
                      Average 2.3 days saved per project
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-purple-800">
                      95% ticket acceptance rate
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}