import { useState, useEffect } from 'react';
import { ClanData, MembersResponse, WarData, RaidsData } from '@/types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(endpoint: string): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

// Hooks específicos para cada endpoint
export const useClanData = () => useApi<ClanData>('clan');
export const useMembers = () => useApi<MembersResponse>('members');
export const useWar = () => useApi<WarData>('war');
export const useRaids = () => useApi<RaidsData>('raids');
