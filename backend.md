Você é um especialista em Next.js (App Router, TypeScript) e integração com APIs externas.  
Quero que você implemente a camada de conectividade com a **API do Clash of Clans** da Supercell neste projeto chamado `clan-app`.  
Siga estas instruções de forma profissional e bem estruturada:

### Estrutura esperada

clan-app/
├── lib/
│ └── supercell.ts # Centraliza chamadas à Supercell API
├── app/
│ └── api/
│ ├── clan/route.ts # Endpoint interno que retorna dados do clã
│ ├── members/route.ts # Endpoint interno que retorna apenas a lista de membros
│ ├── war/route.ts # Endpoint interno que retorna dados da guerra atual
│ └── raids/route.ts # Endpoint interno que retorna dados da capital do clã


### Requisitos técnicos
1. A API da Supercell usa **Bearer Token**.  
   - Armazenar a chave em variáveis de ambiente (`.env.local`):  
     ```
     SUPERCELL_API_TOKEN=COLE_SUA_KEY_AQUI
     SUPERCELL_BASE_URL=https://api.clashofclans.com/v1
     CLAN_TAG=#SEU_CLAN_TAG
     ```
   - Nunca expor o token no frontend.

2. Em `lib/supercell.ts`, criar uma função `supercellFetch(endpoint: string)` que:  
   - Usa `fetch` com headers corretos.  
   - Lança erro se a resposta não for `ok`.  
   - Retorna os dados em JSON.

3. Em cada rota da pasta `app/api/`, criar um handler `GET` que:  
   - Constrói o endpoint correto da Supercell API.  
   - Usa `supercellFetch` para buscar os dados.  
   - Retorna a resposta via `NextResponse.json`.  
   - Exemplo:  
     - `/api/clan` → `GET /clans/{clanTag}`  
     - `/api/members` → retorna apenas `memberList` do mesmo endpoint.  
     - `/api/war` → `GET /clans/{clanTag}/currentwar`  
     - `/api/raids` → `GET /clans/{clanTag}/capitalraidseasons`

4. Usar boas práticas:  
   - Codificar o `#` do clanTag (`replace("#", "%23")`).  
   - Definir `cache: "no-store"` nas chamadas para evitar cache indesejado.  
   - Tipar as respostas com `any` por enquanto, mas deixar preparado para interfaces futuras.

### Objetivo
- O frontend do projeto deve consumir **apenas os endpoints internos** (`/api/clan`, `/api/members`, etc.).  
- O token da Supercell deve estar protegido no backend.  
- O código deve ser limpo, escalável e pronto para expansão futura.
