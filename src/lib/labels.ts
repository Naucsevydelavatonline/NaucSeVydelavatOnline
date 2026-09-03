import { ui } from '../i18n/cs';
import type { DifficultyLevel, StartupCost, TimeToStart } from '../content.config';

export function startupCostLabel(value: StartupCost): string {
  return ui.labels.startupCost[value];
}

export function difficultyLabel(value: DifficultyLevel): string {
  return ui.labels.difficulty[value];
}

export function timeToStartLabel(value: TimeToStart): string {
  return ui.labels.timeToStart[value];
}

export function incomePeriodLabel(period: 'mesic' | 'projekt' | 'hodina'): string {
  return ui.labels.incomePeriod[period];
}

export function formatIncomeRange(min: number, max: number, period: 'mesic' | 'projekt' | 'hodina'): string {
  const fmt = (n: number) => n.toLocaleString('cs-CZ');
  return `${fmt(min)}–${fmt(max)} Kč ${incomePeriodLabel(period)}`;
}
