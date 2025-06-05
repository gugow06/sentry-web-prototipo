
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  MapPin, 
  Users, 
  Droplets, 
  Utensils, 
  Heart, 
  Zap,
  Navigation,
  Filter
} from 'lucide-react';

const shelters = [
  {
    id: 1,
    name: 'Abrigo Central Vila Esperança',
    address: 'Rua das Flores, 123 - Vila Esperança',
    distance: '1.2 km',
    capacity: 200,
    occupied: 85,
    status: 'open',
    resources: { water: 'good', food: 'medium', medical: 'good', power: 'good' },
    lastUpdate: '5 min'
  },
  {
    id: 2,
    name: 'Escola Municipal Santos Dumont',
    address: 'Av. Educação, 456 - Centro',
    distance: '2.8 km',
    capacity: 150,
    occupied: 130,
    status: 'nearly_full',
    resources: { water: 'good', food: 'low', medical: 'medium', power: 'good' },
    lastUpdate: '2 min'
  },
  {
    id: 3,
    name: 'Centro Comunitário São José',
    address: 'Praça da Comunidade, 789 - São José',
    distance: '3.5 km',
    capacity: 100,
    occupied: 100,
    status: 'full',
    resources: { water: 'medium', food: 'low', medical: 'low', power: 'medium' },
    lastUpdate: '1 min'
  },
  {
    id: 4,
    name: 'Igreja Nossa Senhora da Paz',
    address: 'Rua da Igreja, 321 - Jardim Paz',
    distance: '4.1 km',
    capacity: 80,
    occupied: 25,
    status: 'open',
    resources: { water: 'good', food: 'good', medical: 'medium', power: 'good' },
    lastUpdate: '3 min'
  },
  {
    id: 5,
    name: 'Ginásio Municipal Esportes',
    address: 'Av. dos Esportes, 654 - Vila Olímpica',
    distance: '5.2 km',
    capacity: 300,
    occupied: 180,
    status: 'open',
    resources: { water: 'good', food: 'good', medical: 'good', power: 'good' },
    lastUpdate: '7 min'
  }
];

interface ShelterListProps {
  selectedShelter: any;
  setSelectedShelter: (shelter: any) => void;
}

const getStatusColor = (occupied: number, capacity: number) => {
  const percentage = (occupied / capacity) * 100;
  if (percentage <= 50) return 'bg-green-500';
  if (percentage <= 75) return 'bg-yellow-500';
  if (percentage <= 90) return 'bg-orange-500';
  return 'bg-red-500';
};

const getStatusText = (occupied: number, capacity: number) => {
  const percentage = (occupied / capacity) * 100;
  if (percentage <= 50) return 'Disponível';
  if (percentage <= 75) return 'Ocupação Média';
  if (percentage <= 90) return 'Alta Ocupação';
  return 'Lotado';
};

const getResourceIcon = (resource: string) => {
  switch (resource) {
    case 'water': return <Droplets className="w-4 h-4" />;
    case 'food': return <Utensils className="w-4 h-4" />;
    case 'medical': return <Heart className="w-4 h-4" />;
    case 'power': return <Zap className="w-4 h-4" />;
    default: return null;
  }
};

const getResourceColor = (level: string) => {
  switch (level) {
    case 'good': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export function ShelterList({ selectedShelter, setSelectedShelter }: ShelterListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredShelters = shelters.filter(shelter => {
    const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelter.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'available') {
      return matchesSearch && (shelter.occupied / shelter.capacity) < 0.9;
    }
    
    return matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lista de Abrigos</h2>
          <p className="text-gray-600">
            {filteredShelters.length} abrigos encontrados
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar por nome ou endereço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={filterStatus === 'available' ? 'default' : 'outline'}
          onClick={() => setFilterStatus(filterStatus === 'available' ? 'all' : 'available')}
        >
          <Filter className="w-4 h-4 mr-2" />
          Apenas Disponíveis
        </Button>
      </div>

      {/* Shelter Cards */}
      <div className="grid gap-4">
        {filteredShelters.map((shelter) => {
          const percentage = (shelter.occupied / shelter.capacity) * 100;
          const statusColor = getStatusColor(shelter.occupied, shelter.capacity);
          const statusText = getStatusText(shelter.occupied, shelter.capacity);

          return (
            <Card 
              key={shelter.id} 
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedShelter?.id === shelter.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => setSelectedShelter(shelter)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{shelter.name}</h3>
                    <Badge className={`${statusColor} text-white`}>
                      {statusText}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {shelter.address}
                  </div>
                  <div className="text-sm text-gray-500">
                    📍 {shelter.distance} • Atualizado há {shelter.lastUpdate}
                  </div>
                </div>
              </div>

              {/* Occupancy */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">Ocupação</span>
                  </div>
                  <span className="text-sm font-medium">
                    {shelter.occupied}/{shelter.capacity} pessoas
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">
                  {percentage.toFixed(1)}% ocupado
                </div>
              </div>

              {/* Resources */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recursos Disponíveis</h4>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(shelter.resources).map(([resource, level]) => (
                    <div key={resource} className="text-center">
                      <div className={`flex justify-center mb-1 ${getResourceColor(level)}`}>
                        {getResourceIcon(resource)}
                      </div>
                      <div className={`text-xs font-medium ${getResourceColor(level)}`}>
                        {level === 'good' ? 'Bom' : level === 'medium' ? 'Médio' : 'Baixo'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  disabled={percentage >= 100}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Traçar Rota Segura
                </Button>
                <Button variant="outline" size="sm">
                  Mais Info
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
