"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Calendar,
  Video,
  ClipboardList,
  Medal,
  ChevronRight,
  Sparkles,
  Star,
  Zap,
  ArrowRight,
  GraduationCap,
  Github,
  Twitter,
  Instagram,
  Heart,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Animated counter hook
   ────────────────────────────────────────────── */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const duration = 2000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);
      if (current !== start) {
        start = current;
        setCount(current);
      }
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient"
      >
        {count.toLocaleString("pt-BR")}
        {suffix}
      </span>
      <p className="mt-1 font-body text-sm sm:text-base text-foreground-muted">
        {label}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Particle field (pure CSS/div)
   ────────────────────────────────────────────── */
function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.5 + 0.1,
    color:
      i % 3 === 0
        ? "bg-accent-purple"
        : i % 3 === 1
        ? "bg-accent-cyan"
        : "bg-accent-pink",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={cn("absolute rounded-full", p.color)}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Glow orbs
   ────────────────────────────────────────────── */
function GlowOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)",
          top: "20%",
          right: "-15%",
          animation: "float 25s ease-in-out 3s infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
        style={{
          background: "radial-gradient(circle, #FF6584 0%, transparent 70%)",
          bottom: "10%",
          left: "30%",
          animation: "float 18s ease-in-out 5s infinite",
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Motion variants
   ────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const features = [
  {
    icon: BookOpen,
    title: "Questões de Vestibulares",
    description:
      "Banco com milhares de questões reais de UFRGS, ENEM e outros vestibulares, todas classificadas por tema e dificuldade.",
    color: "from-accent-purple to-accent-cyan",
    glow: "group-hover:shadow-glow-purple",
  },
  {
    icon: Trophy,
    title: "Sistema Gamificado",
    description:
      "Ganhe XP, suba de nível, desbloqueie conquistas e compete com amigos. Estudar nunca foi tão motivador.",
    color: "from-accent-cyan to-accent-green",
    glow: "group-hover:shadow-glow-cyan",
  },
  {
    icon: Calendar,
    title: "Cronograma Inteligente",
    description:
      "Plano de estudos personalizado que se adapta ao seu ritmo e identifica suas maiores dificuldades.",
    color: "from-accent-pink to-accent-purple",
    glow: "group-hover:shadow-glow-pink",
  },
  {
    icon: Video,
    title: "Videoaulas Selecionadas",
    description:
      "Curadoria das melhores videoaulas do YouTube para cada conteúdo. Sem perder tempo procurando.",
    color: "from-accent-green to-accent-cyan",
    glow: "group-hover:shadow-glow-green",
  },
  {
    icon: ClipboardList,
    title: "Simulados Completos",
    description:
      "Simule a prova real com tempo, gabarito e análise detalhada do seu desempenho por matéria.",
    color: "from-accent-purple to-accent-pink",
    glow: "group-hover:shadow-glow-purple",
  },
  {
    icon: Medal,
    title: "Ranking e Conquistas",
    description:
      "Acompanhe sua evolução no ranking geral e por matéria. Conquistas especiais para cada marco.",
    color: "from-accent-cyan to-accent-purple",
    glow: "group-hover:shadow-glow-cyan",
  },
];

const steps = [
  {
    number: "01",
    title: "Crie sua conta",
    description:
      "Cadastro rápido e gratuito. Escolha seu vestibular alvo e as matérias que precisa focar.",
  },
  {
    number: "02",
    title: "Estude no seu ritmo",
    description:
      "Resolva questões, assista videoaulas e siga seu cronograma personalizado. Acumule XP a cada acerto.",
  },
  {
    number: "03",
    title: "Conquiste sua vaga",
    description:
      "Acompanhe sua evolução, identifique pontos fracos e chegue preparado no dia da prova.",
  },
];

const testimonials = [
  {
    name: "Mariana S.",
    course: "Medicina — UFRGS",
    avatar: "MS",
    text: "O CP Study mudou completamente minha forma de estudar. O sistema de gamificação me manteve motivada durante todo o cursinho. Passei em 1o lugar!",
    stars: 5,
  },
  {
    name: "Rafael T.",
    course: "Engenharia — UFRGS",
    avatar: "RT",
    text: "As questões comentadas e o cronograma inteligente foram fundamentais. Consegui organizar meus estudos e focar no que realmente importava.",
    stars: 5,
  },
  {
    name: "Camila F.",
    course: "Direito — UFRGS",
    avatar: "CF",
    text: "Estudar competindo com amigos no ranking tornou tudo mais divertido. A plataforma é incrível e totalmente gratuita. Recomendo demais!",
    stars: 5,
  },
];

/* ══════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-gradient">
              CP Study
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-body text-foreground-muted">
            <a href="#features" className="hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">
              Como Funciona
            </a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">
              Depoimentos
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors px-4 py-2"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-accent-purple hover:bg-accent-purple/90 text-white px-5 py-2 rounded-xl transition-all hover:shadow-glow-purple"
            >
              Começar Grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background layers */}
        <div className="absolute inset-0 gradient-mesh-animated" />
        <div className="absolute inset-0 bg-mesh" />
        <GlowOrbs />
        <ParticleField />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(108,99,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="flex justify-center">
              <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-body text-foreground-muted">
                <Sparkles className="w-4 h-4 text-accent-purple" />
                <span>Plataforma 100% gratuita para vestibulares</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight"
            >
              Sua aprovação na{" "}
              <span className="text-gradient">UFRGS</span>
              <br />
              começa{" "}
              <span className="relative inline-block">
                <span className="text-gradient-pink">aqui</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C40 2 80 2 100 6C120 10 160 4 198 6"
                    stroke="url(#underline-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF6584" />
                      <stop offset="1" stopColor="#6C63FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed"
            >
              A plataforma gamificada que transforma seus estudos para o ENEM e UFRGS.
              Questões reais, cronogramas inteligentes e uma comunidade que te leva à aprovação.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/register"
                className="group relative inline-flex items-center gap-2 bg-accent-purple text-white font-display font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(108,99,255,0.5)] hover:scale-105"
              >
                <span>Começar Agora</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-2xl animate-glow-pulse pointer-events-none" />
              </Link>

              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 glass glass-hover text-foreground font-display font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <GraduationCap className="w-5 h-5 text-accent-cyan" />
                <span>Ver Demo</span>
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex items-center justify-center gap-2 text-sm text-foreground-muted font-body"
            >
              <Check className="w-4 h-4 text-accent-green" />
              <span>Sem cartão de crédito</span>
              <span className="mx-2 text-foreground-muted/30">|</span>
              <Check className="w-4 h-4 text-accent-green" />
              <span>100% gratuito</span>
              <span className="mx-2 text-foreground-muted/30">|</span>
              <Check className="w-4 h-4 text-accent-green" />
              <span>Acesso imediato</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-foreground-muted/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-accent-purple"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
         STATS BAR
         ═══════════════════════════════════════ */}
      <section className="relative z-10 -mt-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="glass rounded-3xl p-8 md:p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCounter value={12000} suffix="+" label="Questões" />
              <StatCounter value={5000} suffix="+" label="Aprovados" />
              <StatCounter value={14} suffix="" label="Matérias" />
              <StatCounter value={100} suffix="%" label="Gratuito" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         FEATURES
         ═══════════════════════════════════════ */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <ParticleField />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block font-body text-sm uppercase tracking-widest text-accent-purple mb-4"
            >
              Recursos
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl sm:text-5xl font-bold"
            >
              Tudo que você precisa para{" "}
              <span className="text-gradient">passar</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 font-body text-foreground-muted text-lg max-w-2xl mx-auto"
            >
              Uma plataforma completa com ferramentas inteligentes que se adaptam ao
              seu estilo de estudo.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                className={cn(
                  "group relative glass glass-hover rounded-2xl p-8 transition-all duration-500",
                  feature.glow
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5",
                    feature.color
                  )}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-gradient transition-all">
                  {feature.title}
                </h3>
                <p className="font-body text-foreground-muted leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Corner glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-accent-purple/0 group-hover:bg-accent-purple/5 blur-2xl transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         HOW IT WORKS
         ═══════════════════════════════════════ */}
      <section id="how-it-works" className="relative py-32">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block font-body text-sm uppercase tracking-widest text-accent-cyan mb-4"
            >
              Como Funciona
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl sm:text-5xl font-bold"
            >
              Simples de <span className="text-gradient">começar</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12 md:gap-8 relative"
          >
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-pink opacity-30" />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                custom={i}
                className="relative text-center"
              >
                {/* Number circle */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan opacity-20 animate-glow-pulse" />
                  <div className="relative w-16 h-16 rounded-full glass border border-accent-purple/40 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-gradient">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-foreground-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         TESTIMONIALS
         ═══════════════════════════════════════ */}
      <section id="testimonials" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block font-body text-sm uppercase tracking-widest text-accent-pink mb-4"
            >
              Depoimentos
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl sm:text-5xl font-bold"
            >
              Quem usou, <span className="text-gradient">aprovou</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                className="glass glass-hover rounded-2xl p-8 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-accent-purple text-accent-purple"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-foreground-muted text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-display text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-foreground-muted">
                      {t.course}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         CTA FINAL
         ═══════════════════════════════════════ */}
      <section className="relative py-32">
        <div className="absolute inset-0 gradient-mesh-animated opacity-50" />
        <GlowOrbs />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-accent-purple mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-body">Totalmente gratuito</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Pronto para{" "}
            <span className="text-gradient">começar?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-body text-lg text-foreground-muted mb-10 max-w-xl mx-auto"
          >
            Junte-se a milhares de estudantes que já estão transformando seus estudos.
            Crie sua conta em segundos e comece agora.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-display font-semibold text-lg px-10 py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(108,99,255,0.4)] hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              <span>Criar Conta Grátis</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={4}
            className="mt-6 font-body text-sm text-foreground-muted/60"
          >
            Sem cartão de crédito. Sem pegadinhas. Só estudo.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
         FOOTER
         ═══════════════════════════════════════ */}
      <footer className="relative border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-gradient">
                CP Study
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 font-body text-sm text-foreground-muted">
              <Link href="/about" className="hover:text-foreground transition-colors">
                Sobre
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacidade
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Termos
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contato
              </Link>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-accent-purple/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 text-center">
            <p className="font-body text-sm text-foreground-muted/60 flex items-center justify-center gap-1">
              Feito com <Heart className="w-3.5 h-3.5 text-accent-pink fill-accent-pink" /> para estudantes brasileiros
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
