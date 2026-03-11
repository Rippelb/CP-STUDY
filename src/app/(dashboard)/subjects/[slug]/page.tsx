"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  PlayCircle,
  BarChart3,
  Video,
  CheckCircle2,
  Circle,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { Badge } from "@/components/ui/badge";
import { GlowButton } from "@/components/ui/glow-button";
import { cn, getSubjectColor } from "@/lib/utils";

const tabs = [
  { id: "conteudos", label: "Conteúdos", icon: BookOpen },
  { id: "exercicios", label: "Exercícios", icon: PlayCircle },
  { id: "desempenho", label: "Desempenho", icon: BarChart3 },
  { id: "videoaulas", label: "Videoaulas", icon: Video },
];

// Topic/video data for all subjects (zeroed mastery for fresh user)
type TopicData = {
  id: string; name: string; description: string; mastery: number;
  questionsTotal: number; questionsAnswered: number; studied: boolean; subtopics: string[];
};
type VideoData = { title: string; channel: string; duration: string; url: string; watched: boolean; };
type SubjectEntry = { name: string; topics: TopicData[]; videos: VideoData[]; };

const t = (id: string, name: string, desc: string, qTotal: number, subs: string[]): TopicData => ({
  id, name, description: desc, mastery: 0, questionsTotal: qTotal, questionsAnswered: 0, studied: false, subtopics: subs,
});
const v = (title: string, channel: string, duration: string): VideoData => ({
  title, channel, duration, url: "#", watched: false,
});

const subjectData: Record<string, SubjectEntry> = {
  matematica: {
    name: "Matemática",
    topics: [
      t("1", "Fundamentos da Matemática", "Frações, potenciação, radiciação e operações básicas", 30, ["Frações", "MMC e MDC", "Potenciação e Radiciação"]),
      t("2", "Razão, Proporção e Regra de 3", "Grandezas proporcionais, regra de três simples e composta", 25, ["Razão e Proporção", "Regra de 3 Simples", "Regra de 3 Composta"]),
      t("3", "Porcentagem e Matemática Financeira", "Descontos, acréscimos, juros simples e compostos", 20, ["Porcentagem", "Juros Simples", "Juros Compostos"]),
      t("4", "Estatística", "Média, mediana, moda e desvio padrão", 20, ["Média Aritmética", "Mediana e Moda", "Desvio Padrão"]),
      t("5", "Funções", "Função do 1° e 2° grau, exponencial e logarítmica", 35, ["Função do 1° Grau", "Função do 2° Grau", "Função Exponencial", "Função Logarítmica"]),
      t("6", "Geometria Plana", "Áreas, perímetros e relações geométricas", 25, ["Triângulos", "Quadriláteros", "Círculos"]),
      t("7", "Trigonometria", "Seno, cosseno, tangente e funções trigonométricas", 20, ["Razões Trigonométricas", "Ciclo Trigonométrico", "Funções Trigonométricas"]),
      t("8", "Geometria Espacial", "Prismas, pirâmides, cones, cilindros e esferas", 20, ["Prismas e Cilindros", "Pirâmides e Cones", "Esferas"]),
      t("9", "Análise Combinatória e Probabilidade", "Permutações, combinações, arranjos e probabilidade", 25, ["Princípio Fundamental", "Combinações e Arranjos", "Probabilidade"]),
    ],
    videos: [
      v("Fundamentos de Matemática para o ENEM", "Ferreto Matemática", "45:20"),
      v("Porcentagem e Matemática Financeira", "Ferreto Matemática", "38:15"),
      v("Funções: do Básico ao Avançado", "Ferreto Matemática", "1:02:30"),
      v("Geometria Plana Completa", "Ferreto Matemática", "55:00"),
      v("Análise Combinatória e Probabilidade", "Ferreto Matemática", "1:02:45"),
    ],
  },
  fisica: {
    name: "Física",
    topics: [
      t("1", "Cinemática", "MRU, MRUV, gráficos de movimento", 30, ["MRU", "MRUV", "Queda Livre", "Lançamentos"]),
      t("2", "Dinâmica", "Leis de Newton, força, aceleração", 25, ["1ª Lei de Newton", "2ª Lei de Newton", "3ª Lei de Newton", "Atrito"]),
      t("3", "Energia e Trabalho", "Conservação de energia, cinética e potencial", 25, ["Energia Cinética", "Energia Potencial", "Conservação de Energia", "Potência"]),
      t("4", "Termologia", "Calor, temperatura, termodinâmica", 20, ["Calorimetria", "Dilatação", "Termodinâmica", "Gases Ideais"]),
      t("5", "Óptica", "Reflexão, refração, lentes e espelhos", 20, ["Reflexão", "Refração", "Lentes", "Espelhos"]),
      t("6", "Ondulatória", "Ondas mecânicas, acústica e fenômenos ondulatórios", 20, ["Ondas Mecânicas", "Acústica", "Fenômenos Ondulatórios"]),
      t("7", "Eletrostática", "Carga, campo e potencial elétrico", 25, ["Carga Elétrica", "Lei de Coulomb", "Campo Elétrico", "Potencial"]),
      t("8", "Eletrodinâmica", "Corrente, resistência, circuitos", 25, ["Lei de Ohm", "Circuitos", "Potência Elétrica"]),
    ],
    videos: [
      v("Cinemática Completa para o ENEM", "Física Total", "1:30:00"),
      v("Leis de Newton — Curso Completo", "Física Total", "48:30"),
      v("Termodinâmica e Calorimetria", "Física Total", "55:00"),
      v("Eletricidade para o ENEM", "Física Total", "42:00"),
    ],
  },
  quimica: {
    name: "Química",
    topics: [
      t("1", "Estrutura Atômica", "Modelos atômicos, distribuição eletrônica", 20, ["Modelos Atômicos", "Números Quânticos", "Distribuição Eletrônica"]),
      t("2", "Tabela Periódica", "Propriedades periódicas e classificação dos elementos", 20, ["Classificação dos Elementos", "Propriedades Periódicas", "Famílias Importantes"]),
      t("3", "Ligações Químicas", "Iônica, covalente e metálica", 25, ["Ligação Iônica", "Ligação Covalente", "Ligação Metálica", "Geometria Molecular"]),
      t("4", "Funções Inorgânicas", "Ácidos, bases, sais e óxidos", 25, ["Ácidos", "Bases", "Sais", "Óxidos"]),
      t("5", "Estequiometria", "Cálculos com reações, balanceamento", 30, ["Balanceamento", "Mol e Massa Molar", "Cálculo Estequiométrico", "Rendimento"]),
      t("6", "Soluções", "Concentração, diluição e mistura", 20, ["Concentração Comum", "Molaridade", "Diluição e Mistura"]),
      t("7", "Termoquímica", "Entalpia, Lei de Hess, energia de ligação", 20, ["Entalpia", "Lei de Hess", "Energia de Ligação"]),
      t("8", "Cinética e Equilíbrio", "Velocidade de reação, equilíbrio químico", 25, ["Velocidade de Reação", "Fatores Cinéticos", "Equilíbrio Químico", "Le Chatelier"]),
      t("9", "Eletroquímica", "Pilhas, eletrólise, potenciais de redução", 20, ["Pilhas", "Eletrólise", "Potencial de Redução"]),
      t("10", "Química Orgânica", "Funções orgânicas, isomeria, reações", 30, ["Hidrocarbonetos", "Funções Oxigenadas", "Isomeria", "Reações Orgânicas"]),
    ],
    videos: [
      v("Química Geral para o ENEM", "Marcelinho da Química", "1:20:00"),
      v("Estequiometria — Tudo que Cai no ENEM", "Marcelinho da Química", "45:00"),
      v("Química Orgânica Completa", "Marcelinho da Química", "1:10:00"),
      v("Eletroquímica Descomplicada", "Marcelinho da Química", "38:00"),
    ],
  },
  biologia: {
    name: "Biologia",
    topics: [
      t("1", "Citologia", "Célula, organelas, membrana e metabolismo celular", 30, ["Membrana Plasmática", "Organelas", "Mitose e Meiose", "Metabolismo Energético"]),
      t("2", "Bioquímica", "Proteínas, carboidratos, lipídios e ácidos nucleicos", 25, ["Proteínas", "Carboidratos", "Lipídios", "Ácidos Nucleicos"]),
      t("3", "Genética", "Leis de Mendel, herança, genética molecular", 30, ["1ª Lei de Mendel", "2ª Lei de Mendel", "Herança Ligada ao Sexo", "Genética Molecular"]),
      t("4", "Evolução", "Teorias evolutivas, seleção natural, especiação", 20, ["Darwin e Lamarck", "Seleção Natural", "Especiação", "Evidências da Evolução"]),
      t("5", "Ecologia", "Ecossistemas, cadeias alimentares, ciclos biogeoquímicos", 30, ["Cadeias Alimentares", "Ciclos Biogeoquímicos", "Biomas", "Impactos Ambientais"]),
      t("6", "Fisiologia Humana", "Sistemas do corpo humano", 30, ["Sistema Digestório", "Sistema Circulatório", "Sistema Nervoso", "Sistema Endócrino"]),
      t("7", "Botânica", "Grupos vegetais, fisiologia vegetal", 20, ["Grupos Vegetais", "Fotossíntese", "Hormônios Vegetais", "Reprodução"]),
      t("8", "Zoologia", "Classificação e características dos animais", 20, ["Invertebrados", "Vertebrados", "Classificação Biológica"]),
    ],
    videos: [
      v("Citologia Completa para o ENEM", "Kennedy Ramos", "1:15:00"),
      v("Genética — Do Básico ao Avançado", "Kennedy Ramos", "58:00"),
      v("Ecologia para o ENEM", "Kennedy Ramos", "1:05:00"),
      v("Fisiologia Humana Resumo", "Kennedy Ramos", "50:00"),
    ],
  },
  portugues: {
    name: "Língua Portuguesa",
    topics: [
      t("1", "Interpretação de Texto", "Compreensão, inferência e tipologia textual", 35, ["Compreensão Textual", "Inferência", "Tipologia Textual", "Gêneros Textuais"]),
      t("2", "Gramática", "Classes de palavras, sintaxe, regência e concordância", 30, ["Classes de Palavras", "Sintaxe", "Regência", "Concordância", "Crase"]),
      t("3", "Literatura Brasileira", "Escolas literárias do Brasil", 25, ["Barroco e Arcadismo", "Romantismo", "Realismo e Naturalismo", "Modernismo"]),
      t("4", "Literatura Portuguesa", "Escolas literárias de Portugal", 20, ["Trovadorismo", "Classicismo", "Romantismo Português", "Fernando Pessoa"]),
      t("5", "Semântica e Estilística", "Figuras de linguagem, polissemia, denotação e conotação", 20, ["Figuras de Linguagem", "Denotação e Conotação", "Polissemia", "Variação Linguística"]),
      t("6", "Funções da Linguagem", "Referencial, emotiva, conativa, poética, fática e metalinguística", 15, ["Função Referencial", "Função Emotiva", "Função Poética", "Função Metalinguística"]),
    ],
    videos: [
      v("Interpretação de Texto — ENEM", "Português com Noslen", "42:00"),
      v("Gramática Essencial para o ENEM", "Português com Noslen", "1:30:00"),
      v("Literatura Brasileira Completa", "Português com Noslen", "1:15:00"),
      v("Figuras de Linguagem", "Português com Noslen", "35:00"),
    ],
  },
  historia: {
    name: "História",
    topics: [
      t("1", "Brasil Colônia", "Descobrimento, ciclos econômicos, sociedade colonial", 25, ["Descobrimento", "Ciclo do Açúcar", "Mineração", "Sociedade Colonial"]),
      t("2", "Brasil Império", "Independência, Primeiro e Segundo Reinado", 25, ["Independência", "Primeiro Reinado", "Período Regencial", "Segundo Reinado"]),
      t("3", "Brasil República", "República Velha, Era Vargas, Ditadura, Redemocratização", 30, ["República Velha", "Era Vargas", "Ditadura Militar", "Redemocratização"]),
      t("4", "História Antiga", "Grécia, Roma, Egito e Mesopotâmia", 20, ["Grécia Antiga", "Roma Antiga", "Egito e Mesopotâmia"]),
      t("5", "Idade Média", "Feudalismo, Cruzadas, Igreja Medieval", 20, ["Feudalismo", "Cruzadas", "Igreja e Poder", "Baixa Idade Média"]),
      t("6", "Idade Moderna", "Renascimento, Reformas, Absolutismo, Iluminismo", 25, ["Renascimento", "Reforma Protestante", "Absolutismo", "Iluminismo"]),
      t("7", "Revoluções", "Revolução Francesa, Industrial, Americana", 25, ["Revolução Francesa", "Revolução Industrial", "Independência dos EUA"]),
      t("8", "Século XX", "Guerras Mundiais, Guerra Fria, Globalização", 25, ["Primeira Guerra", "Segunda Guerra", "Guerra Fria", "Globalização"]),
    ],
    videos: [
      v("Brasil Colônia — Revisão Completa", "Se Liga Nessa História", "55:00"),
      v("Era Vargas e República", "Se Liga Nessa História", "48:00"),
      v("Revolução Francesa Completa", "Se Liga Nessa História", "40:00"),
      v("Guerras Mundiais para o ENEM", "Se Liga Nessa História", "1:00:00"),
    ],
  },
  geografia: {
    name: "Geografia",
    topics: [
      t("1", "Cartografia", "Mapas, escalas, projeções e coordenadas", 20, ["Projeções Cartográficas", "Escalas", "Coordenadas Geográficas", "Fusos Horários"]),
      t("2", "Geologia e Geomorfologia", "Estrutura da Terra, relevo e solos", 20, ["Estrutura da Terra", "Tipos de Relevo", "Solos", "Agentes Modeladores"]),
      t("3", "Climatologia", "Climas do Brasil e do mundo, fenômenos climáticos", 20, ["Fatores Climáticos", "Climas do Brasil", "Fenômenos Climáticos", "Mudanças Climáticas"]),
      t("4", "Hidrografia", "Bacias hidrográficas, ciclo da água", 15, ["Bacias Hidrográficas", "Ciclo da Água", "Recursos Hídricos"]),
      t("5", "Biomas e Meio Ambiente", "Biomas brasileiros e mundiais, questões ambientais", 25, ["Biomas Brasileiros", "Biomas Mundiais", "Desmatamento", "Sustentabilidade"]),
      t("6", "Geografia Urbana", "Urbanização, problemas urbanos, redes urbanas", 20, ["Urbanização Brasileira", "Problemas Urbanos", "Redes e Hierarquia Urbana"]),
      t("7", "Geografia Agrária", "Agricultura, reforma agrária, agronegócio", 20, ["Estrutura Fundiária", "Agronegócio", "Agricultura Familiar", "Reforma Agrária"]),
      t("8", "Geopolítica", "Ordem mundial, conflitos, organizações internacionais", 25, ["Nova Ordem Mundial", "Conflitos Geopolíticos", "Organizações Internacionais", "Globalização"]),
      t("9", "Demografia", "População, migrações, indicadores sociais", 20, ["Crescimento Demográfico", "Migrações", "Indicadores Sociais", "Pirâmide Etária"]),
    ],
    videos: [
      v("Cartografia para o ENEM", "Geografalando", "38:00"),
      v("Climatologia Completa", "Geografalando", "45:00"),
      v("Geopolítica e Ordem Mundial", "Geografalando", "52:00"),
      v("Biomas Brasileiros", "Geografalando", "40:00"),
    ],
  },
  filosofia: {
    name: "Filosofia",
    topics: [
      t("1", "Filosofia Antiga", "Pré-socráticos, Sócrates, Platão e Aristóteles", 20, ["Pré-Socráticos", "Sócrates", "Platão", "Aristóteles"]),
      t("2", "Filosofia Medieval", "Patrística e Escolástica", 15, ["Santo Agostinho", "São Tomás de Aquino", "Fé e Razão"]),
      t("3", "Filosofia Moderna", "Racionalismo, Empirismo e Iluminismo", 20, ["Descartes", "Locke e Hume", "Kant", "Iluminismo"]),
      t("4", "Filosofia Contemporânea", "Existencialismo, Escola de Frankfurt, Pós-modernidade", 20, ["Nietzsche", "Existencialismo", "Escola de Frankfurt", "Foucault"]),
      t("5", "Ética e Moral", "Teorias éticas, bioética, ética e política", 20, ["Ética Aristotélica", "Ética Kantiana", "Utilitarismo", "Bioética"]),
      t("6", "Filosofia Política", "Estado, poder, democracia e justiça", 20, ["Contratualismo", "Marx e o Estado", "Democracia", "Justiça Social"]),
    ],
    videos: [
      v("Filosofia Antiga para o ENEM", "Se Liga Filosofia", "42:00"),
      v("Filosofia Moderna — Descartes a Kant", "Se Liga Filosofia", "48:00"),
      v("Ética e Moral Completo", "Se Liga Filosofia", "35:00"),
      v("Filosofia Contemporânea", "Se Liga Filosofia", "40:00"),
    ],
  },
  sociologia: {
    name: "Sociologia",
    topics: [
      t("1", "Clássicos da Sociologia", "Durkheim, Weber e Marx", 20, ["Durkheim", "Max Weber", "Karl Marx", "Conceitos Fundamentais"]),
      t("2", "Cultura e Sociedade", "Indústria cultural, diversidade, identidade", 20, ["Indústria Cultural", "Diversidade", "Cultura de Massa", "Identidade"]),
      t("3", "Trabalho e Sociedade", "Fordismo, toyotismo, precarização, tecnologia", 20, ["Fordismo e Toyotismo", "Precarização do Trabalho", "Trabalho e Tecnologia"]),
      t("4", "Estratificação e Desigualdade", "Classes sociais, mobilidade, exclusão", 20, ["Classes Sociais", "Mobilidade Social", "Desigualdade", "Exclusão Social"]),
      t("5", "Poder e Estado", "Tipos de poder, Estado moderno, democracia", 20, ["Tipos de Poder", "Estado Moderno", "Democracia", "Movimentos Sociais"]),
      t("6", "Cidadania e Direitos", "Direitos humanos, cidadania, gênero e raça", 20, ["Direitos Humanos", "Cidadania", "Questões de Gênero", "Questão Racial"]),
    ],
    videos: [
      v("Durkheim, Weber e Marx — Resumo", "Sociologia Animada", "45:00"),
      v("Cultura e Sociedade para o ENEM", "Sociologia Animada", "38:00"),
      v("Trabalho e Sociedade", "Sociologia Animada", "35:00"),
      v("Cidadania e Direitos Humanos", "Sociologia Animada", "32:00"),
    ],
  },
  redacao: {
    name: "Redação",
    topics: [
      t("1", "Estrutura do Texto Dissertativo-Argumentativo", "Introdução, desenvolvimento e conclusão", 25, ["Introdução e Tese", "Desenvolvimento", "Conclusão e Proposta de Intervenção"]),
      t("2", "Competências do ENEM", "As 5 competências avaliadas na redação do ENEM", 20, ["Competência 1 — Norma Culta", "Competência 2 — Tema e Repertório", "Competência 3 — Argumentação", "Competência 4 — Coesão", "Competência 5 — Proposta de Intervenção"]),
      t("3", "Repertório Sociocultural", "Filósofos, dados, leis e referências para argumentação", 20, ["Referências Filosóficas", "Dados e Estatísticas", "Leis e Constituição", "Citações e Autores"]),
      t("4", "Tipos de Introdução", "Diferentes formas de iniciar uma redação", 15, ["Contextualização Histórica", "Citação", "Dados Estatísticos", "Pergunta Retórica"]),
      t("5", "Conectivos e Coesão", "Uso de conectivos para coesão textual", 15, ["Conectivos de Adição", "Conectivos de Oposição", "Conectivos de Conclusão", "Referenciação"]),
    ],
    videos: [
      v("Como fazer uma Redação Nota 1000", "Redação Online", "55:00"),
      v("As 5 Competências do ENEM", "Redação Online", "42:00"),
      v("Repertório Sociocultural para Redação", "Redação Online", "38:00"),
      v("Propostas de Intervenção Perfeitas", "Redação Online", "30:00"),
    ],
  },
  ingles: {
    name: "Língua Inglesa",
    topics: [
      t("1", "Interpretação de Textos em Inglês", "Compreensão de textos, cognatos, inferência", 20, ["Cognatos e Falsos Cognatos", "Skimming e Scanning", "Inferência", "Gêneros Textuais"]),
      t("2", "Gramática Essencial", "Tempos verbais, preposições, artigos", 20, ["Verb Tenses", "Prepositions", "Articles", "Pronouns"]),
      t("3", "Vocabulário Temático", "Vocabulário por temas frequentes no ENEM", 15, ["Technology", "Environment", "Health", "Culture"]),
      t("4", "Linking Words", "Conectivos e conjunções em inglês", 15, ["Addition", "Contrast", "Cause and Effect", "Sequence"]),
    ],
    videos: [
      v("Inglês para o ENEM — Interpretação", "English in Brazil", "40:00"),
      v("Gramática Essencial do Inglês", "English in Brazil", "50:00"),
      v("Vocabulário Temático ENEM", "English in Brazil", "35:00"),
    ],
  },
};

const defaultSubjectData: SubjectEntry = {
  name: "Matéria",
  topics: [
    t("1", "Introdução", "Conceitos fundamentais", 15, ["Conceito 1", "Conceito 2", "Conceito 3"]),
    t("2", "Desenvolvimento", "Tópicos intermediários", 20, ["Tópico 1", "Tópico 2", "Tópico 3"]),
    t("3", "Aprofundamento", "Tópicos avançados", 20, ["Avançado 1", "Avançado 2"]),
  ],
  videos: [v("Aula introdutória", "Descomplica", "30:00")],
};

export default function SubjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState("conteudos");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const data = subjectData[slug] ?? { ...defaultSubjectData, name: slug.charAt(0).toUpperCase() + slug.slice(1) };
  const color = getSubjectColor(slug);

  const overallMastery = data.topics.length > 0
    ? data.topics.reduce((sum, t) => sum + t.mastery, 0) / data.topics.length
    : 0;

  const totalQuestions = data.topics.reduce((sum, t) => sum + t.questionsTotal, 0);
  const totalAnswered = data.topics.reduce((sum, t) => sum + t.questionsAnswered, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/subjects">
          <motion.div
            whileHover={{ x: -3 }}
            className="p-2 rounded-xl bg-background-card border border-border text-foreground-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.div>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold" style={{ color }}>
            {data.name}
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            {totalAnswered} de {totalQuestions} questões resolvidas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-mono font-bold" style={{ color }}>
              {Math.round(overallMastery)}%
            </p>
            <p className="text-xs text-foreground-muted">Domínio</p>
          </div>
          <Link href={`/practice?subject=${slug}`}>
            <GlowButton glowColor={color}>
              <Zap className="w-4 h-4" />
              Praticar
            </GlowButton>
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <AnimatedProgress value={overallMastery} color={color} height="md" showLabel />

      {/* Tabs */}
      <div className="flex gap-1 bg-background-card/50 rounded-xl p-1 border border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-background-elevated text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              )}
              style={isActive ? { boxShadow: `0 0 15px ${color}22` } : undefined}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "conteudos" && (
          <motion.div
            key="conteudos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {data.topics.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard
                  variant="interactive"
                  className="!p-0 overflow-hidden"
                  noPadding
                  onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <button className="flex-shrink-0">
                        {topic.studied ? (
                          <CheckCircle2 className="w-5 h-5" style={{ color }} />
                        ) : (
                          <Circle className="w-5 h-5 text-foreground-muted" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm">{topic.name}</h3>
                          <Badge
                            variant="custom"
                            color={
                              topic.mastery >= 75
                                ? "#FFD600"
                                : topic.mastery >= 50
                                ? "#FF9100"
                                : topic.mastery >= 25
                                ? "#42A5F5"
                                : "#8888AA"
                            }
                          >
                            {topic.mastery >= 75
                              ? "Mestre"
                              : topic.mastery >= 50
                              ? "Avançado"
                              : topic.mastery >= 25
                              ? "Intermediário"
                              : "Iniciante"}
                          </Badge>
                        </div>
                        <p className="text-xs text-foreground-muted mt-0.5">
                          {topic.description}
                        </p>
                        <div className="mt-2">
                          <AnimatedProgress
                            value={topic.mastery}
                            color={color}
                            height="sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-foreground-muted font-mono">
                          {topic.questionsAnswered}/{topic.questionsTotal}
                        </span>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 text-foreground-muted transition-transform",
                            expandedTopic === topic.id && "rotate-90"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedTopic === topic.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border overflow-hidden"
                      >
                        <div className="p-4 pl-12 space-y-2">
                          {topic.subtopics.map((sub, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-3 text-sm text-foreground-muted"
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                              {sub}
                            </div>
                          ))}
                          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                            <Link href={`/practice?subject=${slug}&topic=${topic.id}`}>
                              <GlowButton size="sm" glowColor={color}>
                                <Target className="w-3 h-3" />
                                Praticar
                              </GlowButton>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "exercicios" && (
          <motion.div
            key="exercicios"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <GlassCard>
              <div className="text-center py-8">
                <PlayCircle className="w-12 h-12 mx-auto mb-4" style={{ color }} />
                <h3 className="text-lg font-display font-bold mb-2">
                  Praticar {data.name}
                </h3>
                <p className="text-sm text-foreground-muted mb-4">
                  Escolha um modo de prática para começar
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Link href={`/practice?subject=${slug}&mode=free`}>
                    <GlowButton variant="outline">Estudo Livre</GlowButton>
                  </Link>
                  <Link href={`/practice?subject=${slug}&mode=review`}>
                    <GlowButton variant="secondary">Revisão de Erros</GlowButton>
                  </Link>
                  <Link href={`/practice?subject=${slug}&mode=marathon`}>
                    <GlowButton glowColor={color}>Maratona</GlowButton>
                  </Link>
                </div>
              </div>
            </GlassCard>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              <GlassCard className="text-center">
                <p className="text-2xl font-mono font-bold" style={{ color }}>
                  {totalAnswered}
                </p>
                <p className="text-xs text-foreground-muted mt-1">Resolvidas</p>
              </GlassCard>
              <GlassCard className="text-center">
                <p className="text-2xl font-mono font-bold text-accent-green">
                  {totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0}%
                </p>
                <p className="text-xs text-foreground-muted mt-1">Taxa de Acerto</p>
              </GlassCard>
              <GlassCard className="text-center">
                <p className="text-2xl font-mono font-bold text-accent-orange">
                  {totalQuestions - totalAnswered}
                </p>
                <p className="text-xs text-foreground-muted mt-1">Pendentes</p>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {activeTab === "desempenho" && (
          <motion.div
            key="desempenho"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <GlassCard>
              <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color }} />
                Desempenho por Tópico
              </h3>
              <div className="space-y-4">
                {data.topics.map((topic) => (
                  <div key={topic.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{topic.name}</span>
                      <span className="text-xs font-mono text-foreground-muted">
                        {topic.mastery}%
                      </span>
                    </div>
                    <AnimatedProgress
                      value={topic.mastery}
                      color={color}
                      height="sm"
                    />
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-display font-bold mb-4">
                Pontos que Precisam de Atenção
              </h3>
              <div className="space-y-2">
                {data.topics
                  .filter((t) => t.mastery < 40)
                  .map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-accent-pink/5 border border-accent-pink/20"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-pink" />
                      <span className="text-sm flex-1">{topic.name}</span>
                      <span className="text-xs font-mono text-accent-pink">
                        {topic.mastery}%
                      </span>
                      <Link href={`/practice?subject=${slug}&topic=${topic.id}`}>
                        <GlowButton size="sm" variant="danger">
                          Reforçar
                        </GlowButton>
                      </Link>
                    </div>
                  ))}
                {data.topics.filter((t) => t.mastery < 40).length === 0 && (
                  <p className="text-sm text-foreground-muted text-center py-4">
                    Excelente! Nenhum ponto fraco identificado.
                  </p>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === "videoaulas" && (
          <motion.div
            key="videoaulas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {data.videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard variant="interactive" className="group">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}22` }}
                    >
                      <Video className="w-6 h-6" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2 group-hover:text-accent-purple transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-foreground-muted mt-1">
                        {video.channel} • {video.duration}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {video.watched && (
                          <Badge variant="success" size="sm">
                            Assistido
                          </Badge>
                        )}
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-accent-cyan hover:underline"
                        >
                          Assistir <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
