

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  FolderOpen, 
  LayoutTemplate, 
  MessageSquare, 
  User,
  Zap,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: createPageUrl("Projects"),
    icon: FolderOpen,
  },
  {
    title: "Templates",
    url: createPageUrl("Templates"),
    icon: LayoutTemplate,
  },
  {
    title: "Collaboration",
    url: createPageUrl("Collaboration"),
    icon: MessageSquare,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        <style>{`
          :root {
            --primary: 268 93% 58%;
            --primary-foreground: 0 0% 100%;
            --secondary: 270 8% 96%;
            --secondary-foreground: 270 6% 25%;
            --accent: 268 80% 97%;
            --accent-foreground: 268 25% 18%;
            --muted: 270 8% 96%;
            --muted-foreground: 270 6% 45%;
          }
        `}</style>
        
        <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent">
                  Revri
                </h2>
                <p className="text-xs text-slate-500 font-medium">Vision to Reality</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`group hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 rounded-xl p-3 ${
                          location.pathname === item.url ? 
                          'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25' : 
                          'text-slate-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 font-medium">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                          {location.pathname === item.url && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
              <h3 className="text-sm font-semibold text-purple-900 mb-2">
                ✨ AI-Powered Planning
              </h3>
              <p className="text-xs text-purple-700 leading-relaxed">
                Transform product visions into developer-ready tickets with intelligent breakdown and estimation.
              </p>
            </div>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-100 p-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm truncate">Product Manager</p>
                <p className="text-xs text-slate-500 truncate">Transform visions to reality</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-purple-50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent">
                Revri
              </h1>
            </div>
          </header>

          {/* Main content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

