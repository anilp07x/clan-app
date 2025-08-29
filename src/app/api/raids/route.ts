import { NextResponse } from 'next/server';
import { supercellFetch, encodeClanTag } from '../../../../lib/supercell';

/**
 * GET /api/raids
 * Retorna dados da capital do clã (raid seasons)
 */
export async function GET() {
  try {
    const clanTag = process.env.CLAN_TAG;
    
    if (!clanTag) {
      return NextResponse.json(
        { error: 'CLAN_TAG não encontrado nas variáveis de ambiente' },
        { status: 500 }
      );
    }

    const encodedClanTag = encodeClanTag(clanTag);
    const endpoint = `/clans/${encodedClanTag}/capitalraidseasons`;
    
    const raidsData = await supercellFetch(endpoint);
    
    return NextResponse.json(raidsData);
  } catch (error) {
    console.error('Erro ao buscar dados das raids:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao buscar dados das raids' },
      { status: 500 }
    );
  }
}
