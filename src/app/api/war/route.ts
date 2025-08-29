import { NextResponse } from 'next/server';
import { supercellFetch, encodeClanTag } from '../../../../lib/supercell';

/**
 * GET /api/war
 * Retorna dados da guerra atual do clã
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
    const endpoint = `/clans/${encodedClanTag}/currentwar`;
    
    const warData = await supercellFetch(endpoint);
    
    return NextResponse.json(warData);
  } catch (error) {
    console.error('Erro ao buscar dados da guerra:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao buscar dados da guerra' },
      { status: 500 }
    );
  }
}
