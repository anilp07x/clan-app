/**
 * Biblioteca para conectividade com a API do Clash of Clans da Supercell
 * Centraliza todas as chamadas à API externa
 */

// Interface básica para respostas da API - pode ser expandida conforme necessário
interface SupercellApiResponse {
  [key: string]: unknown;
}

const SUPERCELL_API_TOKEN = process.env.SUPERCELL_API_TOKEN;
const SUPERCELL_BASE_URL = process.env.SUPERCELL_BASE_URL;

if (!SUPERCELL_API_TOKEN) {
  throw new Error('SUPERCELL_API_TOKEN não encontrado nas variáveis de ambiente');
}

if (!SUPERCELL_BASE_URL) {
  throw new Error('SUPERCELL_BASE_URL não encontrado nas variáveis de ambiente');
}

/**
 * Função centralizada para fazer chamadas à API da Supercell
 * @param endpoint - O endpoint da API (ex: '/clans/clanTag')
 * @returns Promise com os dados em JSON
 */
export async function supercellFetch(endpoint: string): Promise<SupercellApiResponse> {
  const url = `${SUPERCELL_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPERCELL_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store', // Evita cache indesejado
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erro na API da Supercell: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao fazer requisição para Supercell API:', error);
    throw error;
  }
}

/**
 * Função utilitária para codificar o clan tag
 * @param clanTag - O tag do clã (ex: '#SEU_CLAN_TAG')
 * @returns O tag codificado para URL
 */
export function encodeClanTag(clanTag: string): string {
  return clanTag.replace('#', '%23');
}
