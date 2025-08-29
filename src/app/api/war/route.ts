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
    
    try {
      const warData = await supercellFetch(endpoint);
      return NextResponse.json(warData);
    } catch (apiError: unknown) {
      const errorMessage = apiError instanceof Error ? apiError.message : String(apiError);
      
      // Se for erro 403, pode ser guerra privada ou em preparação restrita
      if (errorMessage.includes('403')) {
        console.log('Guerra privada ou restrita - tentando buscar informações do clã');
        
        // Buscar dados do clã para ver se há indicações de guerra
        try {
          const clanData = await supercellFetch(`/clans/${encodedClanTag}`);
          
          // Verificar se o clã tem labels de guerra
          const labels = Array.isArray(clanData.labels) ? clanData.labels : [];
          const hasWarLabel = labels.some((label: { name: string }) => 
            label.name === 'Clan Wars' || label.name === 'Clan War League'
          );
          
          return NextResponse.json({
            state: 'warPrivate',
            reason: 'Guerra privada ou indisponível',
            message: hasWarLabel 
              ? 'O clã participa de guerras, mas os dados atuais estão privados ou indisponíveis.'
              : 'O clã pode não estar em guerra no momento ou os dados estão privados.',
            hasWarParticipation: hasWarLabel,
            clanInfo: {
              name: clanData.name,
              level: clanData.clanLevel,
              members: clanData.members
            }
          });
        } catch (clanError) {
          console.error('Erro ao buscar dados do clã:', clanError);
          return NextResponse.json({
            state: 'notInWar',
            reason: 'Dados de guerra indisponíveis',
            message: 'Não foi possível acessar informações sobre a guerra atual.'
          });
        }
      }
      
      // Para outros erros da API, relança o erro
      throw apiError;
    }
    
  } catch (error) {
    console.error('Erro ao buscar dados da guerra:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao buscar dados da guerra' },
      { status: 500 }
    );
  }
}
