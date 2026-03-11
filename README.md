# StudyOS — Plataforma de Estudos para UFRGS/ENEM

Plataforma gamificada de estudos construída com Next.js 14, TypeScript e design sci-fi dark mode. Sistema completo com questões de vestibulares, XP, conquistas, cronogramas e videoaulas.

## Stack Técnica

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Autenticação**: NextAuth.js v5 (Google OAuth + Email/Senha)
- **Banco de Dados**: Supabase (PostgreSQL) + Prisma ORM
- **Estilização**: Tailwind CSS + Framer Motion
- **Estado Global**: Zustand
- **Gráficos**: Recharts
- **Fontes**: Syne (display) + DM Sans (body) + JetBrains Mono (código)
- **Deploy**: Vercel

## Funcionalidades

- Landing page com animações e partículas
- Dashboard com stats, gráfico radar e questão do dia
- 12 matérias com tópicos, subtópicos e progresso
- Sistema de questões com 4 modos (Livre, Simulado, Revisão, Maratona)
- XP, níveis (Calouro → Lenda), combo e streak
- 30+ conquistas com raridades (Comum → Lendário)
- Cronograma semanal interativo com heatmap
- Leaderboard com pódio animado
- Perfil com estatísticas completas
- Videoaulas do YouTube organizadas por tópico
- Design dark mode com glassmorphism e glow effects

## Setup Local

### Pré-requisitos
- Node.js 18+
- PostgreSQL (ou conta Supabase)

### Instalação

```bash
# Clonar e instalar
git clone <repo-url>
cd plataforma-estudos
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Gerar Prisma Client
npx prisma generate

# Criar tabelas (com banco configurado)
npx prisma db push

# Rodar em desenvolvimento
npm run dev
```

### Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL de conexão PostgreSQL (Supabase) |
| `DIRECT_URL` | URL direta do PostgreSQL |
| `NEXTAUTH_SECRET` | Secret para NextAuth (gerar com `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | URL da aplicação (`http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | Client ID do Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Client Secret do Google OAuth |

## Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/          # Login e registro
│   ├── (dashboard)/     # Área logada
│   │   ├── dashboard/   # Painel principal
│   │   ├── subjects/    # Matérias e tópicos
│   │   ├── practice/    # Sistema de questões
│   │   ├── schedule/    # Cronograma
│   │   ├── achievements/# Conquistas
│   │   ├── leaderboard/ # Ranking
│   │   └── profile/     # Perfil
│   ├── api/             # API routes
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # Glass cards, buttons, progress bars
│   ├── layout/          # Sidebar, header, particles
│   └── ...
├── lib/                 # Prisma, auth, utils, constants, seed
├── hooks/               # useXP, useStreak, useProgress
└── stores/              # Zustand stores
```

## Matérias Disponíveis

| Área | Matérias |
|------|----------|
| Matemática | Matemática |
| Ciências da Natureza | Física, Química, Biologia |
| Linguagens | Português, Redação, Inglês |
| Ciências Humanas | História, Geografia, Filosofia, Sociologia |

## Sistema de Gamificação

- **XP**: Fácil +10, Médio +20, Difícil +35
- **Combo**: x1.5 (3+), x2 (5+), x3 (10+)
- **Níveis**: Calouro → Estudante → Dedicado → ... → Gênio → Lenda
- **Streak**: Dias consecutivos com bônus de 50%+ XP após 3 dias
- **30+ Conquistas**: De "Primeira Questão" a "Mestre Supremo"

## Deploy na Vercel

1. Push do código para GitHub
2. Importar projeto na Vercel
3. Configurar variáveis de ambiente
4. Deploy automático

O arquivo `vercel.json` já está configurado.

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linting
```
