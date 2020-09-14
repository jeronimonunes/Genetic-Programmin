import { Expr } from './model';

export function compute(expr: Expr, params: number[]): number {
  switch (expr.type) {
    case 'const':
      return expr.value;
    case 'var':
      return params[expr.idx];
    default:
      const left = compute(expr.left, params);
      const right = compute(expr.right, params);
      switch (expr.type) {
        case 'sum':
          return left + right;
        case 'sub':
          return left - right;
        case 'mul':
          return left * right;
        case 'div':
          return left / right;
        default:
          ((v: never) => {
            throw new Error('Uninplemented expression: ' + JSON.stringify(v));
          })(expr);
      }
  }
}

