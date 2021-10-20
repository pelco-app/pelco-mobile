import { peso } from "./helpers";

export const MONTHS: any = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sept: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

export const transparentize = (value: string, opacity?: number): string => {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  const [, rgb] = /\(([^)]+)\)/.exec(value) || [];
  return `rgba(${rgb}, ${alpha})`;
};

export const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

export const chartTitle = (tooltipItems: any[]): string => {
  const [item] = tooltipItems;
  return `${MONTHS[item.label]}`;
};

export const chartLabel = (tooltipItem: any): string => {
  return `${tooltipItem.dataset.label}: ${peso(tooltipItem.parsed.x)}`;
};

export const chartFooter = (tooltipItems: any[]): string => {
  const [previous, current] = tooltipItems;

  if (current) {
    const savedDifference = current.parsed.x - previous.parsed.x;
    return `vs past period: ${savedDifference > 0 ? "+" : ""}${peso(savedDifference)}`;
  }

  return "";
};
