export type EngineeringSubject =
  | 'Thermodynamics'
  | 'Fluid Mechanics'
  | 'Heat Transfer'
  | 'Machine Design'
  | 'Manufacturing Processes'
  | 'Engineering Math';

export interface SubjectConfig {
  id: EngineeringSubject;
  name: string;
  code: string;
  shortDesc: string;
  badgeColor: string;
  accentBg: string;
  borderColor: string;
  iconName: string;
  sampleProblems: SampleProblem[];
}

export interface SampleProblem {
  id: string;
  title: string;
  subject: EngineeringSubject;
  prompt: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface SolvedProblem {
  id: string;
  subject: EngineeringSubject;
  problem: string;
  solution: string;
  timestamp: string;
  modelUsed: string;
  isFavorite?: boolean;
}

export interface FormulaItem {
  id: string;
  subject: EngineeringSubject;
  title: string;
  latex: string;
  plainText: string;
  variables: { symbol: string; name: string; unit: string }[];
  description: string;
}

export interface UnitCategory {
  id: string;
  name: string;
  icon: string;
  units: { id: string; name: string; symbol: string; factorToBase: number; offsetToBase?: number }[];
  baseUnit: string;
}
