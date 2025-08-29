'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useRaids } from '@/hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Coins, Sword, Shield, Users, Trophy } from 'lucide-react';

export default function RaidsPage() {
  const { data: raidsData, loading: raidsLoading, error: raidsError } = useRaids();

  if (raidsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="bg-gray-200 rounded-2xl h-32"></div>
              <div className="grid grid-cols-1 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-48"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (raidsError || !raidsData || raidsData.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-600 mb-2">
                    Nenhuma raid encontrada
                  </h2>
                  <p className="text-sm text-gray-500">
                    {raidsError || 'Não há dados de raids da capital disponíveis.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStateName = (state: string) => {
    switch (state) {
      case 'ongoing': return 'Em Andamento';
      case 'ended': return 'Finalizada';
      default: return state;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Raids da Capital</h1>
            <p className="text-gray-600">
              Histórico e estatísticas das raids da capital do clã
            </p>
          </div>

          {/* Lista de raids */}
          <div className="space-y-6">
            {raidsData.items.slice(0, 5).map((raid, index) => (
              <Card key={index} className="rounded-2xl shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      Raid Weekend #{raidsData.items.length - index}
                    </CardTitle>
                    <Badge className={getStateColor(raid.state)}>
                      {getStateName(raid.state)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(raid.startTime).toLocaleDateString('pt-BR')} - {new Date(raid.endTime).toLocaleDateString('pt-BR')}
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Estatísticas gerais */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Coins className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="text-sm text-gray-600">Capital Loot</p>
                        <p className="font-semibold">{raid.capitalTotalLoot.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Raids Completas</p>
                        <p className="font-semibold">{raid.raidsCompleted}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sword className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total de Ataques</p>
                        <p className="font-semibold">{raid.totalAttacks}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Distritos Destruídos</p>
                        <p className="font-semibold">{raid.enemyDistrictsDestroyed}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recompensas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Trophy className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">Recompensa Ofensiva</span>
                      </div>
                      <p className="text-2xl font-bold text-green-700">
                        {raid.offensiveReward.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-800">Recompensa Defensiva</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-700">
                        {raid.defensiveReward.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Top participantes */}
                  {raid.members && raid.members.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Top Participantes
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left">Nome</th>
                              <th className="px-4 py-2 text-left">Ataques</th>
                              <th className="px-4 py-2 text-left">Limite</th>
                              <th className="px-4 py-2 text-left">Recursos Saqueados</th>
                            </tr>
                          </thead>
                          <tbody>
                            {raid.members
                              .sort((a, b) => b.capitalResourcesLooted - a.capitalResourcesLooted)
                              .slice(0, 5)
                              .map((member, memberIndex) => (
                                <tr key={member.tag} className="border-t">
                                  <td className="px-4 py-2 font-medium">{member.name}</td>
                                  <td className="px-4 py-2">{member.attacks}</td>
                                  <td className="px-4 py-2">{member.attackLimit}</td>
                                  <td className="px-4 py-2">
                                    <span className="font-semibold text-yellow-600">
                                      {member.capitalResourcesLooted.toLocaleString()}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
