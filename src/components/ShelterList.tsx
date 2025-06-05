
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Users, 
  Droplets, 
  Utensils, 
  Heart, 
  Zap,
  Filter
} from 'lucide-react';

interface Shelter {
  id: number;
  name: string;
  address: string;
  distance: number;
  occupancy: number;
  status: 'open' | 'full' | 'closed';
  capacity: number;
  resources: {
    water: boolean;
    food: boolean;
    medical: boolean;
    power: boolean;
  };
  lastUpdate: string;
}

interface ShelterListProps {
  selectedShelter: any;
  setSelectedShelter: (shelter: any) => void;
}

const sheltersData: Shelter[] = [
  {
    id: 1,
    name: 'Abrigo Central',
    address: 'Rua das Flores, 123 - Centro',
    distance: 0.8,
    occupancy: 45,
    status: 'open',
    capacity: 200,
    resources: { water: true, food: true, medical: true, power: true },
    lastUpdate: '15:30'
  },
  {
    id: 2,
    name: 'Escola Municipal São José',
    address: 'Av. Principal, 456 - Vila Esperança',
    distance: 1.2,
    occupancy: 78,
    status: 'open',
    capacity: 150,
    resources: { water: true, food: false, medical: true, power: true },
    lastUpdate: '15:25'
  },
  {
    id: 3,
    name: 'Centro Comunitário Norte',
    address: 'Rua do Norte, 789 - Bairro Alto',
    distance: 2.1,
    occupancy: 92,
    status: 'full',
    capacity: 100,
    resources: { water: true, food: true, medical: false, power: false },
    lastUpdate: '15:20'
  },
  {
    id: 4,
    name: 'Ginásio Municipal',
    address: 'Av. dos Esportes, 321 - Centro',
    distance: 1.5,
    occupancy: 23,
    status: 'open',
    capacity: 300,
    resources: { water: true, food: true, medical: true, power: true },
    lastUpdate: '15:28'
  },
  {
    id: 5,
    name: 'Igreja São Pedro',
    address: 'Rua da Igreja, 654 - Vila Nova',
    distance: 3.2,
    occupancy: 67,
    status: 'open',
    capacity: 80,
    resources: { water: false, food: true, medical: false, power: true },
    lastUpdate: '15:15'
  }
];

const getOccupancyColor = (occupancy: number) => {
  if (occupancy <= 50) return 'bg-green-100 text-green-800 border-green-200';
  if (occupancy <= 75) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (occupancy <= 90) return 'bg-orange-100 text-orange-800 border-orange-200';
  return 'bg-red-100 text-red-800 border-red-200';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-green-500';
    case 'full': return 'bg-red-500';
    case 'closed': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'open': return 'Aberto';
    case 'full': return 'Lotado';
    case 'closed': return 'Fechado';
    default: return 'Desconhecido';
  }
};

export function ShelterList({ selectedShelter, setSelectedShelter }: ShelterListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'occupancy' | 'capacity'>('distance');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const filteredAndSortedShelters = useMemo(() => {
    let filtered = sheltersData.filter(shelter =>
      shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shelter.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showOnlyAvailable) {
      filtered = filtered.filter(shelter => shelter.status === 'open' && shelter.occupancy < 90);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'occupancy':
          return a.occupancy - b.occupancy;
        case 'capacity':
          return b.capacity - a.capacity;
        default:
          return 0;
      }
    });
  }, [searchTerm, sortBy, showOnlyAvailable]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Lista de Abrigos</h2>
          <Badge className="bg-blue-100 text-blue-800">
            {filteredAndSortedShelters.length} abrigos
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nome ou endereço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="distance">Ordenar por distância</option>
              <option value="occupancy">Ordenar por ocupação</option>
              <option value="capacity">Ordenar por capacidade</option>
            </select>
          </div>
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showOnlyAvailable}
              onChange={(e) => setShowOnlyAvailable(e.target.checked)}
              className="rounded"
            />
            <span>Apenas disponíveis</span>
          </label>
        </div>
      </div>

      {/* Shelters List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredAndSortedShelters.map((shelter) => (
          <Card
            key={shelter.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedShelter?.id === shelter.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedShelter(shelter)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{shelter.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {shelter.address}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {shelter.distance} km de distância
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(shelter.status)}`}></div>
                <Badge className={getOccupancyColor(shelter.occupancy)}>
                  {shelter.occupancy}% ocupado
                </Badge>
              </div>
            </div>

            {/* Status and Capacity */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{shelter.capacity - Math.floor(shelter.capacity * shelter.occupancy / 100)} vagas</span>
                </div>
                <span className="text-gray-500">Status: {getStatusText(shelter.status)}</span>
              </div>
              <span className="text-xs text-gray-400">Atualizado às {shelter.lastUpdate}</span>
            </div>

            {/* Resources */}
            <div className="mb-4">
              <span className="text-sm text-gray-600 block mb-2">Recursos disponíveis:</span>
              <div className="flex space-x-3">
                <div className={`flex items-center space-x-1 ${shelter.resources.water ? 'text-green-600' : 'text-red-600'}`}>
                  <Droplets className="w-4 h-4" />
                  <span className="text-xs">Água</span>
                </div>
                <div className={`flex items-center space-x-1 ${shelter.resources.food ? 'text-green-600' : 'text-red-600'}`}>
                  <Utensils className="w-4 h-4" />
                  <span className="text-xs">Alimentos</span>
                </div>
                <div className={`flex items-center space-x-1 ${shelter.resources.medical ? 'text-green-600' : 'text-red-600'}`}>
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">Médico</span>
                </div>
                <div className={`flex items-center space-x-1 ${shelter.resources.power ? 'text-green-600' : 'text-red-600'}`}>
                  <Zap className="w-4 h-4" />
                  <span className="text-xs">Energia</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600"
              disabled={shelter.status === 'closed'}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Ir para este abrigo
            </Button>
          </Card>
        ))}

        {filteredAndSortedShelters.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">Nenhum abrigo encontrado</div>
            <div className="text-sm text-gray-400">Tente ajustar os filtros de busca</div>
          </div>
        )}
      </div>
    </div>
  );
}
