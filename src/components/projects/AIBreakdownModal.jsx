import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, CheckCircle, Brain } from "lucide-react";

export default function AIBreakdownModal({ isOpen, onClose, project, isGenerating }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Breakdown
          </DialogTitle>
        </DialogHeader>

        <div className="py-8 text-center">
          {isGenerating ? (
            <>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Analyzing Your Vision
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our AI is breaking down "{project?.name}" into actionable user stories, 
                acceptance criteria, and technical specifications...
              </p>
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Identifying core features</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <span>Creating user stories</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span>Estimating complexity</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Breakdown Complete!
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Your project has been successfully broken down into detailed features 
                and user stories ready for development.
              </p>
              <Button 
                onClick={onClose}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8"
              >
                View Features
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}