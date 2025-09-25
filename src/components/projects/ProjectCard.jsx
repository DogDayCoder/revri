import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Target, 
  Zap, 
  ArrowRight,
  CheckCircle 
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const statusColors = {
  planning: "bg-amber-100 text-amber-800 border-amber-200",
  breakdown: "bg-blue-100 text-blue-800 border-blue-200",
  review: "bg-purple-100 text-purple-800 border-purple-200",
  ready: "bg-green-100 text-green-800 border-green-200",
  exported: "bg-slate-100 text-slate-800 border-slate-200"
};

const priorityColors = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800"
};

export default function ProjectCard({ project, onAIBreakdown }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-slate-800 mb-2 leading-tight">
                {project.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge className={`${statusColors[project.status]} border text-xs font-medium`}>
                  {project.status}
                </Badge>
                <Badge className={`${priorityColors[project.priority]} border-0 text-xs font-medium`}>
                  {project.priority}
                </Badge>
              </div>
            </div>
            {project.ai_breakdown_generated && (
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-purple-600" />
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="space-y-2 mb-6">
            {project.target_launch && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-3 h-3" />
                <span>Target: {format(new Date(project.target_launch), 'MMM d, yyyy')}</span>
              </div>
            )}
            {project.stakeholders && project.stakeholders.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Users className="w-3 h-3" />
                <span>{project.stakeholders.length} stakeholders</span>
              </div>
            )}
            {project.goals && project.goals.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Target className="w-3 h-3" />
                <span>{project.goals.length} success metrics</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {!project.ai_breakdown_generated ? (
              <Button 
                onClick={() => onAIBreakdown(project)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium shadow-lg shadow-purple-500/25"
                size="sm"
              >
                <Zap className="w-4 h-4 mr-2" />
                Generate AI Breakdown
              </Button>
            ) : (
              <Button 
                variant="outline"
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 font-medium"
                size="sm"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                View Features
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}