
import React, { useState, useEffect } from "react";
import { Template } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  LayoutTemplate as TemplateIcon, 
  Star, 
  Download,
  Users,
  CreditCard,
  Shield,
  BarChart,
  MessageCircle,
  Search as SearchIcon,
  Heart,
  Settings
} from "lucide-react";

const categoryIcons = {
  onboarding: Users,
  payments: CreditCard,
  admin: Settings,
  auth: Shield,
  dashboard: BarChart,
  messaging: MessageCircle,
  search: SearchIcon,
  social: Heart
};

const categoryColors = {
  onboarding: "bg-blue-100 text-blue-800",
  payments: "bg-green-100 text-green-800", 
  admin: "bg-purple-100 text-purple-800",
  auth: "bg-red-100 text-red-800",
  dashboard: "bg-orange-100 text-orange-800",
  messaging: "bg-pink-100 text-pink-800",
  search: "bg-yellow-100 text-yellow-800",
  social: "bg-rose-100 text-rose-800"
};

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setIsLoading(true);
    const data = await Template.list('-usage_count');
    setTemplates(data);
    setIsLoading(false);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(templates.map(t => t.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-indigo-800 bg-clip-text text-transparent mb-2">
            Template Library
          </h1>
          <p className="text-slate-600 text-lg">
            Pre-built patterns for common product features
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/70 border-slate-200 focus:border-purple-300 focus:ring-purple-300"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600" 
                  : "hover:bg-purple-50 hover:border-purple-300"
                }
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
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
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TemplateIcon className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              {searchTerm || selectedCategory !== "all" ? 'No templates found' : 'Coming Soon'}
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              {searchTerm || selectedCategory !== "all"
                ? 'Try adjusting your search or filter criteria.'
                : 'Our template library is being prepared with common product patterns to accelerate your planning process.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const CategoryIcon = categoryIcons[template.category] || TemplateIcon;
              return (
                <Card 
                  key={template.id} 
                  className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${categoryColors[template.category]} bg-opacity-20`}>
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                            {template.name}
                          </CardTitle>
                          <Badge 
                            className={`${categoryColors[template.category]} border-0 text-xs mt-1`}
                          >
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Download className="w-3 h-3" />
                        <span>{template.usage_count || 0}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {template.description}
                    </p>

                    <div className="space-y-3">
                      <div className="text-xs text-slate-500">
                        <span className="font-medium">{template.features?.length || 0} features included</span>
                      </div>
                      
                      {template.tags && template.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="outline" 
                              className="text-xs border-slate-200 text-slate-600"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {template.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                              +{template.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <Button 
                        variant="outline" 
                        className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 font-medium group-hover:bg-purple-600 group-hover:text-white transition-all"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
