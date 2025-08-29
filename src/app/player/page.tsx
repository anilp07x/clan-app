'use client';

import { useState } from 'react';
import { Search, User, Trophy, Star, Zap, Shield, Swords, Home } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { usePlayer } from '@/hooks/useApi';
import Image from 'next/image';

export default function PlayerSearchPage() {
  const [searchTag, setSearchTag] = useState('');
  const [currentPlayerTag, setCurrentPlayerTag] = useState<string | null>(null);
  const { data: playerData, loading, error } = usePlayer(currentPlayerTag);

  const handleSearch = () => {
    if (!searchTag.trim()) return;
    
    let tag = searchTag.trim();
    if (!tag.startsWith('#')) {
      tag = '#' + tag;
    }
    
    setCurrentPlayerTag(tag);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'leader': return 'bg-red-100 text-red-800';
      case 'coLeader': return 'bg-orange-100 text-orange-800';
      case 'admin': return 'bg-yellow-100 text-yellow-800';
      case 'member': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleName = (role?: string) => {
    switch (role) {
      case 'leader': return 'Líder';
      case 'coLeader': return 'Vice-Líder';
      case 'admin': return 'Veterano';
      case 'member': return 'Membro';
      default: return role || 'Sem Clã';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Buscar Jogador</h1>
            <p className="text-gray-600">
              Digite a tag do jogador para ver suas estatísticas detalhadas
            </p>
          </div>

          {/* Campo de Busca */}
          <Card className="rounded-2xl shadow-md mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Digite a tag do jogador (ex: #ABC123XYZ)"
                      value={searchTag}
                      onChange={(e) => setSearchTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full h-12 pl-12 text-lg"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  disabled={loading || !searchTag.trim()}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium h-12"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Buscar
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Mensagem de Erro */}
          {error && (
            <Card className="rounded-2xl shadow-md mb-8 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center text-red-600">
                  <User className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Erro ao buscar jogador</p>
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dados do Jogador */}
          {playerData && (
            <div className="space-y-6">
              {/* Cabeçalho do Jogador */}
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{playerData.name}</h2>
                        <p className="text-gray-600 text-lg">{playerData.tag}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <Badge variant="outline" className="text-base px-3 py-1">
                            <Home className="w-4 h-4 mr-1" />
                            TH {playerData.townHallLevel}
                          </Badge>
                          <Badge variant="outline" className="text-base px-3 py-1">
                            Level {playerData.expLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {playerData.league && (
                      <div className="text-center">
                        <Image 
                          src={playerData.league.iconUrls.medium} 
                          alt={playerData.league.name}
                          width={60}
                          height={60}
                          className="mx-auto mb-2"
                        />
                        <p className="text-sm font-medium text-gray-700">{playerData.league.name}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Grid de Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="rounded-2xl shadow-md">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                    <p className="text-3xl font-bold text-gray-900">{playerData.trophies.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 mt-1">Troféus Atuais</p>
                    <p className="text-xs text-gray-500 mt-1">Melhor: {playerData.bestTrophies.toLocaleString()}</p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-md">
                  <CardContent className="p-6 text-center">
                    <Star className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                    <p className="text-3xl font-bold text-gray-900">{playerData.warStars}</p>
                    <p className="text-sm text-gray-600 mt-1">Estrelas de Guerra</p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-md">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-12 h-12 mx-auto mb-3 text-green-500" />
                    <p className="text-3xl font-bold text-gray-900">{playerData.donations.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 mt-1">Doações</p>
                    <p className="text-xs text-gray-500 mt-1">Recebidas: {playerData.donationsReceived.toLocaleString()}</p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-md">
                  <CardContent className="p-6 text-center">
                    <Swords className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                    <p className="text-3xl font-bold text-gray-900">{playerData.attackWins}</p>
                    <p className="text-sm text-gray-600 mt-1">Vitórias Ataque</p>
                    <p className="text-xs text-gray-500 mt-1">Defesa: {playerData.defenseWins}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Informações do Clã */}
              {playerData.clan && (
                <Card className="rounded-2xl shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Informações do Clã
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Image 
                          src={playerData.clan.badgeUrls.medium} 
                          alt={playerData.clan.name}
                          width={48}
                          height={48}
                          className="rounded"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{playerData.clan.name}</h3>
                          <p className="text-gray-600">{playerData.clan.tag}</p>
                          <p className="text-sm text-gray-500">Nível {playerData.clan.clanLevel}</p>
                        </div>
                      </div>
                      
                      {playerData.role && (
                        <Badge className={getRoleColor(playerData.role)}>
                          {getRoleName(playerData.role)}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Conquistas Principais */}
              {playerData.achievements && playerData.achievements.length > 0 && (
                <Card className="rounded-2xl shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Principais Conquistas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {playerData.achievements
                        .filter(achievement => achievement.stars === 3)
                        .slice(0, 6)
                        .map((achievement, index) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <Star className="w-5 h-5 text-yellow-500 mr-3" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{achievement.name}</p>
                              <p className="text-sm text-gray-600">{achievement.info}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-bold text-gray-900">{achievement.value.toLocaleString()}</p>
                              {achievement.target > achievement.value && (
                                <p className="text-xs text-gray-500">/{achievement.target.toLocaleString()}</p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
