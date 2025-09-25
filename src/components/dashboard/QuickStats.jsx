import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function QuickStats({ title, value, icon: Icon, gradient, change }) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {change && (
              <div className="flex items-center mt-2 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-slate-600">{change}</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}