
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MainMap } from '@/components/MainMap';
import { ShelterList } from '@/components/ShelterList';
import { AlertsPanel } from '@/components/AlertsPanel';
import { DashboardStats } from '@/components/DashboardStats';
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [activeView, setActiveView] = useState('map');
  const [selectedShelter, setSelectedShelter] = useState(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-green-50">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🚨</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  SafeWay
                </h1>
                <span className="text-sm text-gray-500 hidden md:block">
                  Sistema Inteligente de Prevenção de Desastres
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 flex">
            {activeView === 'map' && (
              <div className="flex-1 flex">
                <div className="flex-1">
                  <MainMap selectedShelter={selectedShelter} setSelectedShelter={setSelectedShelter} />
                </div>
                <div className="w-80 bg-white shadow-lg border-l">
                  <AlertsPanel />
                </div>
              </div>
            )}
            
            {activeView === 'shelters' && (
              <div className="flex-1">
                <ShelterList selectedShelter={selectedShelter} setSelectedShelter={setSelectedShelter} />
              </div>
            )}
            
            {activeView === 'dashboard' && (
              <div className="flex-1 p-6">
                <DashboardStats />
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
