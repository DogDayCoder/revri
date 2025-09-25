import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Target } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  planning: "bg-amber-100 text-amber-800",
  breakdown: "bg-blue-100 text-blue-800",
  review: "bg-purple-100 text-purple-800",
  ready: "bg-green-100 text-green-800",
  exported: "bg-slate-100 text-slate-800"
};

export default function ProjectProgress({ project, features }) {
  const projectFeatures = features.filter(f => f.project_id === project.id);
  const completedFeatures = projectFeatures.filter(f => f.status === 'approved' || f.status === 'exported').length;
  const progressPercentage = projectFeatures.length > 0 ? (completedFeatures / projectFeatures.length) * 100 : 0;

  return (
    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:border-slate-200 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 mb-1">{project.name}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
        </div>
        <Badge className={`ml-3 ${statusColors[project.status]} border-0 font-medium`}>
          {project.status}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            <span>{projectFeatures.length} features</span>
          </div>
          {project.target_launch && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Due {format(new Date(project.target_launch), 'MMM d')}</span>
            </div>
          )}
          {project.stakeholders && project.stakeholders.length > 0 && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{project.stakeholders.length} stakeholders</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Progress</span>
            <span className="font-medium text-slate-700">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-1.5 bg-slate-100"
          />
        </div>
      </div>
    </div>
  );
}