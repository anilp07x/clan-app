import { NextResponse } from 'next/server';
import { supercellFetch, encodeClanTag } from '../../../../lib/supercell';

/**
 * GET /api/members
 * Retorna apenas a lista de membros do clã
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
    
    // Retorna apenas a lista de membros
    const memberList = Array.isArray(clanData.memberList) ? clanData.memberList : [];
    
    return NextResponse.json({
      memberList,
      memberCount: memberList.length
    });
  } catch (error) {
    console.error('Erro ao buscar membros do clã:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao buscar membros do clã' },
      { status: 500 }
    );
  }
}
