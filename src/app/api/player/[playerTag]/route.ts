import { NextRequest, NextResponse } from 'next/server';
import { supercellFetch, encodeClanTag } from '../../../../../lib/supercell';

/**
 * GET /api/player/[playerTag]
 * Retorna dados detalhados de um jogador específico
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { playerTag: string } }
) {
  try {
    const playerTag = params.playerTag;
    
    if (!playerTag) {
      return NextResponse.json(
        { error: 'Player tag é obrigatório' },
        { status: 400 }
      );
    }

    // Decodificar a tag se necessário
    const decodedTag = decodeURIComponent(playerTag);
    const encodedTag = encodeClanTag(decodedTag);
    const endpoint = `/players/${encodedTag}`;
    
    console.log(`🔍 Buscando dados do jogador: ${decodedTag}`);
    const playerData = await supercellFetch(endpoint);
    
    return NextResponse.json(playerData);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Erro ao buscar dados do jogador:', errorMessage);
    
    if (errorMessage.includes('404')) {
      return NextResponse.json({
        error: 'notFound',
        message: 'Jogador não encontrado. Verifique se a tag está correta.',
        playerTag: params.playerTag
      }, { status: 404 });
    }
    
    if (errorMessage.includes('403')) {
      return NextResponse.json({
        error: 'accessDenied',
        message: 'Acesso negado. O perfil do jogador pode estar privado.',
        playerTag: params.playerTag
      }, { status: 403 });
    }
    
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: errorMessage },
      { status: 500 }
    );
  }
}
