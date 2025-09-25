import React, { useState, useEffect } from "react";
import { Project, Feature } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Zap, Target, Calendar, Users, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

import CreateProjectModal from "../components/projects/CreateProjectModal";
import ProjectCard from "../components/projects/ProjectCard";
import AIBreakdownModal from "../components/projects/AIBreakdownModal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await Project.list('-updated_date');
    setProjects(data);
    setIsLoading(false);
  };

  const handleCreateProject = async (projectData) => {
    const project = await Project.create(projectData);
    setProjects(prev => [project, ...prev]);
    setShowCreateModal(false);
  };

  const handleAIBreakdown = async (project) => {
    setSelectedProject(project);
    setShowAIModal(true);
    setIsGenerating(true);

    try {
      const response = await InvokeLLM({
        prompt: `As a product management expert, break down this product vision into detailed user stories and features.

Product Vision: ${project.name}
Description: ${project.description}
Goals: ${project.goals?.join(', ') || 'Not specified'}

Please create 5-8 detailed features with:
1. Clear user story format
2. Comprehensive acceptance criteria
3. Technical considerations for developers
4. Realistic story point estimates (xs, s, m, l, xl)
5. Priority levels

Focus on creating actionable, developer-ready specifications.`,
        response_json_schema: {
          type: "object",
          properties: {
            features: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  user_story: { type: "string" },
                  acceptance_criteria: {
                    type: "array",
                    items: { type: "string" }
                  },
                  technical_considerations: {
                    type: "array",
                    items: { type: "string" }
                  },
                  priority: {
                    type: "string",
                    enum: ["low", "medium", "high", "critical"]
                  },
                  estimation: {
                    type: "string",
                    enum: ["xs", "s", "m", "l", "xl"]
                  }
                }
              }
            }
          }
        }
      });

      // Create features in database
      for (const featureData of response.features) {
        await Feature.create({
          ...featureData,
          project_id: project.id,
          status: 'draft'
        });
      }

      // Update project as having AI breakdown generated
      await Project.update(project.id, { ai_breakdown_generated: true });
      
      setProjects(prev => 
        prev.map(p => 
          p.id === project.id ? { ...p, ai_breakdown_generated: true } : p
        )
      );

    } catch (error) {
      console.error('Error generating AI breakdown:', error);
    }

    setIsGenerating(false);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-indigo-800 bg-clip-text text-transparent mb-2">
              Product Visions
            </h1>
            <p className="text-slate-600 text-lg">
              Transform your ideas into development-ready backlogs
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 font-semibold px-8"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/70 border-slate-200 focus:border-purple-300 focus:ring-purple-300"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-white/70">
                <CardHeader>
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-slate-100 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              {searchTerm ? 'No projects found' : 'Start Your First Vision'}
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? `No projects match "${searchTerm}". Try a different search term.`
                : 'Transform your product ideas into actionable development plans with AI-powered breakdown and smart collaboration.'
              }
            </p>
            {!searchTerm && (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onAIBreakdown={handleAIBreakdown}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modals */}
        <CreateProjectModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateProject}
        />

        <AIBreakdownModal 
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          project={selectedProject}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}