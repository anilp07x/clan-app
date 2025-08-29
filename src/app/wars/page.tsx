'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useWar } from '@/hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Sword, Users, Star, Target, Clock } from 'lucide-react';

export default function WarsPage() {
  const { data: warData, loading: warLoading, error: warError } = useWar();

  if (warLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="bg-gray-200 rounded-2xl h-32"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-200 rounded-2xl h-64"></div>
                <div className="bg-gray-200 rounded-2xl h-64"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (warError || !warData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Guerra do Clã</h1>
              <p className="text-gray-600">
                Status atual da guerra e estatísticas dos participantes
              </p>
            </div>
            
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <Sword className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-600 mb-2">
                    Nenhuma guerra ativa
                  </h2>
                  <p className="text-sm text-gray-500">
                    O clã não está participando de uma guerra no momento.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Verificar se é o estado especial de "não em guerra"
  if (warData.state === 'notInWar') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Guerra do Clã</h1>
              <p className="text-gray-600">
                Status atual da guerra e estatísticas dos participantes
              </p>
            </div>
            
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <Sword className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-600 mb-2">
                    {'reason' in warData ? warData.reason : 'Nenhuma guerra ativa'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {'message' in warData ? warData.message : 'O clã não está participando de uma guerra no momento.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Verificar se é o estado de guerra privada/restrita
  if (warData.state === 'warPrivate') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Guerra do Clã</h1>
              <p className="text-gray-600">
                Status atual da guerra e estatísticas dos participantes
              </p>
            </div>
            
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <Sword className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    {'reason' in warData ? warData.reason : 'Guerra Privada'}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {'message' in warData ? warData.message : 'As informações da guerra atual não estão disponíveis publicamente.'}
                  </p>
                  
                  {'clanInfo' in warData && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Informações do Clã</h3>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>Nome:</strong> {warData.clanInfo.name}</p>
                        <p><strong>Nível:</strong> {warData.clanInfo.level}</p>
                        <p><strong>Membros:</strong> {warData.clanInfo.members}</p>
                        {warData.hasWarParticipation && (
                          <p className="text-green-600 font-medium">✓ Clã participa de guerras</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Se chegamos aqui, deve ser uma guerra válida com dados completos
  if (!('clan' in warData) || !('opponent' in warData)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Guerra do Clã</h1>
              <p className="text-gray-600">
                Status atual da guerra e estatísticas dos participantes
              </p>
            </div>
            
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-8">
                <div className="text-center">
                  <Sword className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-600 mb-2">
                    Dados de guerra incompletos
                  </h2>
                  <p className="text-sm text-gray-500">
                    Não foi possível carregar os dados completos da guerra.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case 'inWar': return 'bg-red-100 text-red-800';
      case 'preparation': return 'bg-yellow-100 text-yellow-800';
      case 'warEnded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStateName = (state: string) => {
    switch (state) {
      case 'inWar': return 'Em Guerra';
      case 'preparation': return 'Preparação';
      case 'warEnded': return 'Guerra Finalizada';
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Guerra do Clã</h1>
            <p className="text-gray-600">
              Status atual da guerra e estatísticas dos participantes
            </p>
          </div>

          {/* Status da guerra */}
          <Card className="rounded-2xl shadow-md mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Status da Guerra</CardTitle>
                <Badge className={getStateColor(warData.state)}>
                  {getStateName(warData.state)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Tamanho da Guerra</p>
                    <p className="font-semibold">{warData.teamSize}v{warData.teamSize}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Ataques por Membro</p>
                    <p className="font-semibold">{warData.attacksPerMember}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Data de Início</p>
                    <p className="font-semibold">
                      {new Date(warData.startTime).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Data de Fim</p>
                    <p className="font-semibold">
                      {new Date(warData.endTime).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparação dos clãs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nosso clã */}
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {warData.clan.badgeUrls?.medium && (
                    <Image
                      src={warData.clan.badgeUrls.medium}
                      alt="Escudo do clã"
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  )}
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {warData.clan.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Nível {warData.clan.clanLevel}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Estrelas</span>
                    </div>
                    <span className="font-semibold">{warData.clan.stars}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Destruição</span>
                    </div>
                    <span className="font-semibold">{warData.clan.destructionPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sword className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Ataques</span>
                    </div>
                    <span className="font-semibold">{warData.clan.attacks}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clã oponente */}
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {warData.opponent.badgeUrls?.medium && (
                    <Image
                      src={warData.opponent.badgeUrls.medium}
                      alt="Escudo do oponente"
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  )}
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {warData.opponent.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Nível {warData.opponent.clanLevel}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Estrelas</span>
                    </div>
                    <span className="font-semibold">{warData.opponent.stars}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Destruição</span>
                    </div>
                    <span className="font-semibold">{warData.opponent.destructionPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sword className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Ataques</span>
                    </div>
                    <span className="font-semibold">{warData.opponent.attacks}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
