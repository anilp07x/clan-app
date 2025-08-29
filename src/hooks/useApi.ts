import { useState, useEffect } from 'react';
import { ClanData, MembersResponse, WarResponse, RaidsData, PlayerData, LocationData } from '@/types/api';

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
export const useWar = () => useApi<WarResponse>('war');
export const useRaids = () => useApi<RaidsData>('raids');
export const useLocations = () => useApi<LocationData>('locations');

// Hook para buscar jogador específico (não usa useApi pois precisa de parâmetro)
export function usePlayer(playerTag: string | null) {
  const [data, setData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playerTag) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchPlayer = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/player/${encodeURIComponent(playerTag)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Erro ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerTag]);

  return { data, loading, error };
}
