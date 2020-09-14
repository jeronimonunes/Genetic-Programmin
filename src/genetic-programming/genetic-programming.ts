import { GeneticProgramming, Range } from '.';
import { compute, ConstantExpr, Expr, FunctionExpr, TerminalExpr, VariableExpr } from '../compute-engine';

/**
 * @param min inclusive
 * @param max exclusive
 */
function randomNumberBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * @param min inclusive
 * @param max exclusive
 */
function randomIntBetween(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomOperation() {
  const v = Math.random();
  if (v < 0.25) {
    return 'sum';
  } else if (v < 0.5) {
    return 'sub';
  } else if (v < 0.75) {
    return 'mul';
  } else {
    return 'div';
  }
}

function randomConstant({ min, max }: Range): ConstantExpr {
  return { type: 'const', value: randomNumberBetween(min, max) };
}

function randomVariable(variableCount: number): VariableExpr {
  return { type: 'var', idx: randomIntBetween(0, variableCount) };
}

function randomTerminal(variableCount: number, constantRange: Range, constantRate: number): TerminalExpr {
  if (Math.random() < constantRate || variableCount < 1) {
    return randomConstant(constantRange);
  } else {
    return randomVariable(variableCount);
  }
}

export function fullTreeGenerator(n: number, variableCount: number, constantRange: Range, constantRate: number): Expr {
  const leafs = new Array<TerminalExpr>(2 ** (n - 1));
  for (let i = 0; i < leafs.length; i++) {
    leafs[i] = randomTerminal(variableCount, constantRange, constantRate);
  }
  let operators: Expr[] = leafs;
  while (operators.length > 1) {
    const nop = new Array<FunctionExpr>(operators.length / 2);
    for (let i = 0; i < nop.length; i++) {
      const left = operators[i * 2 + 0];
      const right = operators[i * 2 + 1];
      nop[i] = { type: randomOperation(), left, right };
    }
    operators = nop;
  }
  return operators[0];
}

export function growTreeGenerator(
  level: number,
  variableCount: number,
  constantRange: Range,
  constantRate: number,
  termFuncRatio: number
): Expr {
  if (level < 2 || Math.random() < termFuncRatio) {
    return randomTerminal(variableCount, constantRange, constantRate);
  } else {
    const left = Math.random() < termFuncRatio
      ? growTreeGenerator(level - 1, variableCount, constantRange, constantRate, termFuncRatio)
      : randomTerminal(variableCount, constantRange, constantRate);
    const right = Math.random() < termFuncRatio
      ? growTreeGenerator(level - 1, variableCount, constantRange, constantRate, termFuncRatio)
      : randomTerminal(variableCount, constantRange, constantRate);
    return { type: randomOperation(), left, right, };
  }
}

export function evolve(geneticProgramming: GeneticProgramming) {
  const fitness: number[] = new Array(geneticProgramming.population.length);
  let max = 0;
  for (let i = 0; i < fitness.length; i++) {
    let error = 0;
    for (const params of geneticProgramming.dataset) {
      error += compute(geneticProgramming.population[i], params) ** 2;
    }
    fitness[i] = error;
  }
}
