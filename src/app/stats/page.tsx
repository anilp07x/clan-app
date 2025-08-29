'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TrophyChart, ParticipationChart } from '@/components/Charts';
import { useClanData, useMembers } from '@/hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, TrendingUp, Award, Target, Star } from 'lucide-react';

export default function StatsPage() {
  const { data: clanData, loading: clanLoading } = useClanData();
  const { data: membersData, loading: membersLoading } = useMembers();

  if (clanLoading || membersLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="bg-gray-200 rounded-2xl h-32"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-200 rounded-2xl h-96"></div>
                <div className="bg-gray-200 rounded-2xl h-96"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Estatísticas calculadas
  const stats = {
    averageTrophies: membersData ? Math.round(
      membersData.memberList.reduce((sum, member) => sum + member.trophies, 0) / membersData.memberCount
    ) : 0,
    totalDonations: membersData ? 
      membersData.memberList.reduce((sum, member) => sum + member.donations, 0) : 0,
    averageDonations: membersData ? Math.round(
      membersData.memberList.reduce((sum, member) => sum + member.donations, 0) / membersData.memberCount
    ) : 0,
    averageLevel: membersData ? Math.round(
      membersData.memberList.reduce((sum, member) => sum + member.expLevel, 0) / membersData.memberCount
    ) : 0,
    topDonator: membersData ? 
      membersData.memberList.reduce((prev, current) => 
        prev.donations > current.donations ? prev : current
      ) : null,
    topTrophies: membersData ? 
      membersData.memberList.reduce((prev, current) => 
        prev.trophies > current.trophies ? prev : current
      ) : null,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Estatísticas</h1>
            <p className="text-gray-600">
              Análise detalhada e métricas avançadas do clã
            </p>
          </div>

          {/* Métricas gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Troféus Médios</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageTrophies.toLocaleString()}</div>
                <p className="text-xs text-gray-600">
                  por membro ativo
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doações Totais</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDonations.toLocaleString()}</div>
                <p className="text-xs text-gray-600">
                  média de {stats.averageDonations.toLocaleString()} por membro
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nível Médio</CardTitle>
                <Star className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageLevel}</div>
                <p className="text-xs text-gray-600">
                  experiência do clã
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Destaques do clã */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Maior Doador
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topDonator && (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {stats.topDonator.name}
                    </h3>
                    <p className="text-3xl font-bold text-green-600 mb-2">
                      {stats.topDonator.donations.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      doações realizadas
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                  Mais Troféus
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topTrophies && (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {stats.topTrophies.name}
                    </h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">
                      {stats.topTrophies.trophies.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      troféus conquistados
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Gráficos principais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <TrophyChart />
            <ParticipationChart />
          </div>

          {/* Distribuição de troféus */}
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Distribuição de Troféus</CardTitle>
              <p className="text-sm text-gray-600">Faixas de troféus dos membros</p>
            </CardHeader>
            <CardContent>
              {membersData && (
                <div className="space-y-4">
                  {[
                    { range: '5000+', min: 5000, color: 'bg-red-500' },
                    { range: '4000-4999', min: 4000, max: 4999, color: 'bg-orange-500' },
                    { range: '3000-3999', min: 3000, max: 3999, color: 'bg-yellow-500' },
                    { range: '2000-2999', min: 2000, max: 2999, color: 'bg-green-500' },
                    { range: '1000-1999', min: 1000, max: 1999, color: 'bg-blue-500' },
                    { range: '0-999', min: 0, max: 999, color: 'bg-gray-500' },
                  ].map((bracket) => {
                    const count = membersData.memberList.filter(member => {
                      if (bracket.max) {
                        return member.trophies >= bracket.min && member.trophies <= bracket.max;
                      } else {
                        return member.trophies >= bracket.min;
                      }
                    }).length;
                    
                    const percentage = (count / membersData.memberCount) * 100;
                    
                    return (
                      <div key={bracket.range} className="flex items-center space-x-4">
                        <div className="w-24 text-sm font-medium">{bracket.range}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div
                            className={`${bracket.color} h-6 rounded-full flex items-center justify-center text-white text-xs font-medium`}
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          >
                            {count > 0 && `${count}`}
                          </div>
                        </div>
                        <div className="w-12 text-sm text-gray-600">
                          {percentage.toFixed(0)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
