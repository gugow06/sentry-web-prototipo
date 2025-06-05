
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Lock, Users, Home, AlertTriangle } from 'lucide-react';

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

const initialShelters: Shelter[] = [
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

export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shelters, setShelters] = useState<Shelter[]>(initialShelters);
  const [editingShelter, setEditingShelter] = useState<Shelter | null>(null);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciais inválidas');
    }
  };

  const handleUpdateShelter = (updatedShelter: Shelter) => {
    setShelters(prev => prev.map(shelter => 
      shelter.id === updatedShelter.id ? updatedShelter : shelter
    ));
    setEditingShelter(null);
  };

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy <= 50) return 'bg-green-500';
    if (occupancy <= 75) return 'bg-yellow-500';
    if (occupancy <= 90) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <Card className="w-96 p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Painel Administrativo</h2>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-slate-800 to-slate-600 hover:from-slate-700 hover:to-slate-500"
            >
              Entrar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie os abrigos e recursos</p>
        </div>
        <Button 
          onClick={() => setIsAuthenticated(false)}
          variant="outline"
        >
          Sair
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">{shelters.length}</p>
              <p className="text-sm text-gray-600">Total de Abrigos</p>
            </div>
            <Home className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {shelters.reduce((acc, shelter) => acc + Math.floor((shelter.occupancy / 100) * shelter.capacity), 0)}
              </p>
              <p className="text-sm text-gray-600">Pessoas Abrigadas</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {shelters.filter(s => s.status === 'open').length}
              </p>
              <p className="text-sm text-gray-600">Abrigos Disponíveis</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Gerenciar Abrigos</h2>
        {shelters.map((shelter) => (
          <Card key={shelter.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold">{shelter.name}</h3>
                  <Badge className={shelter.status === 'open' ? 'bg-green-100 text-green-800' : 
                                  shelter.status === 'full' ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800'}>
                    {shelter.status === 'open' ? 'Aberto' : 
                     shelter.status === 'full' ? 'Lotado' : 'Fechado'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600">Ocupação:</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getOccupancyColor(shelter.occupancy)}`}></div>
                      <span className="font-medium">{shelter.occupancy}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Capacidade:</span>
                    <p className="font-medium">{shelter.capacity} pessoas</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Ocupados:</span>
                    <p className="font-medium">{Math.floor((shelter.occupancy / 100) * shelter.capacity)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Disponíveis:</span>
                    <p className="font-medium">{shelter.capacity - Math.floor((shelter.occupancy / 100) * shelter.capacity)}</p>
                  </div>
                </div>

                <div className="flex space-x-4 text-sm">
                  <span className={shelter.resources.water ? 'text-green-600' : 'text-red-600'}>
                    💧 Água
                  </span>
                  <span className={shelter.resources.food ? 'text-green-600' : 'text-red-600'}>
                    🍞 Alimentos
                  </span>
                  <span className={shelter.resources.medical ? 'text-green-600' : 'text-red-600'}>
                    🏥 Médico
                  </span>
                  <span className={shelter.resources.power ? 'text-green-600' : 'text-red-600'}>
                    🔌 Energia
                  </span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => setEditingShelter(shelter)}
                    className="bg-gradient-to-r from-slate-800 to-slate-600 hover:from-slate-700 hover:to-slate-500"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Editar Abrigo: {shelter.name}</DialogTitle>
                  </DialogHeader>
                  <EditShelterForm 
                    shelter={shelter} 
                    onUpdate={handleUpdateShelter}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EditShelterForm({ shelter, onUpdate }: { shelter: Shelter, onUpdate: (shelter: Shelter) => void }) {
  const [formData, setFormData] = useState(shelter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nome do Abrigo</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Capacidade</label>
        <Input
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ocupação (%)</label>
        <Input
          type="number"
          min="0"
          max="100"
          value={formData.occupancy}
          onChange={(e) => setFormData(prev => ({ ...prev, occupancy: parseInt(e.target.value) }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          className="w-full p-2 border rounded-md"
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'open' | 'full' | 'closed' }))}
        >
          <option value="open">Aberto</option>
          <option value="full">Lotado</option>
          <option value="closed">Fechado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Recursos Disponíveis</label>
        <div className="space-y-2">
          {Object.entries(formData.resources).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  resources: { ...prev.resources, [key]: e.target.checked }
                }))}
              />
              <span className="text-sm">
                {key === 'water' ? '💧 Água' :
                 key === 'food' ? '🍞 Alimentos' :
                 key === 'medical' ? '🏥 Médico' : '🔌 Energia'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-slate-800 to-slate-600 hover:from-slate-700 hover:to-slate-500"
      >
        Salvar Alterações
      </Button>
    </form>
  );
}
