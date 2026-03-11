"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  RotateCcw,
  Flame,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Trophy,
  Target,
  Star,
  Home,
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { Badge } from "@/components/ui/badge";
import { cn, calculateXpForAnswer } from "@/lib/utils";
import { PRACTICE_MODES, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/constants";
import { useUserStore } from "@/stores/useUserStore";

interface QuestionOption {
  id: string;
  letter: string;
  content: string;
  isCorrect: boolean;
  explanation: string | null;
}

interface Question {
  id: string;
  content: string;
  source: string;
  year: number;
  difficulty: string;
  options: QuestionOption[];
  subjectName: string;
  topicName: string;
}

// Mock questions
const mockQuestions: Question[] = [
  {
    id: "q1",
    content: "Uma pesquisa de mercado revelou que 60% dos entrevistados preferem o produto A, 45% preferem o produto B e 25% preferem ambos. Qual a porcentagem de entrevistados que prefere pelo menos um dos produtos?",
    source: "ENEM",
    year: 2023,
    difficulty: "medium",
    subjectName: "Matemática",
    topicName: "Conjuntos",
    options: [
      { id: "o1", letter: "A", content: "70%", isCorrect: false, explanation: null },
      { id: "o2", letter: "B", content: "75%", isCorrect: false, explanation: null },
      { id: "o3", letter: "C", content: "80%", isCorrect: true, explanation: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 60% + 45% - 25% = 80%." },
      { id: "o4", letter: "D", content: "85%", isCorrect: false, explanation: null },
      { id: "o5", letter: "E", content: "90%", isCorrect: false, explanation: null },
    ],
  },
  {
    id: "q2",
    content: "Um objeto é lançado verticalmente para cima com velocidade inicial de 20 m/s. Considerando g = 10 m/s², qual a altura máxima atingida pelo objeto?",
    source: "UFRGS",
    year: 2022,
    difficulty: "medium",
    subjectName: "Física",
    topicName: "Cinemática",
    options: [
      { id: "o6", letter: "A", content: "10 m", isCorrect: false, explanation: null },
      { id: "o7", letter: "B", content: "15 m", isCorrect: false, explanation: null },
      { id: "o8", letter: "C", content: "20 m", isCorrect: true, explanation: "V² = V₀² - 2gH → 0 = 400 - 20H → H = 20 m." },
      { id: "o9", letter: "D", content: "25 m", isCorrect: false, explanation: null },
      { id: "o10", letter: "E", content: "40 m", isCorrect: false, explanation: null },
    ],
  },
  {
    id: "q3",
    content: "A fotossíntese é um processo fundamental para a vida na Terra. Sobre esse processo, é correto afirmar que:",
    source: "ENEM",
    year: 2023,
    difficulty: "easy",
    subjectName: "Biologia",
    topicName: "Metabolismo Energético",
    options: [
      { id: "o11", letter: "A", content: "Ocorre apenas em plantas superiores", isCorrect: false, explanation: null },
      { id: "o12", letter: "B", content: "Transforma energia luminosa em energia química, produzindo glicose e oxigênio", isCorrect: true, explanation: "A fotossíntese converte CO₂ e H₂O em glicose (C₆H₁₂O₆) e O₂, usando energia luminosa." },
      { id: "o13", letter: "C", content: "Consome oxigênio e libera gás carbônico", isCorrect: false, explanation: null },
      { id: "o14", letter: "D", content: "Ocorre exclusivamente durante a noite", isCorrect: false, explanation: null },
      { id: "o15", letter: "E", content: "Não depende de luz solar para acontecer", isCorrect: false, explanation: null },
    ],
  },
  {
    id: "q4",
    content: "Na reação de neutralização entre ácido clorídrico (HCl) e hidróxido de sódio (NaOH), os produtos formados são:",
    source: "UFRGS",
    year: 2022,
    difficulty: "easy",
    subjectName: "Química",
    topicName: "Química Inorgânica",
    options: [
      { id: "o16", letter: "A", content: "NaCl e H₂", isCorrect: false, explanation: null },
      { id: "o17", letter: "B", content: "NaCl e H₂O", isCorrect: true, explanation: "HCl + NaOH → NaCl + H₂O. É uma reação de neutralização clássica que forma sal e água." },
      { id: "o18", letter: "C", content: "Na₂O e HCl", isCorrect: false, explanation: null },
      { id: "o19", letter: "D", content: "NaOH e Cl₂", isCorrect: false, explanation: null },
      { id: "o20", letter: "E", content: "NaCl e O₂", isCorrect: false, explanation: null },
    ],
  },
  {
    id: "q5",
    content: "\"Navio negreiro\" é um poema de Castro Alves que denuncia as condições desumanas da escravidão no Brasil. Esse autor pertence ao movimento literário denominado:",
    source: "ENEM",
    year: 2023,
    difficulty: "easy",
    subjectName: "Português",
    topicName: "Literatura",
    options: [
      { id: "o21", letter: "A", content: "Arcadismo", isCorrect: false, explanation: null },
      { id: "o22", letter: "B", content: "Barroco", isCorrect: false, explanation: null },
      { id: "o23", letter: "C", content: "Romantismo (3ª geração - Condoreira)", isCorrect: true, explanation: "Castro Alves pertence à terceira geração romântica, também chamada de condoreira ou social, que usava a poesia como instrumento de denúncia social." },
      { id: "o24", letter: "D", content: "Realismo", isCorrect: false, explanation: null },
      { id: "o25", letter: "E", content: "Modernismo", isCorrect: false, explanation: null },
    ],
  },
  {
    id: "q6",
    content: "Um terreno retangular tem perímetro de 80 metros. Sabendo que o comprimento é o dobro da largura, qual é a área do terreno?",
    source: "ENEM",
    year: 2024,
    difficulty: "easy",
    subjectName: "Matemática",
    topicName: "Geometria Plana",
    options: [
      { id: "o26", letter: "A", content: "200 m²", isCorrect: false, explanation: null },
      { id: "o27", letter: "B", content: "400/9 m²", isCorrect: false, explanation: null },
      { id: "o28", letter: "C", content: "800/9 m²", isCorrect: false, explanation: null },
      { id: "o29", letter: "D", content: "3200/9 m²", isCorrect: true, explanation: "Perímetro = 2(L + C). Como C = 2L: 2(L + 2L) = 80 → 6L = 80 → L = 40/3. Área = L × C = (40/3) × (80/3) = 3200/9 ≈ 355,6 m²." },
      { id: "o30", letter: "E", content: "1600/9 m²", isCorrect: false, explanation: null },
    ],
  },
  {
    id: "q7",
    content: "A Revolução Industrial, iniciada na Inglaterra no século XVIII, transformou profundamente as relações de produção. Uma de suas principais consequências sociais foi:",
    source: "ENEM",
    year: 2023,
    difficulty: "medium",
    subjectName: "História",
    topicName: "Idade Contemporânea",
    options: [
      { id: "o31", letter: "A", content: "O fortalecimento do sistema feudal na Europa", isCorrect: false, explanation: null },
      { id: "o32", letter: "B", content: "A formação de uma classe operária urbana e a intensificação da urbanização", isCorrect: true, explanation: "A industrialização provocou êxodo rural massivo, formação do proletariado e crescimento desordenado das cidades." },
      { id: "o33", letter: "C", content: "A diminuição das desigualdades sociais", isCorrect: false, explanation: null },
      { id: "o34", letter: "D", content: "O retorno às práticas mercantilistas", isCorrect: false, explanation: null },
      { id: "o35", letter: "E", content: "A extinção do comércio internacional", isCorrect: false, explanation: null },
    ],
  },
  {
    id: "q8",
    content: "O processo de urbanização brasileira, intensificado a partir da segunda metade do século XX, gerou diversos problemas socioambientais. Entre eles, destaca-se:",
    source: "ENEM",
    year: 2024,
    difficulty: "medium",
    subjectName: "Geografia",
    topicName: "Geografia Urbana",
    options: [
      { id: "o36", letter: "A", content: "A redução da favelização nas grandes metrópoles", isCorrect: false, explanation: null },
      { id: "o37", letter: "B", content: "O aumento das áreas verdes urbanas", isCorrect: false, explanation: null },
      { id: "o38", letter: "C", content: "A impermeabilização do solo, contribuindo para enchentes", isCorrect: true, explanation: "A urbanização desordenada leva à impermeabilização do solo com asfalto e concreto, impedindo a infiltração da água e agravando enchentes." },
      { id: "o39", letter: "D", content: "A descentralização industrial", isCorrect: false, explanation: null },
      { id: "o40", letter: "E", content: "A melhoria generalizada do saneamento básico", isCorrect: false, explanation: null },
    ],
  },
  {
    id: "q9",
    content: "Para Aristóteles, a felicidade (eudaimonia) é alcançada por meio da:",
    source: "ENEM",
    year: 2023,
    difficulty: "hard",
    subjectName: "Filosofia",
    topicName: "Filósofos Clássicos",
    options: [
      { id: "o41", letter: "A", content: "Busca pelos prazeres materiais e sensoriais", isCorrect: false, explanation: null },
      { id: "o42", letter: "B", content: "Prática constante da virtude e do exercício racional", isCorrect: true, explanation: "Para Aristóteles, a eudaimonia é o bem supremo alcançado pela prática das virtudes (areté) e pelo uso da razão, constituindo a finalidade da vida humana." },
      { id: "o43", letter: "C", content: "Negação total dos desejos e isolamento social", isCorrect: false, explanation: null },
      { id: "o44", letter: "D", content: "Obediência irrestrita às leis da cidade-estado", isCorrect: false, explanation: null },
      { id: "o45", letter: "E", content: "Contemplação passiva do mundo das ideias", isCorrect: false, explanation: null },
    ],
  },
  {
    id: "q10",
    content: "Segundo Émile Durkheim, os fatos sociais possuem três características fundamentais. São elas:",
    source: "ENEM",
    year: 2024,
    difficulty: "medium",
    subjectName: "Sociologia",
    topicName: "Sociólogos Clássicos",
    options: [
      { id: "o46", letter: "A", content: "Subjetividade, individualidade e voluntariedade", isCorrect: false, explanation: null },
      { id: "o47", letter: "B", content: "Coercitividade, exterioridade e generalidade", isCorrect: true, explanation: "Durkheim define fatos sociais como maneiras de agir, pensar e sentir que são exteriores ao indivíduo (existem fora dele), coercitivos (se impõem) e gerais (presentes na coletividade)." },
      { id: "o48", letter: "C", content: "Racionalidade, historicidade e materialidade", isCorrect: false, explanation: null },
      { id: "o49", letter: "D", content: "Autonomia, liberdade e consciência", isCorrect: false, explanation: null },
      { id: "o50", letter: "E", content: "Economia, política e cultura", isCorrect: false, explanation: null },
    ],
  },
];

type PracticeMode = "free" | "simulado" | "review" | "marathon";

export default function PracticePageWrapper() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin w-8 h-8 border-2 border-accent-purple border-t-transparent rounded-full" /></div>}>
      <PracticePage />
    </Suspense>
  );
}

function PracticePage() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as PracticeMode) ?? null;
  const [mode, setMode] = useState<PracticeMode | null>(initialMode);
  const [started, setStarted] = useState(!!initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [combo, setCombo] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpAnimation, setXpAnimation] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { addXp } = useUserStore();

  const questions = mockQuestions;
  const currentQuestion = questions[currentIndex];

  // Timer for simulado mode
  useEffect(() => {
    if (mode !== "simulado" || !started || finished) return;
    setTimeLeft(questions.length * 180); // 3 min per question
  }, [mode, started, finished, questions.length]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === null || t <= 1) {
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = useCallback(() => {
    if (!selectedOption || hasAnswered) return;

    const option = currentQuestion.options.find((o) => o.id === selectedOption);
    if (!option) return;

    const isCorrect = option.isCorrect;
    const newCombo = isCorrect ? combo + 1 : 0;
    const xp = calculateXpForAnswer(currentQuestion.difficulty, isCorrect, newCombo);

    setHasAnswered(true);
    setCombo(newCombo);
    setTotalCorrect((c) => c + (isCorrect ? 1 : 0));
    setTotalAnswered((a) => a + 1);

    if (mode !== "simulado" && xp > 0) {
      setXpEarned((x) => x + xp);
      setXpAnimation(xp);
      addXp(xp);
      setTimeout(() => setXpAnimation(null), 1500);
    }
  }, [selectedOption, hasAnswered, currentQuestion, combo, mode, addXp]);

  const handleNext = useCallback(() => {
    if (currentIndex >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setHasAnswered(false);
  }, [currentIndex, questions.length]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Mode selection screen
  if (!started) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Praticar</h1>
          <p className="text-foreground-muted text-sm mt-1">
            Escolha um modo de prática para começar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.entries(PRACTICE_MODES) as [PracticeMode, typeof PRACTICE_MODES.free][]).map(
            ([key, modeData], i) => {
              const icons = { BookOpen, Clock, RotateCcw, Flame };
              const Icon = icons[modeData.icon as keyof typeof icons] ?? BookOpen;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard
                    variant="interactive"
                    className="cursor-pointer group"
                    onClick={() => {
                      setMode(key);
                      setStarted(true);
                    }}
                    glowColor={modeData.color}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${modeData.color}22` }}
                      >
                        <Icon
                          className="w-7 h-7 transition-transform group-hover:scale-110"
                          style={{ color: modeData.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-lg">
                          {modeData.name}
                        </h3>
                        <p className="text-sm text-foreground-muted mt-1">
                          {modeData.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    );
  }

  // Finished screen
  if (finished) {
    const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <GlassCard variant="glow" className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Trophy className="w-16 h-16 mx-auto text-accent-yellow" />
            </motion.div>

            <div>
              <h2 className="text-2xl font-display font-bold">
                Sessão Finalizada!
              </h2>
              <p className="text-foreground-muted text-sm mt-1">
                {PRACTICE_MODES[mode ?? "free"].name}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background-elevated">
                <p className="text-2xl font-mono font-bold text-accent-green">
                  {totalCorrect}
                </p>
                <p className="text-xs text-foreground-muted">Acertos</p>
              </div>
              <div className="p-4 rounded-xl bg-background-elevated">
                <p className="text-2xl font-mono font-bold text-accent-cyan">
                  {accuracy}%
                </p>
                <p className="text-xs text-foreground-muted">Precisão</p>
              </div>
              <div className="p-4 rounded-xl bg-background-elevated">
                <p className="text-2xl font-mono font-bold text-accent-purple">
                  +{xpEarned}
                </p>
                <p className="text-xs text-foreground-muted">XP</p>
              </div>
            </div>

            {combo > 2 && (
              <div className="flex items-center justify-center gap-2 text-accent-orange">
                <Flame className="w-5 h-5" />
                <span className="font-mono font-bold">
                  Melhor combo: {combo}x
                </span>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Link href="/dashboard">
                <GlowButton variant="outline">
                  <Home className="w-4 h-4" />
                  Dashboard
                </GlowButton>
              </Link>
              <GlowButton
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setHasAnswered(false);
                  setCombo(0);
                  setTotalCorrect(0);
                  setTotalAnswered(0);
                  setXpEarned(0);
                  setFinished(false);
                  setTimeLeft(null);
                }}
              >
                <RotateCcw className="w-4 h-4" />
                Praticar Novamente
              </GlowButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Badge variant="info">
            {currentIndex + 1}/{questions.length}
          </Badge>
          <Badge variant="custom" color={DIFFICULTY_COLORS[currentQuestion.difficulty]}>
            {DIFFICULTY_LABELS[currentQuestion.difficulty]}
          </Badge>
          <span className="text-xs text-foreground-muted">
            {currentQuestion.source} {currentQuestion.year}
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          {combo > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-accent-orange"
            >
              <Flame className="w-4 h-4" />
              <span className="font-mono text-sm font-bold">{combo}x</span>
            </motion.div>
          )}
          {timeLeft !== null && (
            <div className="flex items-center gap-1 text-foreground-muted">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-accent-purple">
            <Zap className="w-4 h-4" />
            <span className="font-mono text-sm font-bold">{xpEarned} XP</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <AnimatedProgress
        value={((currentIndex + 1) / questions.length) * 100}
        color="#6C63FF"
        height="sm"
        animated={false}
      />

      {/* XP Animation */}
      <AnimatePresence>
        {xpAnimation && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -60, scale: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-10 z-50 text-accent-purple font-mono font-bold text-2xl"
          >
            +{xpAnimation} XP
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Card */}
      <GlassCard>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <span>{currentQuestion.subjectName}</span>
            <span>•</span>
            <span>{currentQuestion.topicName}</span>
          </div>

          <p className="text-base leading-relaxed">{currentQuestion.content}</p>
        </div>
      </GlassCard>

      {/* Options */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, i) => {
          const isSelected = selectedOption === option.id;
          const showResult = hasAnswered;
          const isCorrectOption = option.isCorrect;

          let borderColor = "border-border";
          let bgColor = "";

          if (showResult) {
            if (isCorrectOption) {
              borderColor = "border-accent-green/50";
              bgColor = "bg-accent-green/5";
            } else if (isSelected && !isCorrectOption) {
              borderColor = "border-accent-pink/50";
              bgColor = "bg-accent-pink/5";
            }
          } else if (isSelected) {
            borderColor = "border-accent-purple/50";
            bgColor = "bg-accent-purple/5";
          }

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => !hasAnswered && setSelectedOption(option.id)}
              disabled={hasAnswered}
              className={cn(
                "w-full p-4 rounded-xl border text-left transition-all flex items-start gap-4",
                bgColor,
                borderColor,
                !hasAnswered && "hover:border-accent-purple/40 hover:bg-accent-purple/5 cursor-pointer",
                hasAnswered && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0",
                  showResult && isCorrectOption
                    ? "bg-accent-green/20 text-accent-green"
                    : showResult && isSelected && !isCorrectOption
                    ? "bg-accent-pink/20 text-accent-pink"
                    : isSelected
                    ? "bg-accent-purple/20 text-accent-purple"
                    : "bg-background-elevated text-foreground-muted"
                )}
              >
                {option.letter}
              </span>
              <div className="flex-1">
                <p className="text-sm">{option.content}</p>
                {showResult && isCorrectOption && option.explanation && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-accent-green/80 mt-2 pt-2 border-t border-accent-green/20"
                  >
                    {option.explanation}
                  </motion.p>
                )}
              </div>
              {showResult && (
                <div className="flex-shrink-0">
                  {isCorrectOption ? (
                    <CheckCircle2 className="w-5 h-5 text-accent-green" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-accent-pink" />
                  ) : null}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!hasAnswered ? (
          <GlowButton
            onClick={handleAnswer}
            disabled={!selectedOption}
          >
            <Target className="w-4 h-4" />
            Confirmar Resposta
          </GlowButton>
        ) : (
          <GlowButton onClick={handleNext}>
            {currentIndex >= questions.length - 1 ? (
              <>
                <Star className="w-4 h-4" />
                Ver Resultado
              </>
            ) : (
              <>
                Próxima
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </GlowButton>
        )}
      </div>
    </div>
  );
}
