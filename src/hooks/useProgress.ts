"use client";

import { useState, useEffect, useCallback } from "react";

interface SubjectProgressData {
  subjectId: string;
  subjectName: string;
  subjectSlug: string;
  mastery: number;
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;
}

export function useProgress() {
  const [progress, setProgress] = useState<SubjectProgressData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch("/api/progress");
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress ?? []);
      }
    } catch {
      // Silent fail
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const overallAccuracy =
    progress.length > 0
      ? progress.reduce((sum, p) => sum + p.accuracy, 0) / progress.length
      : 0;

  const totalAnswered = progress.reduce((sum, p) => sum + p.totalAnswered, 0);

  return { progress, isLoading, overallAccuracy, totalAnswered, refetch: fetchProgress };
}
