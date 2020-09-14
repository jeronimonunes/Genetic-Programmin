import { Expr } from 'src/compute-engine';

export interface Range {
  min: number;
  max: number;
}

export interface GeneticProgramming {
  population: Expr[];
  dataset: number[][];
}
