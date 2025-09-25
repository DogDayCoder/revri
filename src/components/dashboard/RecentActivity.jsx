import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, MessageSquare } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  draft: "bg-amber-100 text-amber-800",
  review: "bg-blue-100 text-blue-800", 
  approved: "bg-green-100 text-green-800",
  exported: "bg-purple-100 text-purple-800"
};

export default function RecentActivity({ features, isLoading }) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl shadow-slate-200/50">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : features.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {features.slice(0, 5).map((feature) => (
              <div key={feature.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {feature.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${statusColors[feature.status]} border-0`}
                    >
                      {feature.status}
                    </Badge>
                    <span className="text-xs text-slate-500">
                      {format(new Date(feature.updated_date), 'MMM d')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}