import { NextResponse } from 'next/server';

/**
 * GET /api/debug
 * Endpoint para debug das variáveis de ambiente
 */
export async function GET() {
  return NextResponse.json({
    hasToken: !!process.env.SUPERCELL_API_TOKEN,
    hasBaseUrl: !!process.env.SUPERCELL_BASE_URL,
    hasClanTag: !!process.env.CLAN_TAG,
    clanTag: process.env.CLAN_TAG, // Para debug - remover em produção
    baseUrl: process.env.SUPERCELL_BASE_URL,
    tokenLength: process.env.SUPERCELL_API_TOKEN?.length || 0,
  });
}
