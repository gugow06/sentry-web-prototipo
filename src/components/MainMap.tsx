
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';

interface Shelter {
  id: number;
  name: string;
  lat: number;
  lng: number;
  occupancy: number;
  status: 'open' | 'full' | 'closed';
  capacity: number;
  resources: {
    water: boolean;
    food: boolean;
    medical: boolean;
    power: boolean;
  };
}

interface MainMapProps {
  selectedShelter: any;
  setSelectedShelter: (shelter: any) => void;
}

const shelters: Shelter[] = [
  {
    id: 1,
    name: 'Abrigo Central',
    lat: -23.5505,
    lng: -46.6333,
    occupancy: 45,
    status: 'open',
    capacity: 200,
    resources: { water: true, food: true, medical: true, power: true }
  },
  {
    id: 2,
    name: 'Escola Municipal',
    lat: -23.5489,
    lng: -46.6388,
    occupancy: 78,
    status: 'open',
    capacity: 150,
    resources: { water: true, food: false, medical: true, power: true }
  },
  {
    id: 3,
    name: 'Centro Comunitário',
    lat: -23.5556,
    lng: -46.6396,
    occupancy: 92,
    status: 'full',
    capacity: 100,
    resources: { water: true, food: true, medical: false, power: false }
  }
];

const getOccupancyColor = (occupancy: number) => {
  if (occupancy <= 50) return 'bg-green-500';
  if (occupancy <= 75) return 'bg-yellow-500';
  if (occupancy <= 90) return 'bg-orange-500';
  return 'bg-red-500';
};

export function MainMap({ selectedShelter, setSelectedShelter }: MainMapProps) {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Simular localização do usuário na região central de São Paulo
    setUserLocation({ lat: -23.5489, lng: -46.6388 });
  }, []);

  const calculateRoute = (shelter: Shelter) => {
    console.log(`Calculando rota para ${shelter.name}`);
    // Aqui integraria com API de mapas para calcular rota segura
  };

  return (
    <div className="h-full flex flex-col bg-slate-100">
      {/* Map Header */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Mapa de São Paulo</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600">GPS Ativo</span>
          </div>
        </div>
      </div>

      {/* Simulated São Paulo Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 overflow-hidden">
        {/* Simulated streets and city blocks */}
        <div className="absolute inset-0">
          {/* Main avenues - horizontal */}
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-400 opacity-60"></div>
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-500 opacity-80"></div>
          <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-400 opacity-60"></div>

          {/* Main avenues - vertical */}
          <div className="absolute top-0 bottom-0 left-1/4 w-2 bg-gray-400 opacity-60"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-3 bg-gray-500 opacity-80"></div>
          <div className="absolute top-0 bottom-0 right-1/4 w-2 bg-gray-400 opacity-60"></div>

          {/* Secondary streets */}
          <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-300 opacity-40"></div>
          <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-300 opacity-40"></div>
          <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-gray-300 opacity-40"></div>
          <div className="absolute top-0 bottom-0 right-1/3 w-1 bg-gray-300 opacity-40"></div>

          {/* City blocks */}
          <div className="absolute top-10 left-10 w-20 h-16 bg-gray-300 opacity-30 rounded-sm"></div>
          <div className="absolute top-32 left-32 w-24 h-20 bg-gray-300 opacity-30 rounded-sm"></div>
          <div className="absolute top-20 right-20 w-28 h-18 bg-gray-300 opacity-30 rounded-sm"></div>
          <div className="absolute bottom-20 left-20 w-22 h-16 bg-gray-300 opacity-30 rounded-sm"></div>
          <div className="absolute bottom-32 right-32 w-26 h-22 bg-gray-300 opacity-30 rounded-sm"></div>

          {/* Parks/Green areas */}
          <div className="absolute top-16 left-1/2 w-32 h-24 bg-green-200 opacity-50 rounded-lg"></div>
          <div className="absolute bottom-24 right-16 w-28 h-20 bg-green-200 opacity-50 rounded-lg"></div>
        </div>

        {/* User Location */}
        {userLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-4 h-4 bg-slate-800 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="text-xs bg-slate-800 text-white px-2 py-1 rounded mt-1 whitespace-nowrap">
              Você está aqui
            </div>
          </div>
        )}

        {/* Shelters on Map - positioned like real São Paulo locations */}
        <div className="absolute top-[45%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
             onClick={() => setSelectedShelter(shelters[0])}>
          <div className={`w-6 h-6 ${getOccupancyColor(shelters[0].occupancy)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <div className="text-xs bg-white px-2 py-1 rounded shadow-md mt-1 min-w-max">
            {shelters[0].name}
          </div>
        </div>

        <div className="absolute top-[38%] left-[52%] transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
             onClick={() => setSelectedShelter(shelters[1])}>
          <div className={`w-6 h-6 ${getOccupancyColor(shelters[1].occupancy)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <div className="text-xs bg-white px-2 py-1 rounded shadow-md mt-1 min-w-max">
            {shelters[1].name}
          </div>
        </div>

        <div className="absolute top-[55%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
             onClick={() => setSelectedShelter(shelters[2])}>
          <div className={`w-6 h-6 ${getOccupancyColor(shelters[2].occupancy)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <div className="text-xs bg-white px-2 py-1 rounded shadow-md mt-1 min-w-max">
            {shelters[2].name}
          </div>
        </div>

        {/* Risk Areas - positioned in different areas of the city */}
        <div className="absolute top-[25%] right-[25%] w-32 h-32 bg-red-200 rounded-full opacity-60 border-2 border-red-400">
          <div className="flex items-center justify-center h-full">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="absolute bottom-[20%] left-[20%] w-24 h-24 bg-orange-200 rounded-full opacity-50 border-2 border-orange-400">
          <div className="flex items-center justify-center h-full">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
        </div>

        {/* São Paulo landmarks indicators */}
        <div className="absolute top-[35%] left-[45%] w-3 h-3 bg-blue-600 rounded-full"></div>
        <div className="text-xs absolute top-[37%] left-[45%] bg-blue-600 text-white px-1 rounded text-center">Centro</div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg max-w-xs">
          <h3 className="text-sm font-semibold mb-2">Legenda</h3>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Livre (até 50%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Médio (51-75%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Alto (76-90%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Lotado (91-100%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-3 h-3 text-red-600" />
              <span>Área de Risco</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Shelter Info */}
      {selectedShelter && (
        <div className="p-4 bg-white border-t">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{selectedShelter.name}</h3>
              <div className={`px-2 py-1 rounded text-xs text-white ${getOccupancyColor(selectedShelter.occupancy)}`}>
                {selectedShelter.occupancy}% ocupado
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm text-slate-600">Capacidade:</span>
                <p className="font-medium">{selectedShelter.capacity} pessoas</p>
              </div>
              <div>
                <span className="text-sm text-slate-600">Disponível:</span>
                <p className="font-medium">{selectedShelter.capacity - Math.floor(selectedShelter.capacity * selectedShelter.occupancy / 100)} vagas</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-sm text-slate-600 block mb-2">Recursos disponíveis:</span>
              <div className="flex space-x-4 text-sm">
                <span className={selectedShelter.resources.water ? 'text-green-600' : 'text-red-600'}>
                  💧 Água
                </span>
                <span className={selectedShelter.resources.food ? 'text-green-600' : 'text-red-600'}>
                  🍞 Alimentos
                </span>
                <span className={selectedShelter.resources.medical ? 'text-green-600' : 'text-red-600'}>
                  🏥 Médico
                </span>
                <span className={selectedShelter.resources.power ? 'text-green-600' : 'text-red-600'}>
                  🔌 Energia
                </span>
              </div>
            </div>

            <Button 
              onClick={() => calculateRoute(selectedShelter)}
              className="w-full bg-gradient-to-r from-slate-800 to-slate-600 hover:from-slate-700 hover:to-slate-500 text-white"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Traçar Rota Segura
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
