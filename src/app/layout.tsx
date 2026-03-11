import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "CP Study — Sua aprovação na UFRGS começa aqui",
  description:
    "Plataforma gamificada de estudos para ENEM e UFRGS. Questões, cronogramas, videoaulas e muito mais.",
  keywords: ["ENEM", "UFRGS", "vestibular", "estudos", "plataforma", "questões"],
  openGraph: {
    title: "CP Study — Plataforma de Estudos para UFRGS",
    description:
      "A plataforma definitiva para sua aprovação. Gamificação, questões de vestibulares e mais.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-foreground font-body antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#12121A",
              color: "#E8E8F0",
              border: "1px solid rgba(108, 99, 255, 0.3)",
              borderRadius: "12px",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-dm-sans)",
            },
            success: {
              iconTheme: {
                primary: "#00E676",
                secondary: "#12121A",
              },
            },
            error: {
              iconTheme: {
                primary: "#FF6584",
                secondary: "#12121A",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
