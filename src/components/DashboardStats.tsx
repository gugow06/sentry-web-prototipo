
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Chart from 'react-apexcharts';
import { 
  Users, 
  Home, 
  AlertTriangle, 
  TrendingUp,
  MapPin,
  Clock,
  Shield,
  Activity
} from 'lucide-react';

const stats = [
  {
    title: 'Abrigos Ativos',
    value: '12',
    change: '+2',
    changeType: 'increase',
    icon: Home,
    color: 'text-blue-600'
  },
  {
    title: 'Pessoas Abrigadas',
    value: '847',
    change: '+156',
    changeType: 'increase',
    icon: Users,
    color: 'text-green-600'
  },
  {
    title: 'Alertas Ativos',
    value: '3',
    change: '-1',
    changeType: 'decrease',
    icon: AlertTriangle,
    color: 'text-red-600'
  },
  {
    title: 'Capacidade Total',
    value: '2,450',
    change: '+300',
    changeType: 'increase',
    icon: TrendingUp,
    color: 'text-purple-600'
  }
];

const occupancyData = {
  series: [65],
  options: {
    chart: {
      type: 'radialBar' as const,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          value: {
            fontSize: '20px',
            fontWeight: 'bold',
          }
        }
      }
    },
    colors: ['#10B981'],
    labels: ['Ocupação Geral']
  }
};

const weeklyData = {
  series: [{
    name: 'Pessoas Abrigadas',
    data: [234, 456, 567, 678, 789, 845, 847]
  }],
  options: {
    chart: {
      type: 'area' as const,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as const
    },
    xaxis: {
      categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
    },
    colors: ['#3B82F6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    }
  }
};

const shelterStatusData = {
  series: [5, 4, 2, 1],
  options: {
    chart: {
      type: 'donut' as const,
    },
    labels: ['Disponível', 'Ocupação Média', 'Alta Ocupação', 'Lotado'],
    colors: ['#10B981', '#F59E0B', '#F97316', '#EF4444'],
    legend: {
      position: 'bottom' as const
    }
  }
};

const recentActivities = [
  {
    time: '15:30',
    action: 'Abrigo Central Vila Esperança atingiu 85% da capacidade',
    type: 'warning',
    icon: Home
  },
  {
    time: '15:15',
    action: 'Novo alerta de alagamento em Vila Esperança',
    type: 'alert',
    icon: AlertTriangle
  },
  {
    time: '14:45',
    action: '23 pessoas foram transferidas para Escola Santos Dumont',
    type: 'info',
    icon: Users
  },
  {
    time: '14:20',
    action: 'Igreja Nossa Senhora da Paz abriu suas portas',
    type: 'success',
    icon: Shield
  }
];

export function DashboardStats() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Dashboard SafeWay</h2>
          <p className="text-gray-600">Visão geral em tempo real do sistema de emergência</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Atualizado há 2 min</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <Badge 
                      className={`${
                        stat.changeType === 'increase' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Occupancy Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ocupação Geral</h3>
          <Chart
            options={occupancyData.options}
            series={occupancyData.series}
            type="radialBar"
            height={250}
          />
        </Card>

        {/* Weekly Trend */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tendência Semanal</h3>
          <Chart
            options={weeklyData.options}
            series={weeklyData.series}
            type="area"
            height={250}
          />
        </Card>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shelter Status Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status dos Abrigos</h3>
          <Chart
            options={shelterStatusData.options}
            series={shelterStatusData.series}
            type="donut"
            height={300}
          />
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              const getActivityColor = (type: string) => {
                switch (type) {
                  case 'warning': return 'text-yellow-600 bg-yellow-100';
                  case 'alert': return 'text-red-600 bg-red-100';
                  case 'success': return 'text-green-600 bg-green-100';
                  default: return 'text-blue-600 bg-blue-100';
                }
              };

              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.action}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Emergency Status */}
      <Card className="p-6 border-l-4 border-l-orange-500 bg-orange-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-orange-800">Status de Emergência Atual</h3>
            <p className="text-orange-700">Nível de Alerta: <strong>Médio</strong></p>
            <p className="text-sm text-orange-600 mt-1">
              Chuvas intensas previstas. 3 alertas ativos. Monitoramento contínuo ativado.
            </p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              ⚠️
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
