import { NextResponse } from 'next/server';
import { supercellFetch, encodeClanTag } from '../../../../lib/supercell';

/**
 * GET /api/clan
 * Retorna dados completos do clã
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
    const endpoint = `/clans/${encodedClanTag}`;
    
    const clanData = await supercellFetch(endpoint);
    
    return NextResponse.json(clanData);
  } catch (error) {
    console.error('Erro ao buscar dados do clã:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor ao buscar dados do clã',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
