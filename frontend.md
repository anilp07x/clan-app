Você é um especialista em UX/UI design para interfaces web modernas.  
Implemente o front-end de um dashboard em **Next.js + TailwindCSS + ShadCN/UI + Recharts** com as seguintes características de design:

### Atenção
- **Não usa emoji no frontend**
- **Usa os ícones vindo da API**

### Design esperado
- **Estilo geral**
  - Minimalista e moderno.
  - Sem gradientes, sem motion/animations.
  - Fundo claro, espaçamento generoso, bordas arredondadas grandes (`rounded-2xl`).
  - Tipografia clean: títulos médios (`text-xl font-semibold`), textos base (`text-sm text-gray-600`).

- **Layout**
  - **Navbar fixa no topo**:
    - Escudo do clã (ícone vindo da API ou placeholder).
    - Nome e tag do clã ao lado do escudo.
    - Links horizontais simples: *Dashboard, Membros, Guerras, Raids*.
    - Mobile-first → menu deve colapsar em ícone hamburguer, mas manter design minimalista.
  - **Conteúdo principal (main)**:
    - Grid responsivo de **cards** (1 coluna no mobile, 2–3 no desktop).
    - Cada card exibe métricas do clã (participação em guerras, raids, doações, troféus).
    - Cards devem ser clean, com sombra leve (`shadow-md`) e padding (`p-4`).
  - **Área para gráficos (Recharts)**:
    - Um `LineChart` mostrando evolução dos troféus do clã (mockado inicialmente).
    - Um `BarChart` para participação dos membros em guerras/raids (mockado inicialmente).
  - **Footer simples**:
    - Texto pequeno e discreto, sem distrações.

### Responsividade
- Mobile-first: navbar compacta, cards em 1 coluna.
- Tablets/desktop: expandir para 2–3 colunas de cards e navbar completa.
- Sempre preservar a clareza visual e evitar sobrecarga de informações.

### Objetivo
Gerar apenas a **interface inicial** com placeholders, pronta para depois receber dados da API.  
Não usar animações, não usar gradientes, não adicionar complexidade desnecessária.  
O resultado deve ser limpo, responsivo e elegante.
