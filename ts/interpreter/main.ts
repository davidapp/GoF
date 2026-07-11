/**
 * 解释器模式（Interpreter）
 * 场景：算术表达式 —— 解析并求值 "5 + 3 - 2"（数字、加、减，支持上下文变量）。
 *
 * 核心思想：为语言中的每一种文法规则定义一个表达式类，
 * 通过组合这些表达式对象构成语法树，再递归求值（interpret）。
 */

// ---------- 上下文（Context）：保存变量名到数值的映射 ----------
class Context {
  private readonly variables = new Map<string, number>();

  setValue(name: string, value: number): void {
    this.variables.set(name, value);
  }

  getValue(name: string): number {
    const value = this.variables.get(name);
    if (value === undefined) {
      throw new Error(`未定义的变量: ${name}`);
    }
    return value;
  }
}

// ---------- 抽象表达式（Abstract Expression） ----------
interface Expression {
  interpret(context: Context): number;
  toString(): string;
}

// ---------- 终结符表达式（Terminal Expression）：数字字面量 ----------
class NumberExpression implements Expression {
  constructor(private readonly value: number) {}

  interpret(_context: Context): number {
    return this.value;
  }
  toString(): string {
    return `${this.value}`;
  }
}

// ---------- 终结符表达式（Terminal Expression）：变量引用 ----------
class VariableExpression implements Expression {
  constructor(private readonly name: string) {}

  interpret(context: Context): number {
    return context.getValue(this.name);
  }
  toString(): string {
    return this.name;
  }
}

// ---------- 非终结符表达式（Non-terminal Expression）：加法 / 减法 ----------
class AddExpression implements Expression {
  constructor(
    private readonly left: Expression,
    private readonly right: Expression,
  ) {}

  interpret(context: Context): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }
  toString(): string {
    return `(${this.left} + ${this.right})`;
  }
}

class SubtractExpression implements Expression {
  constructor(
    private readonly left: Expression,
    private readonly right: Expression,
  ) {}

  interpret(context: Context): number {
    return this.left.interpret(context) - this.right.interpret(context);
  }
  toString(): string {
    return `(${this.left} - ${this.right})`;
  }
}

// ---------- 简易解析器：把 "5 + 3 - 2" 这样的句子构建成表达式树 ----------
// 文法（从左到右，加减同优先级，左结合）：
//   expression := term (('+' | '-') term)*
//   term       := NUMBER | IDENTIFIER
function parseTerm(token: string): Expression {
  const isNumber = /^-?\d+(\.\d+)?$/.test(token);
  return isNumber ? new NumberExpression(Number(token)) : new VariableExpression(token);
}

function parseExpression(sentence: string): Expression {
  const tokens = sentence.trim().split(/\s+/);
  let index = 0;
  let result = parseTerm(tokens[index++] ?? "");

  while (index < tokens.length) {
    const operator = tokens[index++];
    const rhs = parseTerm(tokens[index++] ?? "");
    if (operator === "+") {
      result = new AddExpression(result, rhs);
    } else if (operator === "-") {
      result = new SubtractExpression(result, rhs);
    } else {
      throw new Error(`不支持的运算符: ${operator}`);
    }
  }
  return result;
}

// ---------- 演示 ----------
function main(): void {
  const context = new Context();

  console.log("=== 纯数字表达式 ===");
  const sentence1 = "5 + 3 - 2";
  const expr1 = parseExpression(sentence1);
  console.log(`表达式: ${sentence1}`);
  console.log(`语法树: ${expr1}`);
  console.log(`求值结果: ${expr1.interpret(context)}`);

  console.log("\n=== 带上下文变量的表达式 ===");
  context.setValue("x", 10);
  context.setValue("y", 4);
  const sentence2 = "x + 20 - y";
  const expr2 = parseExpression(sentence2);
  console.log(`表达式: ${sentence2}（其中 x=${10}, y=${4}）`);
  console.log(`语法树: ${expr2}`);
  console.log(`求值结果: ${expr2.interpret(context)}`);

  console.log("\n=== 变量更新后重新求值（语法树可复用） ===");
  context.setValue("x", 100);
  console.log(`更新 x=100 后，求值结果: ${expr2.interpret(context)}`);
}

main();
