'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useMembers, useWar } from '@/hooks/useApi';
import { useMemo } from 'react';

export function TrophyChart() {
  const { data: membersData } = useMembers();

  const trophyDistribution = useMemo(() => {
    if (!membersData?.memberList) return [];

    // Agrupa membros por faixas de troféus
    const ranges = [
      { name: '0-1000', min: 0, max: 1000, count: 0 },
      { name: '1000-2000', min: 1000, max: 2000, count: 0 },
      { name: '2000-3000', min: 2000, max: 3000, count: 0 },
      { name: '3000-4000', min: 3000, max: 4000, count: 0 },
      { name: '4000+', min: 4000, max: Infinity, count: 0 },
    ];

    membersData.memberList.forEach(member => {
      const range = ranges.find(r => member.trophies >= r.min && member.trophies < r.max);
      if (range) range.count++;
    });

    return ranges.filter(range => range.count > 0);
  }, [membersData]);

  if (!membersData) {
    return (
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Distribuição de Troféus</CardTitle>
          <p className="text-sm text-gray-600">Carregando...</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Carregando dados...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Distribuição de Troféus</CardTitle>
        <p className="text-sm text-gray-600">Membros por faixa de troféus</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trophyDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar 
              dataKey="count" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ParticipationChart() {
  const { data: membersData } = useMembers();
  const { data: warData } = useWar();

  const participationData = useMemo(() => {
    if (!membersData?.memberList) return [];

    const totalMembers = membersData.memberCount;
    const membersWithDonations = membersData.memberList.filter(m => m.donations > 0).length;
    const membersWithReceived = membersData.memberList.filter(m => m.donationsReceived > 0).length;
    
    // Para guerra, usamos dados reais se disponíveis
    const warParticipants = (warData && 'clan' in warData) ? warData.clan.members?.length || 0 : 0;

    return [
      { name: 'Doações Feitas', participated: membersWithDonations, total: totalMembers, percentage: Math.round((membersWithDonations / totalMembers) * 100) },
      { name: 'Doações Recebidas', participated: membersWithReceived, total: totalMembers, percentage: Math.round((membersWithReceived / totalMembers) * 100) },
      { name: 'Guerra Atual', participated: warParticipants, total: totalMembers, percentage: Math.round((warParticipants / totalMembers) * 100) },
    ];
  }, [membersData, warData]);

  if (!membersData) {
    return (
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Participação dos Membros</CardTitle>
          <p className="text-sm text-gray-600">Carregando...</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Carregando dados...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Participação dos Membros</CardTitle>
        <p className="text-sm text-gray-600">Atividades do clã</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={participationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => [
                `${value} membros (${participationData.find(d => d.participated === value)?.percentage}%)`,
                'Participação'
              ]}
            />
            <Bar 
              dataKey="participated" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function RoleDistributionChart() {
  const { data: membersData } = useMembers();

  const roleData = useMemo(() => {
    if (!membersData?.memberList) return [];

    const roles = {
      leader: { name: 'Líder', count: 0, color: '#ef4444' },
      coLeader: { name: 'Vice-Líder', count: 0, color: '#f59e0b' },
      admin: { name: 'Veterano', count: 0, color: '#3b82f6' },
      member: { name: 'Membro', count: 0, color: '#10b981' },
    };

    membersData.memberList.forEach(member => {
      if (roles[member.role as keyof typeof roles]) {
        roles[member.role as keyof typeof roles].count++;
      }
    });

    return Object.values(roles).filter(role => role.count > 0);
  }, [membersData]);

  if (!membersData) {
    return (
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Distribuição de Cargos</CardTitle>
          <p className="text-sm text-gray-600">Carregando...</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Carregando dados...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Distribuição de Cargos</CardTitle>
        <p className="text-sm text-gray-600">Hierarquia do clã</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={roleData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="count"
              label
            >
              {roleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
