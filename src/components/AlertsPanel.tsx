
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  CloudRain, 
  Flame, 
  Mountain, 
  Wind,
  Clock,
  MapPin,
  Bell
} from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'flood',
    severity: 'high',
    title: 'Risco de Alagamento',
    location: 'Vila Esperança e arredores',
    time: '15:30',
    description: 'Chuvas intensas previstas para as próximas 2 horas. Risco alto de alagamento em ruas baixas.',
    icon: CloudRain,
    color: 'bg-red-500'
  },
  {
    id: 2,
    type: 'landslide',
    severity: 'medium',
    title: 'Alerta de Deslizamento',
    location: 'Região da Serra Verde',
    time: '14:45',
    description: 'Solo saturado após chuvas contínuas. Monitoramento ativo em encostas.',
    icon: Mountain,
    color: 'bg-orange-500'
  },
  {
    id: 3,
    type: 'wind',
    severity: 'low',
    title: 'Ventos Fortes',
    location: 'Centro da cidade',
    time: '13:20',
    description: 'Rajadas de vento até 70 km/h. Atenção a galhos e estruturas temporárias.',
    icon: Wind,
    color: 'bg-yellow-500'
  }
];

const riskAreas = [
  {
    name: 'Rua das Palmeiras',
    risk: 'Alagamento',
    level: 'Alto',
    color: 'text-red-600'
  },
  {
    name: 'Av. Beira Rio',
    risk: 'Alagamento',
    level: 'Alto',
    color: 'text-red-600'
  },
  {
    name: 'Ladeira do Morro',
    risk: 'Deslizamento',
    level: 'Médio',
    color: 'text-orange-600'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function AlertsPanel() {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Alertas Ativos</h2>
          <Badge className="bg-red-100 text-red-800">
            {alerts.length} alertas
          </Badge>
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {alerts.map((alert) => {
          const IconComponent = alert.icon;
          return (
            <Card key={alert.id} className="p-4 border-l-4 border-l-red-500">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${alert.color} text-white`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity === 'high' ? 'Alto' : 
                       alert.severity === 'medium' ? 'Médio' : 'Baixo'}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {alert.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="w-3 h-3 mr-1" />
                    {alert.time}
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    {alert.description}
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Bell className="w-3 h-3 mr-2" />
                    Configurar Notificação
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Risk Areas */}
      <div className="border-t bg-white">
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Áreas de Risco</h3>
          <div className="space-y-2">
            {riskAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="font-medium text-sm text-gray-800">{area.name}</div>
                  <div className="text-xs text-gray-600">{area.risk}</div>
                </div>
                <Badge className={`${area.color} bg-transparent border`}>
                  {area.level}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="border-t bg-gradient-to-r from-red-500 to-orange-500 text-white p-4">
        <div className="text-center">
          <h3 className="font-semibold mb-2">Emergência?</h3>
          <Button className="bg-white text-red-600 hover:bg-gray-100 w-full">
            🚨 Ligar 190/193
          </Button>
        </div>
      </div>
    </div>
  );
}
