
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
    // Simular localização do usuário em São Paulo
    setUserLocation({ lat: -23.5505, lng: -46.6333 });
  }, []);

  const calculateRoute = (shelter: Shelter) => {
    console.log(`Calculando rota para ${shelter.name}`);
    // Aqui integraria com API de mapas para calcular rota segura
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Map Header */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Mapa Interativo</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">GPS Ativo</span>
          </div>
        </div>
      </div>

      {/* Simulated Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
        {/* User Location */}
        {userLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded mt-1">Você está aqui</div>
          </div>
        )}

        {/* Shelters on Map */}
        {shelters.map((shelter, index) => (
          <div
            key={shelter.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10`}
            style={{
              top: `${40 + index * 15}%`,
              left: `${35 + index * 20}%`
            }}
            onClick={() => setSelectedShelter(shelter)}
          >
            <div className={`w-6 h-6 ${getOccupancyColor(shelter.occupancy)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
              <MapPin className="w-3 h-3 text-white" />
            </div>
            <div className="text-xs bg-white px-2 py-1 rounded shadow-md mt-1 min-w-max">
              {shelter.name}
            </div>
          </div>
        ))}

        {/* Risk Areas */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-red-200 rounded-full opacity-50 border-2 border-red-400">
          <div className="flex items-center justify-center h-full">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
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
                <span className="text-sm text-gray-600">Capacidade:</span>
                <p className="font-medium">{selectedShelter.capacity} pessoas</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Disponível:</span>
                <p className="font-medium">{selectedShelter.capacity - Math.floor(selectedShelter.capacity * selectedShelter.occupancy / 100)} vagas</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-600 block mb-2">Recursos disponíveis:</span>
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
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white"
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
