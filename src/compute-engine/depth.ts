import { Expr } from './model';

export function depth(expr: Expr): number {
  switch (expr.type) {
    case 'const':
    case 'var':
      return 1;
    case 'sum':
    case 'sub':
    case 'mul':
    case 'div':
      return Math.max(depth(expr.left), depth(expr.right)) + 1;
    default:
      ((v: never) => {
        throw new Error('Uninplemented expression: ' + JSON.stringify(v));
      })(expr);
  }
}
