'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MetricCard } from '@/components/MetricCard';
import { TrophyChart, ParticipationChart, RoleDistributionChart } from '@/components/Charts';
import { useClanData, useMembers } from '@/hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Sword, Crown, Target, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { data: clanData, loading: clanLoading, error: clanError } = useClanData();
  const { data: membersData } = useMembers();

  if (clanLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-32"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (clanError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-red-600 mb-2">
                    Erro ao carregar dados
                  </h2>
                  <p className="text-sm text-gray-600">{clanError}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho da página */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Visão geral das estatísticas e atividades do clã
            </p>
          </div>

          {/* Grid de métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Troféus do Clã"
              value={clanData?.clanPoints?.toLocaleString() || '0'}
              subtitle={`Nível ${clanData?.clanLevel || 0}`}
              icon={<Trophy className="h-4 w-4" />}
            />
            
            <MetricCard
              title="Membros"
              value={`${clanData?.members || 0}/50`}
              subtitle={`${membersData?.memberCount || 0} ativos`}
              icon={<Users className="h-4 w-4" />}
            />
            
            <MetricCard
              title="Vitórias em Guerra"
              value={clanData?.warWins || 0}
              subtitle={`Sequência: ${clanData?.warWinStreak || 0}`}
              icon={<Sword className="h-4 w-4" />}
            />
            
            <MetricCard
              title="Liga de Guerra"
              value={clanData?.warLeague?.name || 'N/A'}
              subtitle="Posição atual"
              icon={<Crown className="h-4 w-4" />}
            />
            
            <MetricCard
              title="Troféus Necessários"
              value={clanData?.requiredTrophies?.toLocaleString() || '0'}
              subtitle="Para entrada"
              icon={<Target className="h-4 w-4" />}
            />
            
            <MetricCard
              title="Pontos da Capital"
              value={clanData?.clanCapitalPoints?.toLocaleString() || '0'}
              subtitle={`Hall Nível ${clanData?.clanCapitalHallLevel || 0}`}
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </div>

          {/* Informações do clã */}
          {clanData?.description && (
            <Card className="rounded-2xl shadow-md mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Sobre o Clã</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {clanData.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-medium">Tipo:</span>{' '}
                    <span className="text-gray-600 capitalize">{clanData.type}</span>
                  </div>
                  <div>
                    <span className="font-medium">Localização:</span>{' '}
                    <span className="text-gray-600">{clanData.location?.name || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Frequência de Guerra:</span>{' '}
                    <span className="text-gray-600">{clanData.warFrequency || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Doações/Semana:</span>{' '}
                    <span className="text-gray-600">{clanData.donationsPerWeek?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <TrophyChart />
            <ParticipationChart />
            <RoleDistributionChart />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
