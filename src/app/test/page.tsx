'use client';

import { useState, useEffect } from 'react';

interface ClanData {
  tag: string;
  name: string;
  type: string;
  description: string;
  location?: {
    name: string;
    countryCode: string;
  };
  clanLevel: number;
  clanPoints: number;
  clanBuilderBasePoints: number;
  members: number;
  requiredTrophies: number;
  warWins: number;
  warWinStreak: number;
  warLeague?: {
    name: string;
  };
  capitalLeague?: {
    name: string;
  };
  memberList: Array<{
    tag: string;
    name: string;
    role: string;
    expLevel: number;
    trophies: number;
    clanRank: number;
    previousClanRank: number;
    donations: number;
    donationsReceived: number;
  }>;
}

interface MembersResponse {
  memberList: Array<{
    tag: string;
    name: string;
    role: string;
    expLevel: number;
    trophies: number;
    clanRank: number;
    previousClanRank: number;
    donations: number;
    donationsReceived: number;
  }>;
  memberCount: number;
}

export default function TestPage() {
  const [clanData, setClanData] = useState<ClanData | null>(null);
  const [members, setMembers] = useState<MembersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClanData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/clan');
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setClanData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/members');
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClanData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🏰 Teste da API do Clash of Clans
        </h1>

        {/* Botões de Teste */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={fetchClanData}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Carregando...' : 'Buscar Dados do Clã'}
          </button>
          
          <button
            onClick={fetchMembers}
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Carregando...' : 'Buscar Membros'}
          </button>
        </div>

        {/* Exibição de Erro */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Erro:</strong> {error}
          </div>
        )}

        {/* Dados do Clã */}
        {clanData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              📊 Informações do Clã
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700">Nome:</h3>
                <p className="text-lg">{clanData.name}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700">Tag:</h3>
                <p className="text-lg font-mono">{clanData.tag}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700">Nível:</h3>
                <p className="text-lg">{clanData.clanLevel}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700">Pontos:</h3>
                <p className="text-lg">{clanData.clanPoints?.toLocaleString()}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700">Membros:</h3>
                <p className="text-lg">{clanData.members}/50</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700">Vitórias em Guerra:</h3>
                <p className="text-lg">{clanData.warWins}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700">Localização:</h3>
                <p className="text-lg">{clanData.location?.name || 'N/A'}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700">Tipo:</h3>
                <p className="text-lg capitalize">{clanData.type}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700">Liga de Guerra:</h3>
                <p className="text-lg">{clanData.warLeague?.name || 'N/A'}</p>
              </div>
            </div>
            
            {clanData.description && (
              <div className="mt-6 bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-700 mb-2">Descrição:</h3>
                <p className="text-gray-600">{clanData.description}</p>
              </div>
            )}
          </div>
        )}

        {/* Lista de Membros */}
        {members && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              👥 Membros do Clã ({members.memberCount})
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Rank</th>
                    <th className="p-3 text-left">Nome</th>
                    <th className="p-3 text-left">Cargo</th>
                    <th className="p-3 text-left">Nível</th>
                    <th className="p-3 text-left">Troféus</th>
                    <th className="p-3 text-left">Doações</th>
                    <th className="p-3 text-left">Recebidas</th>
                  </tr>
                </thead>
                <tbody>
                  {members.memberList?.slice(0, 10).map((member, index: number) => (
                    <tr key={member.tag} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3">{member.clanRank}</td>
                      <td className="p-3 font-semibold">{member.name}</td>
                      <td className="p-3 capitalize">{member.role}</td>
                      <td className="p-3">{member.expLevel}</td>
                      <td className="p-3">{member.trophies}</td>
                      <td className="p-3">{member.donations}</td>
                      <td className="p-3">{member.donationsReceived}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {members.memberList?.length > 10 && (
                <p className="text-center text-gray-500 mt-4">
                  Mostrando apenas os primeiros 10 membros de {members.memberCount} total
                </p>
              )}
            </div>
          </div>
        )}

        {/* JSON Raw Data para Debug */}
        {(clanData || members) && (
          <details className="mt-8 bg-gray-800 text-white p-4 rounded">
            <summary className="cursor-pointer font-semibold mb-2">
              🔍 Ver dados brutos (JSON)
            </summary>
            <pre className="text-xs overflow-auto">
              {JSON.stringify({ clanData, members }, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
