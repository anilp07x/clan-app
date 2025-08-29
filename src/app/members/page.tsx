'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useMembers, useClanData } from '@/hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Trophy, Gift, Star, TrendingUp, TrendingDown } from 'lucide-react';

export default function MembersPage() {
  const { data: membersData, loading: membersLoading, error: membersError } = useMembers();
  const { data: clanData } = useClanData();

  if (membersLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-20"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (membersError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-red-600 mb-2">
                    Erro ao carregar membros
                  </h2>
                  <p className="text-sm text-gray-600">{membersError}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'leader': return 'bg-red-100 text-red-800';
      case 'coLeader': return 'bg-orange-100 text-orange-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'elder': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'leader': return 'Líder';
      case 'coLeader': return 'Vice-Líder';
      case 'admin': return 'Veterano';
      case 'elder': return 'Ancião';
      default: return 'Membro';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Membros do Clã</h1>
            <p className="text-gray-600">
              {membersData?.memberCount || 0} membros ativos no clã
            </p>
          </div>

          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total de Troféus</p>
                    <p className="text-lg font-semibold">
                      {membersData?.memberList.reduce((sum, member) => sum + member.trophies, 0).toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total de Doações</p>
                    <p className="text-lg font-semibold">
                      {membersData?.memberList.reduce((sum, member) => sum + member.donations, 0).toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Nível Médio</p>
                    <p className="text-lg font-semibold">
                      {Math.round((membersData?.memberList.reduce((sum, member) => sum + member.expLevel, 0) || 0) / (membersData?.memberCount || 1))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Troféus Médios</p>
                    <p className="text-lg font-semibold">
                      {Math.round((membersData?.memberList.reduce((sum, member) => sum + member.trophies, 0) || 0) / (membersData?.memberCount || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de membros */}
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Lista de Membros</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Membro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cargo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Troféus
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doações
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recebidas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posição
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {membersData?.memberList.map((member, index) => (
                      <tr key={member.tag} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {member.league?.iconUrls?.small && (
                              <Image
                                src={member.league.iconUrls.small}
                                alt="Liga"
                                width={24}
                                height={24}
                                className="mr-3"
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {member.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Nível {member.expLevel}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getRoleColor(member.role)}>
                            {getRoleName(member.role)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 text-yellow-600 mr-1" />
                            <span className="text-sm font-medium">
                              {member.trophies.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Gift className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-sm">
                              {member.donations.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {member.donationsReceived.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">
                              #{member.clanRank}
                            </span>
                            {member.previousClanRank > member.clanRank ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : member.previousClanRank < member.clanRank ? (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
