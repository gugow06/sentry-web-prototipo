
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
  },
  {
    id: 'admin',
    title: 'Administração',
    icon: Shield,
    description: 'Painel administrativo'
  }
];

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <SidebarPrimitive className="border-r bg-white">
      <div className="p-4 border-b bg-white">
        <SidebarTrigger className="text-gray-600 hover:text-gray-800" />
      </div>
      
      <SidebarContent className="bg-white">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Navegação</h2>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton 
                  onClick={() => setActiveView(item.id)}
                  className={`w-full justify-start p-3 rounded-lg transition-all mb-2 ${
                    activeView === item.id 
                      ? 'bg-slate-800 text-white shadow-lg hover:bg-slate-700' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item.title}</div>
                    <div className={`text-xs truncate ${
                      activeView === item.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        {/* Emergency Status */}
        <div className="p-4 border-t mt-auto bg-white">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm font-medium text-red-700">Status de Emergência</span>
            </div>
            <div className="text-xs text-red-600">
              <div className="flex justify-between items-center">
                <span className="truncate">Baixo Risco</span>
                <span className="font-medium flex-shrink-0">🟢</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </SidebarPrimitive>
  );
}
