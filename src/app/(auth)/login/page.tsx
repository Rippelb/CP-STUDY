"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight, Chrome } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isLogin) {
        if (form.password !== form.confirmPassword) {
          toast.error("As senhas não coincidem");
          setIsLoading(false);
          return;
        }
        if (form.password.length < 6) {
          toast.error("A senha deve ter pelo menos 6 caracteres");
          setIsLoading(false);
          return;
        }
        // Register
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          toast.error(data.error ?? "Erro ao criar conta");
          setIsLoading(false);
          return;
        }
        toast.success("Conta criada! Redirecionando...");
      }

      // For demo, redirect directly
      toast.success(isLogin ? "Login realizado!" : "Conta criada!");
      router.push("/dashboard");
    } catch {
      toast.error("Erro ao processar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.success("Redirecionando para o Google...");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Visual */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 gradient-mesh-animated" />
        <div className="relative z-10 text-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-accent-purple/20 flex items-center justify-center mx-auto mb-8 border border-accent-purple/30">
              <Zap className="w-10 h-10 text-accent-purple" />
            </div>
            <h1 className="text-4xl font-display font-bold mb-4">
              <span className="text-gradient">CP Study</span>
            </h1>
            <p className="text-lg text-foreground-muted max-w-md mx-auto">
              Sua plataforma inteligente de estudos para conquistar a vaga na UFRGS
            </p>
            <div className="flex justify-center gap-8 mt-12">
              {[
                { value: "12K+", label: "Questões" },
                { value: "5K+", label: "Aprovados" },
                { value: "14", label: "Matérias" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-2xl font-mono font-bold text-accent-purple">
                    {stat.value}
                  </p>
                  <p className="text-xs text-foreground-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 lg:max-w-lg flex items-center justify-center p-8 bg-background-card/50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent-purple" />
              </div>
              <span className="font-display font-bold text-lg text-gradient">
                CP Study
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold">
              {isLogin ? "Bem-vindo de volta" : "Criar conta"}
            </h2>
            <p className="text-sm text-foreground-muted mt-1">
              {isLogin
                ? "Entre para continuar seus estudos"
                : "Comece sua jornada de aprovação"}
            </p>
          </div>

          {/* Google Login */}
          <GlowButton
            variant="outline"
            className="w-full mb-6"
            onClick={handleGoogleLogin}
          >
            <Chrome className="w-4 h-4" />
            Continuar com Google
          </GlowButton>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-background-card text-foreground-muted">
                ou continue com email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Seu nome"
                      required={!isLogin}
                      className="w-full bg-background-elevated border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
                    />
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="Email"
                required
                className="w-full bg-background-elevated border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                placeholder="Senha"
                required
                className="w-full bg-background-elevated border border-border rounded-xl pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="relative">
                    <input
                      type="password"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          confirmPassword: e.target.value,
                        }))
                      }
                      placeholder="Confirmar senha"
                      required={!isLogin}
                      className="w-full bg-background-elevated border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-accent-purple hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <GlowButton
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              {isLogin ? "Entrar" : "Criar conta"}
              <ArrowRight className="w-4 h-4" />
            </GlowButton>
          </form>

          <p className="text-center text-sm text-foreground-muted mt-6">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent-purple hover:underline font-medium"
            >
              {isLogin ? "Criar conta" : "Entrar"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
