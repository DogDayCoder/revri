import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Target } from "lucide-react";

export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: 'medium',
    target_launch: '',
    stakeholders: [],
    goals: []
  });
  const [newStakeholder, setNewStakeholder] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      name: '',
      description: '',
      priority: 'medium',
      target_launch: '',
      stakeholders: [],
      goals: []
    });
  };

  const addStakeholder = () => {
    if (newStakeholder.trim() && !formData.stakeholders.includes(newStakeholder)) {
      setFormData(prev => ({
        ...prev,
        stakeholders: [...prev.stakeholders, newStakeholder]
      }));
      setNewStakeholder('');
    }
  };

  const removeStakeholder = (stakeholder) => {
    setFormData(prev => ({
      ...prev,
      stakeholders: prev.stakeholders.filter(s => s !== stakeholder)
    }));
  };

  const addGoal = () => {
    if (newGoal.trim() && !formData.goals.includes(newGoal)) {
      setFormData(prev => ({
        ...prev,
        goals: [...prev.goals, newGoal]
      }));
      setNewGoal('');
    }
  };

  const removeGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g !== goal)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            Create New Project Vision
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
              Project Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Mobile Banking App Redesign"
              required
              className="bg-slate-50 border-slate-200 focus:border-purple-300 focus:ring-purple-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
              Vision Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your product vision in detail. What problem are you solving? Who are your users? What's the core value proposition?"
              rows={4}
              required
              className="bg-slate-50 border-slate-200 focus:border-purple-300 focus:ring-purple-300 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Priority Level</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="critical">Critical Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_launch" className="text-sm font-semibold text-slate-700">
                Target Launch Date
              </Label>
              <Input
                id="target_launch"
                type="date"
                value={formData.target_launch}
                onChange={(e) => setFormData(prev => ({ ...prev, target_launch: e.target.value }))}
                className="bg-slate-50 border-slate-200 focus:border-purple-300 focus:ring-purple-300"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700">Stakeholders</Label>
            <div className="flex gap-2">
              <Input
                value={newStakeholder}
                onChange={(e) => setNewStakeholder(e.target.value)}
                placeholder="Enter stakeholder email"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStakeholder())}
                className="bg-slate-50 border-slate-200 focus:border-purple-300 focus:ring-purple-300"
              />
              <Button type="button" onClick={addStakeholder} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.stakeholders.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.stakeholders.map((stakeholder) => (
                  <Badge key={stakeholder} variant="secondary" className="bg-purple-100 text-purple-800 pr-1">
                    {stakeholder}
                    <button
                      type="button"
                      onClick={() => removeStakeholder(stakeholder)}
                      className="ml-2 hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700">Success Goals</Label>
            <div className="flex gap-2">
              <Input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="e.g., Increase user engagement by 30%"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                className="bg-slate-50 border-slate-200 focus:border-purple-300 focus:ring-purple-300"
              />
              <Button type="button" onClick={addGoal} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.goals.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.goals.map((goal) => (
                  <Badge key={goal} variant="secondary" className="bg-indigo-100 text-indigo-800 pr-1">
                    {goal}
                    <button
                      type="button"
                      onClick={() => removeGoal(goal)}
                      className="ml-2 hover:bg-indigo-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8"
            >
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}