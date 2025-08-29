import { NextResponse } from 'next/server';
import { supercellFetch } from '../../../../lib/supercell';

/**
 * GET /api/locations
 * Retorna lista de localizações disponíveis para rankings
 */
export async function GET() {
  try {
    console.log('📍 Buscando lista de localizações...');
    const locationsData = await supercellFetch('/locations');
    
    return NextResponse.json(locationsData);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Erro ao buscar localizações:', errorMessage);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: errorMessage },
      { status: 500 }
    );
  }
}
