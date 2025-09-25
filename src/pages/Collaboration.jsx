import React, { useState, useEffect } from "react";
import { Project, Comment, User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  User as UserIcon
} from "lucide-react";
import { format } from "date-fns";

export default function Collaboration() {
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [projectsData, commentsData, userData] = await Promise.all([
        Project.list('-updated_date'),
        Comment.list('-created_date'),
        User.me().catch(() => null)
      ]);
      setProjects(projectsData);
      setComments(commentsData);
      setCurrentUser(userData);
      if (projectsData.length > 0) {
        setSelectedProject(projectsData[0]);
      }
    } catch (error) {
      console.error('Error loading collaboration data:', error);
    }
    setIsLoading(false);
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedProject) return;

    const comment = await Comment.create({
      project_id: selectedProject.id,
      content: newComment.trim(),
      type: 'comment'
    });

    setComments(prev => [comment, ...prev]);
    setNewComment("");
  };

  const projectComments = comments.filter(c => 
    selectedProject ? c.project_id === selectedProject.id : false
  );

  const getCommentTypeIcon = (type) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'change_request':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-indigo-800 bg-clip-text text-transparent mb-2">
            Collaboration Hub
          </h1>
          <p className="text-slate-600 text-lg">
            Real-time discussions and feedback on your product visions
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Project List */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="space-y-2 p-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : projects.length === 0 ? (
                  <div className="p-6 text-center">
                    <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No projects to discuss yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`w-full text-left p-4 hover:bg-purple-50 transition-colors ${
                          selectedProject?.id === project.id ? 'bg-purple-50 border-r-2 border-purple-500' : ''
                        }`}
                      >
                        <h3 className="font-semibold text-slate-800 text-sm mb-1 truncate">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{comments.filter(c => c.project_id === project.id).length} comments</span>
                          <span>•</span>
                          <span>{project.stakeholders?.length || 0} stakeholders</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Discussion Area */}
          <div className="lg:col-span-3">
            {selectedProject ? (
              <div className="space-y-6">
                {/* Project Overview */}
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-800 mb-2">
                          {selectedProject.name}
                        </CardTitle>
                        <p className="text-slate-600 text-sm">
                          {selectedProject.description}
                        </p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 border-0">
                        {selectedProject.status}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>

                {/* Add Comment */}
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800">
                      Add Comment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts, feedback, or questions about this project..."
                        rows={3}
                        className="bg-slate-50 border-slate-200 focus:border-purple-300 focus:ring-purple-300 resize-none"
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments Thread */}
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Discussion ({projectComments.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {projectComments.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">
                          Start the conversation
                        </h3>
                        <p className="text-slate-500">
                          Be the first to comment on this project and get the discussion going.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {projectComments.map((comment) => (
                          <div key={comment.id} className="flex gap-3 p-4 bg-slate-50 rounded-xl">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <UserIcon className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-slate-800 text-sm">
                                  {comment.created_by}
                                </span>
                                {getCommentTypeIcon(comment.type)}
                                <span className="text-xs text-slate-500">
                                  {format(new Date(comment.created_date), 'MMM d, yyyy at h:mm a')}
                                </span>
                              </div>
                              <p className="text-slate-700 text-sm leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-12 h-12 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  Select a Project
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Choose a project from the sidebar to start collaborating with your team and stakeholders.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}