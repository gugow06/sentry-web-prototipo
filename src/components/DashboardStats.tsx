
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Home, 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Activity,
  MapPin,
  Clock
} from 'lucide-react';

const stats = [
  {
    title: 'Abrigos Ativos',
    value: '12',
    change: '+2',
    changeType: 'positive',
    icon: Home,
    description: 'Abrigos operacionais'
  },
  {
    title: 'Pessoas Abrigadas',
    value: '847',
    change: '+156',
    changeType: 'positive',
    icon: Users,
    description: 'Total de pessoas em abrigos'
  },
  {
    title: 'Alertas Ativos',
    value: '3',
    change: '-1',
    changeType: 'negative',
    icon: AlertTriangle,
    description: 'Alertas de emergência'
  },
  {
    title: 'Áreas de Risco',
    value: '7',
    change: '0',
    changeType: 'neutral',
    icon: Shield,
    description: 'Regiões monitoradas'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'alert',
    message: 'Novo alerta de alagamento na Vila Esperança',
    time: '15:30',
    severity: 'high'
  },
  {
    id: 2,
    type: 'shelter',
    message: 'Abrigo Central atingiu 80% da capacidade',
    time: '15:15',
    severity: 'medium'
  },
  {
    id: 3,
    type: 'update',
    message: 'Status do Ginásio Municipal atualizado',
    time: '14:45',
    severity: 'low'
  },
  {
    id: 4,
    type: 'alert',
    message: 'Alerta de deslizamento cancelado na Serra Verde',
    time: '14:20',
    severity: 'low'
  }
];

const occupancyData = [
  { name: 'Abrigo Central', occupancy: 45, capacity: 200, status: 'open' },
  { name: 'Escola Municipal', occupancy: 78, capacity: 150, status: 'open' },
  { name: 'Centro Comunitário', occupancy: 92, capacity: 100, status: 'full' },
  { name: 'Ginásio Municipal', occupancy: 23, capacity: 300, status: 'open' },
  { name: 'Igreja São Pedro', occupancy: 67, capacity: 80, status: 'open' }
];

const getOccupancyColor = (occupancy: number) => {
  if (occupancy <= 50) return 'bg-green-500';
  if (occupancy <= 75) return 'bg-yellow-500';
  if (occupancy <= 90) return 'bg-orange-500';
  return 'bg-red-500';
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-orange-100 text-orange-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function DashboardStats() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema de emergência</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Sistema Online</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      stat.changeType === 'positive'
                        ? 'bg-green-100 text-green-800'
                        : stat.changeType === 'negative'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {stat.change}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ocupação dos Abrigos</h3>
          <div className="space-y-4">
            {occupancyData.map((shelter, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{shelter.name}</span>
                  <span className="text-sm text-gray-600">{shelter.occupancy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getOccupancyColor(shelter.occupancy)}`}
                    style={{ width: `${shelter.occupancy}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{Math.floor((shelter.occupancy / 100) * shelter.capacity)} / {shelter.capacity} pessoas</span>
                  <Badge className={shelter.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {shelter.status === 'open' ? 'Aberto' : 'Lotado'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Atividades Recentes</h3>
            <Activity className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'alert' ? (
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                  ) : activity.type === 'shelter' ? (
                    <Home className="w-4 h-4 text-blue-500 mt-0.5" />
                  ) : (
                    <Activity className="w-4 h-4 text-green-500 mt-0.5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                    <Badge className={getSeverityColor(activity.severity)}>
                      {activity.severity === 'high' ? 'Alto' : 
                       activity.severity === 'medium' ? 'Médio' : 'Baixo'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Risk Map Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo das Áreas de Risco</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-red-800">Alto Risco</h4>
                <p className="text-sm text-red-600">2 áreas</p>
              </div>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-2 text-xs text-red-700">
              Vila Esperança, Rua das Palmeiras
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-orange-800">Médio Risco</h4>
                <p className="text-sm text-orange-600">3 áreas</p>
              </div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-2 text-xs text-orange-700">
              Serra Verde, Bairro Alto, Centro
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-yellow-800">Baixo Risco</h4>
                <p className="text-sm text-yellow-600">2 áreas</p>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-2 text-xs text-yellow-700">
              Vila Nova, Jardim Florido
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
