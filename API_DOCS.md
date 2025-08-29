# API Documentation - Clan App

## Endpoints Disponíveis

Esta aplicação fornece endpoints internos para acessar dados da API do Clash of Clans de forma segura, sem expor o token da Supercell no frontend.

### Configuração

Antes de usar os endpoints, certifique-se de configurar as variáveis de ambiente no arquivo `.env.local`:

```env
SUPERCELL_API_TOKEN=sua_chave_da_supercell_aqui
SUPERCELL_BASE_URL=https://api.clashofclans.com/v1
CLAN_TAG=#seu_clan_tag_aqui
```

### Endpoints

#### 1. GET `/api/clan`
Retorna dados completos do clã.

**Resposta de exemplo:**
```json
{
  "tag": "#CLANTAG",
  "name": "Nome do Clã",
  "type": "open",
  "description": "Descrição do clã",
  "location": { ... },
  "badgeUrls": { ... },
  "clanLevel": 15,
  "clanPoints": 45000,
  "memberList": [ ... ],
  ...
}
```

#### 2. GET `/api/members`
Retorna apenas a lista de membros do clã.

**Resposta de exemplo:**
```json
{
  "memberList": [
    {
      "tag": "#PLAYERTAG",
      "name": "Nome do Jogador",
      "role": "member",
      "expLevel": 150,
      "trophies": 3000,
      ...
    }
  ],
  "memberCount": 25
}
```

#### 3. GET `/api/war`
Retorna dados da guerra atual do clã.

**Resposta de exemplo:**
```json
{
  "state": "inWar",
  "teamSize": 15,
  "attacksPerMember": 2,
  "preparationStartTime": "20240829T120000.000Z",
  "startTime": "20240830T120000.000Z",
  "endTime": "20240831T120000.000Z",
  "clan": { ... },
  "opponent": { ... }
}
```

#### 4. GET `/api/raids`
Retorna dados das temporadas de raid da capital do clã.

**Resposta de exemplo:**
```json
{
  "items": [
    {
      "state": "ended",
      "startTime": "20240825T070000.000Z",
      "endTime": "20240901T070000.000Z",
      "capitalTotalLoot": 1500,
      "raidsCompleted": 5,
      "totalAttacks": 150,
      ...
    }
  ]
}
```

### Tratamento de Erros

Todos os endpoints retornam erros padronizados em caso de falha:

```json
{
  "error": "Descrição do erro"
}
```

Códigos de status HTTP utilizados:
- `200`: Sucesso
- `500`: Erro interno do servidor

### Arquitetura

- **Frontend**: Consome apenas os endpoints internos (`/api/*`)
- **Backend**: Protege o token da Supercell e faz as chamadas para a API externa
- **Segurança**: Token da Supercell nunca é exposto no frontend
- **Cache**: Configurado com `cache: "no-store"` para dados sempre atualizados
