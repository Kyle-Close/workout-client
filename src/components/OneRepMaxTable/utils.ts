import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { createElement } from "react";

export interface DeltaInfo {
  value: string;
  numericValue: number;
  color: "success" | "error" | "default";
  icon: React.ReactElement;
}

export function getDeltaInfo(original: number, current: number): DeltaInfo {
  if (original === 0) {
    return {
      value: "N/A",
      numericValue: 0,
      color: "default",
      icon: createElement(TrendingFlatIcon, { fontSize: "small" }),
    };
  }

  const percentChange = ((current - original) / original) * 100;
  const sign = percentChange > 0 ? "+" : "";

  if (percentChange > 0) {
    return {
      value: `${sign}${percentChange.toFixed(1)}%`,
      numericValue: percentChange,
      color: "success",
      icon: createElement(TrendingUpIcon, { fontSize: "small" }),
    };
  }

  if (percentChange < 0) {
    return {
      value: `${percentChange.toFixed(1)}%`,
      numericValue: percentChange,
      color: "error",
      icon: createElement(TrendingDownIcon, { fontSize: "small" }),
    };
  }

  return {
    value: "0%",
    numericValue: 0,
    color: "default",
    icon: createElement(TrendingFlatIcon, { fontSize: "small" }),
  };
}
