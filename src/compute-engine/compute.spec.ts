import { compute, ConstantExpr, Expr } from '.';

describe('Test compute engine', () => {

  it('should sum', () => {
    const left: ConstantExpr = { type: 'const', value: 2 };
    const right: ConstantExpr = { type: 'const', value: 3 };
    const sum: Expr = { type: 'sum', left, right, };
    const result = compute(sum, []);
    expect(result).toEqual(5);
  });

  it('should sub', () => {
    const left: ConstantExpr = { type: 'const', value: 2 };
    const right: ConstantExpr = { type: 'const', value: 3 };
    const sub: Expr = { type: 'sub', left, right, };
    const result = compute(sub, []);
    expect(result).toEqual(-1);
  });

  it('should mul', () => {
    const left: ConstantExpr = { type: 'const', value: 2 };
    const right: ConstantExpr = { type: 'const', value: 3 };
    const mul: Expr = { type: 'mul', left, right, };
    const result = compute(mul, []);
    expect(result).toEqual(6);
  });

  it('should div', () => {
    const left: ConstantExpr = { type: 'const', value: 2 };
    const right: ConstantExpr = { type: 'const', value: 3 };
    const div: Expr = { type: 'div', left, right, };
    const result = compute(div, []);
    expect(result).toEqual(2 / 3);
  });

  it('should solve sum first', () => {
    const a: ConstantExpr = { type: 'const', value: 2 };
    const b: ConstantExpr = { type: 'const', value: 3 };
    const c: ConstantExpr = { type: 'const', value: 3 };
    const ab: Expr = { type: 'sum', left: a, right: b, };
    const abc: Expr = { type: 'mul', left: ab, right: c };
    const result = compute(abc, []);
    expect(result).toEqual((2 + 3) * 3);
  });

  it('should solve mul first', () => {
    const a: ConstantExpr = { type: 'const', value: 2 };
    const b: ConstantExpr = { type: 'const', value: 3 };
    const c: ConstantExpr = { type: 'const', value: 3 };
    const bc: Expr = { type: 'mul', left: b, right: c };
    const abc: Expr = { type: 'sum', left: a, right: bc };
    const result = compute(abc, []);
    expect(result).toEqual(2 + 3 * 3);
  });

});
