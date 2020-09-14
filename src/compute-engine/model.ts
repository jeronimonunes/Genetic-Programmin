export interface ConstantExpr {
  type: 'const';
  value: number;
}

export interface VariableExpr {
  type: 'var';
  idx: number;
}

export interface FunctionExpr {
  type: 'sum' | 'sub' | 'div' | 'mul';
  left: Expr;
  right: Expr;
}

export type TerminalExpr = ConstantExpr | VariableExpr;


export type Expr = FunctionExpr | TerminalExpr;
