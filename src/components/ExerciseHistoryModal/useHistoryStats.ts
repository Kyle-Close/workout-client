import { useMemo } from "react";
import type { ExerciseHistoryEntry } from "../../schemas/exerciseHistorySchema";

export interface HistoryStats {
  minWeight: number;
  maxWeight: number;
  avgWeight: number;
  trend: "up" | "down" | "flat";
  trendAmount: number;
  currentWeight: number;
}

export function useHistoryStats(history: ExerciseHistoryEntry[]): HistoryStats | null {
  return useMemo(() => {
    if (history.length === 0) return null;

    const weights = history.map((h) => h.weight);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    const avgWeight = Math.round(weights.reduce((a, b) => a + b, 0) / weights.length);
    const currentWeight = history[history.length - 1].weight;

    let trend: "up" | "down" | "flat" = "flat";
    let trendAmount = 0;

    if (history.length >= 2) {
      const firstWeight = history[0].weight;
      const lastWeight = history[history.length - 1].weight;
      trendAmount = lastWeight - firstWeight;
      if (trendAmount > 0) trend = "up";
      else if (trendAmount < 0) trend = "down";
    }

    return { minWeight, maxWeight, avgWeight, trend, trendAmount, currentWeight };
  }, [history]);
}
