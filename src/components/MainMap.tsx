
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin, Route } from 'lucide-react';

// Mock data for shelters
const shelters = [
  {
    id: 1,
    name: 'Abrigo Central Vila Esperança',
    coordinates: [-46.6333, -23.5505],
    capacity: 200,
    occupied: 85,
    status: 'open',
    resources: { water: 'good', food: 'medium', medical: 'good', power: 'good' }
  },
  {
    id: 2,
    name: 'Escola Municipal Santos Dumont',
    coordinates: [-46.6423, -23.5605],
    capacity: 150,
    occupied: 130,
    status: 'nearly_full',
    resources: { water: 'good', food: 'low', medical: 'medium', power: 'good' }
  },
  {
    id: 3,
    name: 'Centro Comunitário São José',
    coordinates: [-46.6233, -23.5405],
    capacity: 100,
    occupied: 100,
    status: 'full',
    resources: { water: 'medium', food: 'low', medical: 'low', power: 'medium' }
  }
];

interface MainMapProps {
  selectedShelter: any;
  setSelectedShelter: (shelter: any) => void;
}

const getStatusColor = (occupied: number, capacity: number) => {
  const percentage = (occupied / capacity) * 100;
  if (percentage <= 50) return '#10B981'; // green
  if (percentage <= 75) return '#F59E0B'; // yellow
  if (percentage <= 90) return '#F97316'; // orange
  return '#EF4444'; // red
};

const getStatusText = (occupied: number, capacity: number) => {
  const percentage = (occupied / capacity) * 100;
  if (percentage <= 50) return 'Disponível';
  if (percentage <= 75) return 'Ocupação Média';
  if (percentage <= 90) return 'Alta Ocupação';
  return 'Lotado';
};

export function MainMap({ selectedShelter, setSelectedShelter }: MainMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, using a placeholder token
    const token = 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNseDJhY2ExZjBhMG0ya3F6dGp4NmZvbXoifQ.demo_token';
    
    if (!token) {
      return;
    }

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-46.6333, -23.5505], // São Paulo
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for shelters
    shelters.forEach(shelter => {
      const percentage = (shelter.occupied / shelter.capacity) * 100;
      const color = getStatusColor(shelter.occupied, shelter.capacity);
      
      // Create custom marker
      const el = document.createElement('div');
      el.className = 'shelter-marker';
      el.style.cssText = `
        width: 30px;
        height: 30px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: bold;
      `;
      el.innerHTML = '🏠';

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false
      }).setHTML(`
        <div class="p-3">
          <h3 class="font-bold text-sm mb-2">${shelter.name}</h3>
          <div class="text-xs space-y-1">
            <div class="flex justify-between">
              <span>Ocupação:</span>
              <span class="font-medium">${shelter.occupied}/${shelter.capacity}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="h-2 rounded-full" style="width: ${percentage}%; background-color: ${color}"></div>
            </div>
            <div class="text-xs font-medium" style="color: ${color}">
              ${getStatusText(shelter.occupied, shelter.capacity)}
            </div>
          </div>
        </div>
      `);

      new mapboxgl.Marker(el)
        .setLngLat(shelter.coordinates as [number, number])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelectedShelter(shelter);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [setSelectedShelter]);

  if (!mapboxgl.accessToken) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Mapa Indisponível</h3>
          <p className="text-gray-500 mb-4">
            Para visualizar o mapa interativo, é necessário configurar uma chave de API do Mapbox.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <p className="text-sm text-yellow-800">
              <strong>Para demonstração:</strong> O mapa mostraria abrigos com indicadores de status:
            </p>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>🟢 Disponível (até 50% ocupado)</li>
              <li>🟡 Ocupação média (51-75%)</li>
              <li>🟠 Alta ocupação (76-90%)</li>
              <li>🔴 Lotado (91-100%)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 space-y-2">
        <Button className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg">
          <Navigation className="w-4 h-4 mr-2" />
          Minha Localização
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <h4 className="font-semibold text-sm mb-2">Status dos Abrigos</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Disponível (até 50%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Ocupação Média (51-75%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Alta Ocupação (76-90%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Lotado (91-100%)</span>
          </div>
        </div>
      </div>

      {/* Route Button */}
      {selectedShelter && (
        <div className="absolute bottom-4 right-4">
          <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-lg">
            <Route className="w-4 h-4 mr-2" />
            Traçar Rota Segura
          </Button>
        </div>
      )}
    </div>
  );
}
