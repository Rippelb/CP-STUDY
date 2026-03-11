"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Trash2,
  X,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { cn, getSubjectColor } from "@/lib/utils";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isToday,
  addWeeks,
  subWeeks,
} from "date-fns";
import { ptBR } from "date-fns/locale";

interface ScheduleBlock {
  id: string;
  subjectName: string;
  subjectSlug: string;
  topicName: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  completed: boolean;
}

const subjects = [
  { name: "Matemática", slug: "matematica" },
  { name: "Física", slug: "fisica" },
  { name: "Química", slug: "quimica" },
  { name: "Biologia", slug: "biologia" },
  { name: "Português", slug: "portugues" },
  { name: "História", slug: "historia" },
  { name: "Geografia", slug: "geografia" },
  { name: "Filosofia", slug: "filosofia" },
  { name: "Sociologia", slug: "sociologia" },
  { name: "Redação", slug: "redacao" },
  { name: "Inglês", slug: "ingles" },
];

const today = new Date();

const initialBlocks: ScheduleBlock[] = [
  { id: "1", subjectName: "Matemática", subjectSlug: "matematica", topicName: "Funções", date: today, startTime: "08:00", endTime: "09:30", duration: 90, completed: true },
  { id: "2", subjectName: "Física", subjectSlug: "fisica", topicName: "Cinemática", date: today, startTime: "10:00", endTime: "11:00", duration: 60, completed: false },
  { id: "3", subjectName: "Português", subjectSlug: "portugues", topicName: "Literatura", date: today, startTime: "14:00", endTime: "15:30", duration: 90, completed: false },
  { id: "4", subjectName: "Química", subjectSlug: "quimica", topicName: "Estequiometria", date: addDays(today, 1), startTime: "08:00", endTime: "09:30", duration: 90, completed: false },
  { id: "5", subjectName: "Biologia", subjectSlug: "biologia", topicName: "Genética", date: addDays(today, 1), startTime: "10:00", endTime: "11:30", duration: 90, completed: false },
  { id: "6", subjectName: "História", subjectSlug: "historia", topicName: "Brasil Colônia", date: addDays(today, 2), startTime: "08:00", endTime: "09:00", duration: 60, completed: false },
  { id: "7", subjectName: "Redação", subjectSlug: "redacao", topicName: "Texto Dissertativo", date: addDays(today, 2), startTime: "14:00", endTime: "16:00", duration: 120, completed: false },
  { id: "8", subjectName: "Matemática", subjectSlug: "matematica", topicName: "Geometria", date: addDays(today, 3), startTime: "09:00", endTime: "10:30", duration: 90, completed: false },
  { id: "9", subjectName: "Geografia", subjectSlug: "geografia", topicName: "Geopolítica", date: addDays(today, 4), startTime: "08:00", endTime: "09:30", duration: 90, completed: false },
  { id: "10", subjectName: "Filosofia", subjectSlug: "filosofia", topicName: "Ética", date: addDays(today, 5), startTime: "10:00", endTime: "11:00", duration: 60, completed: false },
];

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [blocks, setBlocks] = useState(initialBlocks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newBlock, setNewBlock] = useState({
    subjectSlug: "",
    topicName: "",
    startTime: "08:00",
    endTime: "09:30",
  });

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const totalPlanned = blocks.filter((b) =>
    weekDays.some((d) => isSameDay(b.date, d))
  ).reduce((sum, b) => sum + b.duration, 0);

  const totalCompleted = blocks
    .filter((b) => b.completed && weekDays.some((d) => isSameDay(b.date, d)))
    .reduce((sum, b) => sum + b.duration, 0);

  const toggleComplete = (id: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, completed: !b.completed } : b))
    );
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const addBlock = () => {
    if (!selectedDate || !newBlock.subjectSlug) return;
    const subject = subjects.find((s) => s.slug === newBlock.subjectSlug);
    if (!subject) return;

    const [startH, startM] = newBlock.startTime.split(":").map(Number);
    const [endH, endM] = newBlock.endTime.split(":").map(Number);
    const duration = (endH * 60 + endM) - (startH * 60 + startM);

    const block: ScheduleBlock = {
      id: Math.random().toString(36).substring(7),
      subjectName: subject.name,
      subjectSlug: subject.slug,
      topicName: newBlock.topicName || "Estudo geral",
      date: selectedDate,
      startTime: newBlock.startTime,
      endTime: newBlock.endTime,
      duration: Math.max(duration, 30),
      completed: false,
    };

    setBlocks((prev) => [...prev, block]);
    setShowAddModal(false);
    setNewBlock({ subjectSlug: "", topicName: "", startTime: "08:00", endTime: "09:30" });
  };

  // Activity heatmap data (last 12 weeks)
  const heatmapWeeks = 12;
  const heatmapStart = subWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), heatmapWeeks - 1);
  const heatmapDays = Array.from({ length: heatmapWeeks * 7 }, (_, i) =>
    addDays(heatmapStart, i)
  );

  const getActivityLevel = (date: Date): number => {
    const dayBlocks = blocks.filter((b) => isSameDay(b.date, date));
    const minutes = dayBlocks.reduce((sum, b) => sum + b.duration, 0);
    if (minutes === 0) return 0;
    if (minutes < 60) return 1;
    if (minutes < 120) return 2;
    if (minutes < 180) return 3;
    return 4;
  };

  const activityColors = [
    "bg-background-elevated",
    "bg-accent-purple/20",
    "bg-accent-purple/40",
    "bg-accent-purple/60",
    "bg-accent-purple",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Cronograma</h1>
          <p className="text-sm text-foreground-muted mt-1">
            Planeje e acompanhe seus estudos
          </p>
        </div>
        <GlowButton
          onClick={() => {
            setSelectedDate(new Date());
            setShowAddModal(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Adicionar Sessão
        </GlowButton>
      </div>

      {/* Week Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="text-center">
          <p className="text-2xl font-mono font-bold text-accent-purple">
            {Math.round(totalPlanned / 60)}h{totalPlanned % 60 > 0 ? `${totalPlanned % 60}m` : ""}
          </p>
          <p className="text-xs text-foreground-muted mt-1">Planejado</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-2xl font-mono font-bold text-accent-green">
            {Math.round(totalCompleted / 60)}h{totalCompleted % 60 > 0 ? `${totalCompleted % 60}m` : ""}
          </p>
          <p className="text-xs text-foreground-muted mt-1">Realizado</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-2xl font-mono font-bold text-accent-cyan">
            {totalPlanned > 0 ? Math.round((totalCompleted / totalPlanned) * 100) : 0}%
          </p>
          <p className="text-xs text-foreground-muted mt-1">Conclusão</p>
        </GlassCard>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-display font-bold">
          {format(weekStart, "dd 'de' MMMM", { locale: ptBR })} -{" "}
          {format(addDays(weekStart, 6), "dd 'de' MMMM", { locale: ptBR })}
        </h2>
        <button
          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekly Calendar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {weekDays.map((day, i) => {
          const dayBlocks = blocks
            .filter((b) => isSameDay(b.date, day))
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
          const isCurrentDay = isToday(day);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "rounded-xl border p-3 min-h-[200px]",
                isCurrentDay
                  ? "border-accent-purple/40 bg-accent-purple/5"
                  : "border-border bg-background-card/50"
              )}
            >
              <div className="text-center mb-3">
                <p className="text-[10px] uppercase text-foreground-muted">
                  {format(day, "EEE", { locale: ptBR })}
                </p>
                <p
                  className={cn(
                    "text-lg font-mono font-bold",
                    isCurrentDay ? "text-accent-purple" : ""
                  )}
                >
                  {format(day, "dd")}
                </p>
              </div>
              <div className="space-y-2">
                {dayBlocks.map((block) => (
                  <div
                    key={block.id}
                    className={cn(
                      "rounded-lg p-2 text-[10px] border cursor-pointer group relative",
                      block.completed ? "opacity-60" : ""
                    )}
                    style={{
                      backgroundColor: `${getSubjectColor(block.subjectSlug)}11`,
                      borderColor: `${getSubjectColor(block.subjectSlug)}33`,
                    }}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <button onClick={() => toggleComplete(block.id)}>
                        {block.completed ? (
                          <CheckCircle2
                            className="w-3 h-3"
                            style={{ color: getSubjectColor(block.subjectSlug) }}
                          />
                        ) : (
                          <Circle className="w-3 h-3 text-foreground-muted" />
                        )}
                      </button>
                      <span
                        className="font-bold truncate"
                        style={{ color: getSubjectColor(block.subjectSlug) }}
                      >
                        {block.subjectName}
                      </span>
                      <button
                        onClick={() => deleteBlock(block.id)}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3 text-accent-pink" />
                      </button>
                    </div>
                    <p className="text-foreground-muted truncate">
                      {block.topicName}
                    </p>
                    <p className="text-foreground-muted mt-0.5">
                      {block.startTime} - {block.endTime}
                    </p>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setSelectedDate(day);
                    setShowAddModal(true);
                  }}
                  className="w-full py-1.5 rounded-lg border border-dashed border-border text-foreground-muted hover:border-accent-purple/40 hover:text-accent-purple transition-all text-[10px]"
                >
                  <Plus className="w-3 h-3 mx-auto" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Heatmap */}
      <GlassCard>
        <h3 className="text-sm font-display font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent-purple" />
          Atividade de Estudo
        </h3>
        <div className="flex gap-1 flex-wrap">
          {heatmapDays.map((day, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-sm",
                activityColors[getActivityLevel(day)]
              )}
              title={`${format(day, "dd/MM/yyyy")}: ${
                blocks
                  .filter((b) => isSameDay(b.date, day))
                  .reduce((sum, b) => sum + b.duration, 0)
              } min`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-foreground-muted">
          <span>Menos</span>
          {activityColors.map((color, i) => (
            <div key={i} className={cn("w-3 h-3 rounded-sm", color)} />
          ))}
          <span>Mais</span>
        </div>
      </GlassCard>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <GlassCard variant="elevated">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-lg">
                    Nova Sessão de Estudo
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-1 text-foreground-muted hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-foreground-muted mb-1 block">
                      Data
                    </label>
                    <p className="text-sm font-medium">
                      {selectedDate
                        ? format(selectedDate, "EEEE, dd 'de' MMMM", {
                            locale: ptBR,
                          })
                        : "Selecione uma data"}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-foreground-muted mb-1 block">
                      Matéria
                    </label>
                    <select
                      value={newBlock.subjectSlug}
                      onChange={(e) =>
                        setNewBlock((prev) => ({
                          ...prev,
                          subjectSlug: e.target.value,
                        }))
                      }
                      className="w-full bg-background-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent-purple/50"
                    >
                      <option value="">Selecione...</option>
                      {subjects.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-foreground-muted mb-1 block">
                      Tópico (opcional)
                    </label>
                    <input
                      type="text"
                      value={newBlock.topicName}
                      onChange={(e) =>
                        setNewBlock((prev) => ({
                          ...prev,
                          topicName: e.target.value,
                        }))
                      }
                      placeholder="Ex: Funções do 2° grau"
                      className="w-full bg-background-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent-purple/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-foreground-muted mb-1 block">
                        Início
                      </label>
                      <input
                        type="time"
                        value={newBlock.startTime}
                        onChange={(e) =>
                          setNewBlock((prev) => ({
                            ...prev,
                            startTime: e.target.value,
                          }))
                        }
                        className="w-full bg-background-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent-purple/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-foreground-muted mb-1 block">
                        Fim
                      </label>
                      <input
                        type="time"
                        value={newBlock.endTime}
                        onChange={(e) =>
                          setNewBlock((prev) => ({
                            ...prev,
                            endTime: e.target.value,
                          }))
                        }
                        className="w-full bg-background-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent-purple/50"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <GlowButton
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancelar
                    </GlowButton>
                    <GlowButton
                      className="flex-1"
                      onClick={addBlock}
                      disabled={!newBlock.subjectSlug}
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </GlowButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
