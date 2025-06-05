
import React from 'react';
import { 
  Sidebar as SidebarPrimitive, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { Map, Home, Shield, BarChart3, AlertTriangle } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const menuItems = [
  {
    id: 'map',
    title: 'Mapa Interativo',
    icon: Map,
    description: 'Visualizar abrigos e rotas seguras'
  },
  {
    id: 'shelters',
    title: 'Lista de Abrigos',
    icon: Home,
    description: 'Todos os abrigos disponíveis'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: BarChart3,
    description: 'Estatísticas e análises'
  }
];

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <SidebarPrimitive className="border-r">
      <div className="p-4 border-b">
        <SidebarTrigger />
      </div>
      
      <SidebarContent>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Navegação</h2>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton 
                  onClick={() => setActiveView(item.id)}
                  className={`w-full justify-start p-3 rounded-lg transition-all ${
                    activeView === item.id 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{item.title}</div>
                    <div className={`text-xs ${activeView === item.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        {/* Emergency Status */}
        <div className="p-4 border-t mt-auto">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-700">Status de Emergência</span>
            </div>
            <div className="text-xs text-red-600">
              <div className="flex justify-between">
                <span>Baixo Risco</span>
                <span className="font-medium">🟢</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </SidebarPrimitive>
  );
}
